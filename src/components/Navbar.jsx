import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };


  const btnBase = "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer";
  

  const getBtnStyle = (path) => {
    const isActive = location.pathname === path;
    return `${btnBase} ${
      isActive 
        ? "bg-indigo-50 text-indigo-600" 
        : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Button */}
        <button 
          className="bg-transparent border-none flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">EmployeePortal</span>
        </button>

      
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => navigate("/")} 
                className={getBtnStyle("/")}
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate("/register")} 
                className="ml-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/departments")} 
                className={getBtnStyle("/departments")}
              >
                Departments
              </button>
              <button 
                onClick={() => navigate("/add-department")} 
                className={getBtnStyle("/add-department")}
              >
                New Department
              </button>
            
              <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>

              <button 
                onClick={logout} 
                className="px-4 py-2 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 border-none cursor-pointer transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;