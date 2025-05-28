import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard size={24} /> 
    },
    { 
      name: 'Generate Questions', 
      path: '/generate-questions', 
      icon: <BrainCircuit size={24} /> 
    },
    { 
      name: 'Feedback', 
      path: '/feedback', 
      icon: <MessageSquare size={24} /> 
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4">
        <Link 
          to="/dashboard" 
          className={`text-xl font-bold text-blue-600 dark:text-blue-400 transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}
        >
          InterviewQgen
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 lg:block hidden"
        >
          {isSidebarCollapsed ? 
            <ChevronRight size={20} /> : 
            <ChevronLeft size={20} />
          }
        </button>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {item.icon}
                <span className={`transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-lg text-red-600 dark:text-red-400 
            hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200`}
        >
          <LogOut size={24} />
          <span className={`transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Logout
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 
          dark:border-gray-700 transition-all duration-300 lg:block hidden
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300 z-40
          ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileSidebarOpen(false)}
      />
      
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 lg:hidden z-50
          transition-transform duration-300 transform
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main
        className={`transition-all duration-300 min-h-screen
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}
      >
        {/* Mobile header */}
        <div className="bg-white dark:bg-gray-800 p-4 lg:hidden flex items-center justify-between shadow-sm">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            InterviewQgen
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 