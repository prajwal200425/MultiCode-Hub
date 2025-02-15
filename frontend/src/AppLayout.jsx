import Footer from "./components/Footer"

const AppLayout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] text-white">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  };
  
  export default AppLayout;
  