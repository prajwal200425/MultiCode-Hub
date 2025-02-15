import React, { useEffect, useState } from 'react';

import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const Editor = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code);
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch(() => {
        toast.error('Failed to load project.');
      });
  }, [id]);

  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch(() => {
        toast.error('Failed to save the project.');
      });
  };

  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveProject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => window.removeEventListener('keydown', handleSaveShortcut);
  }, [code]);

  const runProject = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [{
          filename: data.name + (data.projLanguage === "python" ? ".py" : data.projLanguage === "java" ? ".java" : data.projLanguage === "javascript" ? ".js" : data.projLanguage === "c" ? ".c" : data.projLanguage === "cpp" ? ".cpp" : data.projLanguage === "bash" ? ".sh" : ""),
          content: code
        }]
      })
    }).then(res => res.json()).then(data => {
      setOutput(data.run.output);
      setError(data.run.code === 1);
    });
  }

  return (
    <>
      {/* Mobile Save Button */}
      <button
        onClick={saveProject}
        className="fixed lg:hidden bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-90px)]">

        <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
          <Editor2
            onChange={(newCode) => setCode(newCode || '')}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code}
          />
        </div>
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#27272a] p-4">
          <div className="flex pb-3 border-b border-[#1e1e1f] items-center justify-between">
            <p className="text-white">Output</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              onClick={runProject}
            >
              Run
            </button>
          </div>
          <pre className={`mt-2 text-sm h-[calc(100%-50px)] overflow-auto ${error ? 'text-red-500' : 'text-white'}`}>{output}</pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
