import { Link, useLocation } from "react-router-dom";
import { Home, User, LogOut, ChevronLeft } from "lucide-react";
import { Button } from "../Button";
import useAuthStore from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useSidebarStore from "../../hooks/useSideBar";

export const Sidebar = () => {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-900 text-gray-100 h-screen transition-all duration-500 ease-in-out relative`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-purple-500">Beta</h1>
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-300 ease-in-out absolute top-4 right-[-16px]"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div
            className={`transform transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-purple-500" />
          </div>
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Home
                className={`w-5 h-5 ${
                  location.pathname === "/dashboard"
                    ? "text-purple-500 hover:bg-gray-800 hover text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              />
              {!isCollapsed && <span className="ml-3">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <User
                className={`w-5 h-5 ${
                  location.pathname === "/profile"
                    ? "text-purple-500 hover:bg-gray-800 hover text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              />
              {!isCollapsed && <span className="ml-3">Transacoes</span>}
            </Link>
          </li>

          <li>
            <Button
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 absolute bottom-0 w-full ${
                isCollapsed ? "justify-center" : ""
              }`}
              onClick={handleLogOut}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Sair</span>}
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
