import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, Hash } from "lucide-react";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  const deleteDept = async (id) => {
    if (window.confirm("Delete this department? This action cannot be undone.")) {
      await api.delete(`/delete-department/${id}`);
      setDepartments(departments.filter((d) => d._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-16 px-6 font-sans antialiased text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">
              Departments
            </h1>
          </div>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 gap-4">
          {departments.map((dept) => (
            <div 
              key={dept._id}
              className="group relative bg-white border border-slate-200/70 rounded-2xl p-6 transition-all duration-300 hover:border-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center justify-between"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-1 bg-transparent group-hover:bg-indigo-500 rounded-r-full transition-all duration-300"></div>

              <div className="flex-1 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="w-4 h-4 text-slate-300" />
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    {dept.department}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                  {dept.description || "No description available."}
                </p>
              </div>

             <button 
                onClick={() => deleteDept(dept._id)}
                className="group/btn flex items-center bg-transparent hover:bg-rose-50 rounded-2xl p-1.5 transition-all duration-300 ease-in-out hover:border-rose-100 active:scale-95"
              >
                <span className="max-w-0 overflow-hidden opacity-0 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100 group-hover/btn:ml-3 transition-all duration-300 ease-in-out whitespace-nowrap text-rose-600 text-xs font-bold uppercase tracking-widest">
                  Delete
                </span>
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover/btn:bg-rose-600 group-hover/btn:text-white transition-all duration-300 shadow-sm">
                  <Trash2 className="w-5 h-5" />
                </div>
              </button>
            </div>
          ))}

          {/* Empty State */}
          {departments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No departments found in the directory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentList;