import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sprout,
  Users,
  Package,
  ClipboardList,
  Beef,
  LayoutDashboard,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/animals", label: "Animals", icon: Beef },
    { path: "/farmers", label: "Farmers", icon: Users },
    { path: "/feeds", label: "Feeds", icon: Package },
    { path: "/tasks", label: "Tasks", icon: ClipboardList },
  ];

  return (
    <nav className="bg-white border-b border-sage-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Sprout className="h-8 w-8 text-sage-600" />
              <span className="ml-2 text-xl font-bold text-sage-900 tracking-tight">
                My Farm
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "border-sage-600 text-sage-900"
                        : "border-transparent text-sage-500 hover:border-sage-300 hover:text-sage-700"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 mr-2 ${isActive ? "text-sage-600" : "text-sage-400"}`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
