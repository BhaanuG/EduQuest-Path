import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart3, FileText, BookOpen, Settings, Brain, Heart, Quote, Search, Zap, HelpCircle, Puzzle, User, LogOut, MessageCircle, Mail, Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { StudentCoursesPage } from "./pages/StudentCoursesPage";
import { StudentProgressPage } from "./pages/StudentProgressPage";
import { StudentEngagementPage } from "./pages/StudentEngagementPage";
import { StudentResourcesPage } from "./pages/StudentResourcesPage";
import { StudentActivityPage } from "./pages/StudentActivityPage";
import { StudentGroupChatPage } from "./pages/StudentGroupChatPage";
import { StudentAnalyticsPage } from "./pages/StudentAnalyticsPage";
import { StudentAssignmentsPage } from "./pages/StudentAssignmentsPage";
import { StudentAttendancePage } from "./pages/StudentAttendancePage";
import { StudentHelpCenterPage } from "./pages/StudentHelpCenterPage";
import { StudentIntegrationsPage } from "./pages/StudentIntegrationsPage";
import { StudentMyAccountPage } from "./pages/StudentMyAccountPage";
import { StudentMailsPage } from "./pages/StudentMailsPage";
import { StudentCalendarPage } from "./pages/StudentCalendarPage";
const mainNavItems = [{
  icon: BarChart3,
  label: "Dashboard",
  active: true
}, {
  icon: FileText,
  label: "Analytics"
}, {
  icon: BookOpen,
  label: "Courses"
}, {
  icon: Settings,
  label: "Upcoming Assignments"
}];
const learningItems = [{
  icon: Brain,
  label: "Progress"
}, {
  icon: Heart,
  label: "Engagement"
}, {
  icon: Quote,
  label: "Resources"
}];
const performanceItems = [{
  icon: Search,
  label: "Attendance"
}, {
  icon: Zap,
  label: "Activity"
}];
const otherItems = [{
  icon: Mail,
  label: "Mails"
}, {
  icon: CalendarIcon,
  label: "Calendar"
}, {
  icon: MessageCircle,
  label: "Group Chat"
}, {
  icon: HelpCircle,
  label: "Help Center"
}, {
  icon: Puzzle,
  label: "Integrations"
}, {
  icon: User,
  label: "My Account"
}];
export function StudentDashboard({
  user,
  onLogout,
  initialPage = "dashboard"
}) {
  const navigate = useNavigate();
  const { page } = useParams();
  const studentId = user?.rollNo;
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
    return /*#__PURE__*/React.createElement("button", {
      key: item.label,
      onClick: () => navigate(`/${studentId}/${pageNameForUrl}`),
      className: `dark-nav-item w-full text-left ${isActive ? "dark-nav-item-active" : ""}`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-5 h-5 ${isActive ? "text-dark-primary" : "text-dark-secondary"}`
    }), /*#__PURE__*/React.createElement("span", null, item.label));
  };
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return /*#__PURE__*/React.createElement(StudentDashboardPage, {
          user: user
        });
      case "Analytics":
        return /*#__PURE__*/React.createElement(StudentAnalyticsPage, {
          user: user
        });
      case "Courses":
        return /*#__PURE__*/React.createElement(StudentCoursesPage, {
          user: user
        });
      case "Upcoming Assignments":
        return /*#__PURE__*/React.createElement(StudentAssignmentsPage, {
          user: user
        });
      case "Progress":
        return /*#__PURE__*/React.createElement(StudentProgressPage, {
          user: user
        });
      case "Engagement":
        return /*#__PURE__*/React.createElement(StudentEngagementPage, {
          user: user
        });
      case "Resources":
        return /*#__PURE__*/React.createElement(StudentResourcesPage, {
          user: user
        });
      case "Attendance":
        return /*#__PURE__*/React.createElement(StudentAttendancePage, {
          user: user
        });
      case "Activity":
        return /*#__PURE__*/React.createElement(StudentActivityPage, {
          user: user
        });
      case "Mails":
        return /*#__PURE__*/React.createElement(StudentMailsPage, {
          user: user
        });
      case "Calendar":
        return /*#__PURE__*/React.createElement(StudentCalendarPage, {
          user: user
        });
      case "Group Chat":
        return /*#__PURE__*/React.createElement(StudentGroupChatPage, {
          user: user
        });
      case "Help Center":
        return /*#__PURE__*/React.createElement(StudentHelpCenterPage, {
          user: user
        });
      case "Integrations":
        return /*#__PURE__*/React.createElement(StudentIntegrationsPage, {
          user: user
        });
      case "My Account":
        return /*#__PURE__*/React.createElement(StudentMyAccountPage, {
          user: user
        });
      default:
        return /*#__PURE__*/React.createElement(StudentDashboardPage, {
          user: user
        });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex h-screen bg-dark-bg",
    style: {
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-72 bg-dark-bg border-r border-dark-color flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8 border-b border-dark-color"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-lg relative z-10"
  }, "EQ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-bold text-dark-primary font-[Marcellus_SC]"
  }, "EduQuest Path"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary font-medium"
  }, "Student Portal")))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-dark-color"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, user.rollNo), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, "CGPA: ", user.cgpa, "/10.0"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, "Sem ", user.semester)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, user.department))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 p-6 space-y-8 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, mainNavItems.map(item => renderNavItem(item, activePage === item.label))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      backgroundColor: '#374151'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-dark-secondary uppercase tracking-widest"
  }, "Learning")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, learningItems.map(item => renderNavItem(item, activePage === item.label)))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      backgroundColor: '#374151'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-dark-secondary uppercase tracking-widest"
  }, "Performance")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, performanceItems.map(item => renderNavItem(item, activePage === item.label)))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      backgroundColor: '#374151'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-dark-secondary uppercase tracking-widest"
  }, "Other")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, otherItems.map(item => renderNavItem(item, activePage === item.label))))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-t border-dark-color"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onLogout,
    className: "w-full dark-button-secondary flex items-center justify-center space-x-2"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Logout")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col overflow-hidden"
  }, renderContent()));
}