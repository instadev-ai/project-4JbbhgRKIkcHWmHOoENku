import { Home, Trophy, Target, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "ראשי",
      path: "/",
    },
    {
      icon: Target,
      label: "משימות",
      path: "/missions",
    },
    {
      icon: Trophy,
      label: "ניקוד",
      path: "/scores",
    },
    {
      icon: User,
      label: "פרופיל",
      path: "/profile",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" dir="rtl">
      <main className="flex-1 container mx-auto px-4 pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full
                  ${isActive ? "text-primary" : "text-gray-500"}`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;