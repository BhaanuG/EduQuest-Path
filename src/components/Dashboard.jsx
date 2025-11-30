import { useState } from "react";
import { BarChart3, FileText, Lightbulb, Settings, Brain, Heart, Quote, Search, Zap, BookOpen, Puzzle, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { DashboardPage } from "./pages/DashboardPage";
import { ReportsPage } from "./pages/ReportsPage";
import { PromptsPage } from "./pages/PromptsPage";
import { OptimizePage } from "./pages/OptimizePage";
import { IntelligencePage } from "./pages/IntelligencePage";
import { SentimentPage } from "./pages/SentimentPage";
import { CitationsPage } from "./pages/CitationsPage";
import { CrawlersPage } from "./pages/CrawlersPage";
import { LLMTrafficPage } from "./pages/LLMTrafficPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
const mainNavItems = [{
  icon: BarChart3,
  label: "Dashboard",
  active: true
}, {
  icon: FileText,
  label: "Reports"
}, {
  icon: Lightbulb,
  label: "Prompts"
}, {
  icon: Settings,
  label: "Optimize"
}];
const insightItems = [{
  icon: Brain,
  label: "Intelligence"
}, {
  icon: Heart,
  label: "Sentiment"
}, {
  icon: Quote,
  label: "Citations"
}];
const analyticsItems = [{
  icon: Search,
  label: "Crawlers"
}, {
  icon: Zap,
  label: "LLM Traffic"
}];
const otherItems = [{
  icon: BookOpen,
  label: "Learn"
}, {
  icon: Puzzle,
  label: "Integrations"
}, {
  icon: User,
  label: "My Account"
}];
export function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const renderNavItem = (item, isActive) => {
    const Icon = item.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: item.label,
      onClick: () => setActivePage(item.label),
      className: `dark-nav-item w-full text-left ${isActive ? "dark-nav-item-active" : ""}`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-5 h-5 ${isActive ? "text-dark-primary" : "text-dark-secondary"}`
    }), /*#__PURE__*/React.createElement("span", null, item.label));
  };
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return /*#__PURE__*/React.createElement(DashboardPage, null);
      case "Reports":
        return /*#__PURE__*/React.createElement(ReportsPage, null);
      case "Prompts":
        return /*#__PURE__*/React.createElement(PromptsPage, null);
      case "Optimize":
        return /*#__PURE__*/React.createElement(OptimizePage, null);
      case "Intelligence":
        return /*#__PURE__*/React.createElement(IntelligencePage, null);
      case "Sentiment":
        return /*#__PURE__*/React.createElement(SentimentPage, null);
      case "Citations":
        return /*#__PURE__*/React.createElement(CitationsPage, null);
      case "Crawlers":
        return /*#__PURE__*/React.createElement(CrawlersPage, null);
      case "LLM Traffic":
        return /*#__PURE__*/React.createElement(LLMTrafficPage, null);
      case "Integrations":
        return /*#__PURE__*/React.createElement(IntegrationsPage, null);
      default:
        return /*#__PURE__*/React.createElement(DashboardPage, null);
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
    className: "w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-lg relative z-10"
  }, "A8")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-bold text-dark-primary font-[Marcellus_SC]"
  }, "EduQuest Path"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary font-medium"
  }, "LLM Analytics Platform")))), /*#__PURE__*/React.createElement("nav", {
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
  }, "Insight")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, insightItems.map(item => renderNavItem(item, activePage === item.label)))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      backgroundColor: '#374151'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-dark-secondary uppercase tracking-widest"
  }, "Analytics")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, analyticsItems.map(item => renderNavItem(item, activePage === item.label)))), /*#__PURE__*/React.createElement(Separator, {
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-card rounded-xl p-4 text-center border border-dark-color"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-dark-primary mb-2"
  }, "Upgrade to Pro"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mb-3"
  }, "Unlock advanced analytics"), /*#__PURE__*/React.createElement("button", {
    className: "dark-button-primary text-xs py-2 px-4 w-full"
  }, "Upgrade Now")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col overflow-hidden"
  }, renderContent()));
}