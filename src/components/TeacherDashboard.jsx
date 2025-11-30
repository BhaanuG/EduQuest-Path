import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart3, FileText, TrendingUp, Users, BookOpen, User, LogOut, ClipboardList, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage.jsx";
import { TeacherReportsPage } from "./pages/TeacherReportsPage.jsx";
import { TeacherProgressPage } from "./pages/TeacherProgressPage.jsx";
import { TeacherStudentsPage } from "./pages/TeacherStudentsPage.jsx";
import { TeacherCoursesPage } from "./pages/TeacherCoursesPage.jsx";
import { TeacherMyAccountPage } from "./pages/TeacherMyAccountPage.jsx";
import { TeacherAssignmentsPage } from "./pages/TeacherAssignmentsPage.jsx";
import { TeacherCalendarPage } from "./pages/TeacherCalendarPage.jsx";

const teacherNavItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: FileText, label: "Reports" },
  { icon: TrendingUp, label: "Progress" },
  { icon: Users, label: "Students" },
  { icon: BookOpen, label: "Registered Courses" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: User, label: "My Account" }
];

export function TeacherDashboard({ user, onLogout, initialPage = "dashboard" }) {
  const navigate = useNavigate();
  const { page } = useParams();
  const teacherId = user?.id;
  const [activePage, setActivePage] = useState(initialPage);

  useEffect(() => {
    if (page) {
      // Convert URL param (kebab-case) back to label format
      const pageLabel = page
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setActivePage(pageLabel);
    } else {
      setActivePage("Dashboard");
    }
  }, [page]);

  const renderNavItem = (item, isActive) => {
    const Icon = item.icon;
    const pageNameForUrl = item.label.toLowerCase().replace(/\s+/g, '-');
    return (
      <button key={item.label} onClick={() => navigate(`/${teacherId}/${pageNameForUrl}`)} className={`dark-nav-item w-full text-left ${isActive ? "dark-nav-item-active" : ""}`}>
        <Icon className={`w-5 h-5 ${isActive ? "text-dark-primary" : "text-dark-secondary"}`} />
        <span>{item.label}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <TeacherDashboardPage user={user} />;
      case "Reports":
        return <TeacherReportsPage user={user} />;
      case "Progress":
        return <TeacherProgressPage user={user} />;
      case "Students":
        return <TeacherStudentsPage user={user} />;
      case "Registered Courses":
        return <TeacherCoursesPage user={user} />;
      case "Assignments":
        return <TeacherAssignmentsPage user={user} />;
      case "Calendar":
        return <TeacherCalendarPage user={user} />;
      case "My Account":
        return <TeacherMyAccountPage user={user} />;
      default:
        return <TeacherDashboardPage user={user} />;
    }
  };

  const displayName = user && user.name ? user.name : "";
  const designation = user && user.designation ? user.designation : "";
  const department = user && user.department ? user.department : "";
  const email = user && user.email ? user.email : "";

  return (
    <div className="flex h-screen bg-dark-bg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="w-72 bg-dark-bg border-r border-dark-color flex flex-col">
        <div className="p-8 border-b border-dark-color">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden">
              <span className="text-white font-bold text-lg relative z-10">EQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-primary font-[Marcellus_SC]">EduQuest Path</h1>
              <p className="text-xs text-dark-secondary font-medium">Teacher Portal</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-dark-color">
          <div className="space-y-2">
            <h3 className="font-semibold text-dark-primary">{displayName}</h3>
            <p className="text-sm text-dark-secondary">{designation}</p>
            <p className="text-xs text-dark-secondary">{department} Department</p>
            <p className="text-xs text-dark-secondary">{email}</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="space-y-2">
            {teacherNavItems.map(item => renderNavItem(item, activePage === item.label))}
          </div>
        </nav>

        <div className="p-6 border-t border-dark-color">
          <Button onClick={onLogout} className="w-full dark-button-secondary flex items-center justify-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary user={user}>{renderContent()}</ErrorBoundary>
      </div>
    </div>
  );
}