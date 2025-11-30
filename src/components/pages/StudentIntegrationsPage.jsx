import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Puzzle, CheckCircle, Settings, Plus, Globe, Smartphone, Calendar, FileText, Clock, Shield, Zap, Users, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
const availableIntegrations = [{
  id: 1,
  name: "Google Calendar",
  description: "Sync your class schedules and assignment deadlines with Google Calendar",
  icon: Calendar,
  category: "Productivity",
  connected: true,
  features: ["Class Schedule Sync", "Assignment Reminders", "Exam Notifications"],
  setupTime: "2 minutes",
  dataAccess: "Calendar events, class schedules, assignment deadlines",
  permissions: ["Read calendar events", "Create calendar events", "Modify calendar events"],
  lastSync: "2024-01-15 10:30 AM",
  syncFrequency: "Every 15 minutes",
  benefits: ["Never miss a deadline", "Automatic schedule updates", "Smart reminders"]
}, {
  id: 2,
  name: "Microsoft Office 365",
  description: "Access and edit documents directly from the learning platform",
  icon: FileText,
  category: "Documents",
  connected: false,
  features: ["Document Editing", "OneDrive Integration", "Teams Collaboration"],
  setupTime: "5 minutes",
  dataAccess: "Document files, OneDrive storage, Teams channels",
  permissions: ["Read files", "Create files", "Edit files", "Share files"],
  lastSync: "Not connected",
  syncFrequency: "Real-time",
  benefits: ["Seamless document editing", "Cloud storage access", "Team collaboration"]
}, {
  id: 3,
  name: "Mobile App",
  description: "Get notifications and access courses on your mobile device",
  icon: Smartphone,
  category: "Mobile",
  connected: true,
  features: ["Push Notifications", "Offline Reading", "Quick Access"],
  setupTime: "1 minute",
  dataAccess: "All platform data, notifications, course materials",
  permissions: ["Send notifications", "Access device storage", "Background sync"],
  lastSync: "2024-01-15 11:45 AM",
  syncFrequency: "Real-time",
  benefits: ["Learn on the go", "Offline access", "Instant notifications"]
}, {
  id: 4,
  name: "Zoom Integration",
  description: "Join virtual classes directly from the platform",
  icon: Globe,
  category: "Communication",
  connected: false,
  features: ["One-click Join", "Recording Access", "Attendance Tracking"],
  setupTime: "3 minutes",
  dataAccess: "Meeting links, recordings, attendance data",
  permissions: ["Join meetings", "Access recordings", "View participants"],
  lastSync: "Not connected",
  syncFrequency: "On-demand",
  benefits: ["Quick meeting access", "Automatic attendance", "Recording storage"]
}, {
  id: 5,
  name: "Slack Integration",
  description: "Receive notifications and updates in your Slack workspace",
  icon: Users,
  category: "Communication",
  connected: false,
  features: ["Channel Notifications", "Direct Messages", "Assignment Alerts"],
  setupTime: "4 minutes",
  dataAccess: "Workspace channels, direct messages, user profile",
  permissions: ["Post messages", "Read channels", "Send notifications"],
  lastSync: "Not connected",
  syncFrequency: "Real-time",
  benefits: ["Team communication", "Instant updates", "Centralized notifications"]
}, {
  id: 6,
  name: "GitHub Integration",
  description: "Link your GitHub repositories for coding assignments",
  icon: Database,
  category: "Productivity",
  connected: false,
  features: ["Repository Sync", "Code Review", "Automatic Submission"],
  setupTime: "3 minutes",
  dataAccess: "Public and private repositories, commits, pull requests",
  permissions: ["Read repositories", "Create commits", "Submit assignments"],
  lastSync: "Not connected",
  syncFrequency: "On-demand",
  benefits: ["Automated submissions", "Version control", "Code review"]
}];
const connectedApps = [{
  name: "Google Calendar",
  status: "Active",
  lastSync: "2024-01-15 10:30 AM",
  dataShared: "Class schedules, assignments",
  syncCount: 1247,
  dataVolume: "12.4 MB",
  uptime: "99.9%",
  errors: 0,
  connectedOn: "2023-08-15",
  nextSync: "2024-01-15 10:45 AM"
}, {
  name: "EduQuest Mobile App",
  status: "Active",
  lastSync: "2024-01-15 11:45 AM",
  dataShared: "All platform data",
  syncCount: 3421,
  dataVolume: "156.8 MB",
  uptime: "99.7%",
  errors: 2,
  connectedOn: "2023-08-10",
  nextSync: "Real-time"
}];
const integrationCategories = [{
  name: "All",
  count: availableIntegrations.length,
  icon: Puzzle,
  color: "blue"
}, {
  name: "Productivity",
  count: availableIntegrations.filter(i => i.category === "Productivity").length,
  icon: Zap,
  color: "purple"
}, {
  name: "Documents",
  count: availableIntegrations.filter(i => i.category === "Documents").length,
  icon: FileText,
  color: "green"
}, {
  name: "Mobile",
  count: availableIntegrations.filter(i => i.category === "Mobile").length,
  icon: Smartphone,
  color: "orange"
}, {
  name: "Communication",
  count: availableIntegrations.filter(i => i.category === "Communication").length,
  icon: Globe,
  color: "pink"
}];
export function StudentIntegrationsPage({
  user
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [selectedConnectedApp, setSelectedConnectedApp] = useState(null);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState(null);
  const [showAvailableDialog, setShowAvailableDialog] = useState(false);
  const [showConnectedDialog, setShowConnectedDialog] = useState(false);
  const toggleIntegration = id => {
    setIntegrations(integrations.map(integration => integration.id === id ? {
      ...integration,
      connected: !integration.connected
    } : integration));
  };
  const filteredIntegrations = selectedCategory === "All" ? integrations : integrations.filter(integration => integration.category === selectedCategory);
  const connectedCount = integrations.filter(i => i.connected).length;
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(motion.header, {
    className: "bg-dark-bg border-b border-dark-color px-8 py-8",
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-dark-primary"
  }, "Integrations"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Connect your favorite apps and services")), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(Puzzle, {
    className: "w-4 h-4 mr-2"
  }), connectedCount, " Connected")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: "hover"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setShowAvailableDialog(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    },
    transition: {
      duration: 0.2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Available Integrations"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }, integrations.length)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(Puzzle, {
    className: "w-6 h-6 text-blue-400"
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: "hover"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setShowConnectedDialog(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    },
    transition: {
      duration: 0.2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Connected Apps"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.4
    }
  }, connectedCount)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 text-green-400"
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: "hover"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => {
      const categoryStats = integrationCategories.slice(1); // Exclude "All"
      setSelectedCategoryDetail({
        categories: categoryStats
      });
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    },
    transition: {
      duration: 0.2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Categories"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.5
    }
  }, integrationCategories.length - 1)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center",
    whileHover: {
      rotate: -360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-6 h-6 text-purple-400"
  }))))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.6
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, integrationCategories.map((category, index) => {
    const Icon = category.icon;
    return /*#__PURE__*/React.createElement(motion.div, {
      key: category.name,
      initial: {
        opacity: 0,
        scale: 0.8
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        duration: 0.3,
        delay: 0.7 + index * 0.1
      },
      whileHover: {
        scale: 1.05
      },
      whileTap: {
        scale: 0.95
      }
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => setSelectedCategory(category.name),
      className: `${selectedCategory === category.name ? 'dark-button-primary' : 'dark-button-secondary'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-4 h-4 mr-2"
    }), category.name, " (", category.count, ")"));
  }))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.8
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Available Integrations"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Connect apps to enhance your learning experience")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, filteredIntegrations.map((integration, index) => {
    const Icon = integration.icon;
    return /*#__PURE__*/React.createElement(motion.div, {
      key: integration.id,
      variants: itemVariants,
      initial: {
        opacity: 0,
        x: -20
      },
      animate: {
        opacity: 1,
        x: 0
      },
      exit: {
        opacity: 0,
        x: 20
      },
      transition: {
        duration: 0.3,
        delay: index * 0.1
      },
      whileHover: {
        scale: 1.02,
        x: 10
      },
      className: "flex items-start space-x-4 p-6 bg-dark-hover rounded-lg cursor-pointer",
      onClick: () => setSelectedIntegration(integration)
    }, /*#__PURE__*/React.createElement(motion.div, {
      className: "w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0",
      whileHover: {
        rotate: 360
      },
      transition: {
        duration: 0.5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-6 h-6 text-blue-400"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "font-semibold text-dark-primary flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement("span", null, integration.name), integration.connected && /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        scale: 0
      },
      animate: {
        scale: 1
      },
      transition: {
        duration: 0.3
      }
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      className: "w-4 h-4 text-green-400"
    }))), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary mt-1"
    }, integration.description)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/React.createElement(Badge, {
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }, integration.category), /*#__PURE__*/React.createElement(Switch, {
      checked: integration.connected,
      onCheckedChange: () => toggleIntegration(integration.id)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium text-dark-primary mb-2"
    }, "Features:"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-2"
    }, integration.features.map((feature, index) => /*#__PURE__*/React.createElement(motion.div, {
      key: index,
      initial: {
        opacity: 0,
        scale: 0.8
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        duration: 0.2,
        delay: index * 0.05
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs"
    }, feature))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-dark-secondary flex items-center"
    }, /*#__PURE__*/React.createElement(Clock, {
      className: "w-4 h-4 mr-1"
    }), "Setup time: ", integration.setupTime), !integration.connected ? /*#__PURE__*/React.createElement(Button, {
      onClick: e => {
        e.stopPropagation();
        toggleIntegration(integration.id);
      },
      className: "dark-button-primary"
    }, /*#__PURE__*/React.createElement(Plus, {
      className: "w-4 h-4 mr-2"
    }), "Connect") : /*#__PURE__*/React.createElement(Button, {
      className: "dark-button-secondary",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Settings, {
      className: "w-4 h-4 mr-2"
    }), "Configure")))));
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.9
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Connected Apps"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Manage your connected applications and data sharing")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, connectedApps.map((app, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    variants: itemVariants,
    whileHover: {
      scale: 1.02,
      x: 10
    },
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg cursor-pointer",
    onClick: () => setSelectedConnectedApp(app)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 text-green-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, app.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Last sync: ", app.lastSync), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Data shared: ", app.dataShared))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, app.status), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-4 h-4 mr-2"
  }), "Manage")))))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: 1.0
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    transition: {
      duration: 0.5,
      delay: 1.1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-dark-primary"
  }, "Integration Tips"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-2",
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, "Productivity Boost"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Connect Google Calendar to automatically sync your class schedules and never miss an assignment deadline.")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-2",
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, "Stay Connected"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Install the mobile app to receive instant notifications about grades, announcements, and updates.")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showAvailableDialog,
    onOpenChange: setShowAvailableDialog
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Puzzle, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Available Integrations Overview"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive list of all available integration options")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Available"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-blue-400"
  }, integrations.length)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Not Connected"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-orange-400"
  }, integrations.length - connectedCount))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "All Integrations"), integrations.map(integration => {
    const Icon = integration.icon;
    return /*#__PURE__*/React.createElement(motion.div, {
      key: integration.id,
      className: "flex items-center justify-between p-3 bg-dark-hover rounded-lg",
      whileHover: {
        x: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-5 h-5 text-blue-400"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-medium text-dark-primary"
    }, integration.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-dark-secondary"
    }, integration.category))), /*#__PURE__*/React.createElement(Badge, {
      className: `${integration.connected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`
    }, integration.connected ? 'Connected' : 'Available'));
  }))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!selectedIntegration,
    onOpenChange: () => setSelectedIntegration(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto"
  }, selectedIntegration && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, (() => {
    const Icon = selectedIntegration.icon;
    return /*#__PURE__*/React.createElement(Icon, {
      className: "w-6 h-6 mr-2 text-blue-400"
    });
  })(), selectedIntegration.name), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, selectedIntegration.description)), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Connection Status"), /*#__PURE__*/React.createElement(Badge, {
    className: `${selectedIntegration.connected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`
  }, selectedIntegration.connected ? 'Connected' : 'Not Connected')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Category"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedIntegration.category)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Setup Time"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedIntegration.setupTime)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg col-span-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Sync Frequency"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedIntegration.syncFrequency))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Features"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, selectedIntegration.features.map((feature, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center space-x-2 p-2 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, feature))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Benefits"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, selectedIntegration.benefits.map((benefit, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center space-x-2 p-2 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-4 h-4 text-yellow-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, benefit))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3 flex items-center"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-4 h-4 mr-2 text-purple-400"
  }), "Required Permissions"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, selectedIntegration.permissions.map((permission, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center space-x-2 p-2 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-4 h-4 text-purple-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, permission))))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Data Access"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, selectedIntegration.dataAccess)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, !selectedIntegration.connected ? /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      toggleIntegration(selectedIntegration.id);
      setSelectedIntegration(null);
    },
    className: "dark-button-primary flex-1"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Connect Now") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary flex-1"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-4 h-4 mr-2"
  }), "Configure"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      toggleIntegration(selectedIntegration.id);
      setSelectedIntegration(null);
    },
    className: "dark-button-secondary"
  }, "Disconnect"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!selectedConnectedApp,
    onOpenChange: () => setSelectedConnectedApp(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto"
  }, selectedConnectedApp && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), selectedConnectedApp.name), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Connection details and statistics")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-dark-primary"
  }, "Status: ", selectedConnectedApp.status)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, "Uptime: ", selectedConnectedApp.uptime))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Total Syncs"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, selectedConnectedApp.syncCount.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Data Volume"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, selectedConnectedApp.dataVolume)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Errors"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, selectedConnectedApp.errors)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Connected Since"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-green-400"
  }, selectedConnectedApp.connectedOn))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Sync Information"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "Last Sync"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, selectedConnectedApp.lastSync)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "Next Sync"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, selectedConnectedApp.nextSync)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "Data Shared"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, selectedConnectedApp.dataShared)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-4 h-4 mr-2"
  }), "Configure"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, "Sync Now")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showConnectedDialog,
    onOpenChange: setShowConnectedDialog
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Connected Apps Overview"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Summary of all your connected applications")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Connected"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-green-400"
  }, connectedCount)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Syncs"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-blue-400"
  }, connectedApps.reduce((sum, app) => sum + app.syncCount, 0).toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Errors"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-orange-400"
  }, connectedApps.reduce((sum, app) => sum + app.errors, 0)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Connected Applications"), connectedApps.map((app, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg space-y-2",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-dark-primary"
  }, app.name)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, app.status)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Syncs: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, app.syncCount.toLocaleString())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Volume: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, app.dataVolume)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Uptime: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, app.uptime)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Errors: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, app.errors))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!selectedCategoryDetail,
    onOpenChange: () => setSelectedCategoryDetail(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto"
  }, selectedCategoryDetail && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "Integration Categories"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Breakdown of integrations by category")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Categories"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-purple-400"
  }, selectedCategoryDetail.categories.length)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Integrations"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-blue-400"
  }, integrations.length))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Category Breakdown"), selectedCategoryDetail.categories.map((category, index) => {
    const Icon = category.icon;
    const categoryIntegrations = integrations.filter(i => i.category === category.name);
    const connectedInCategory = categoryIntegrations.filter(i => i.connected).length;
    return /*#__PURE__*/React.createElement(motion.div, {
      key: index,
      className: "p-4 bg-dark-hover rounded-lg",
      whileHover: {
        x: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-10 h-10 bg-${category.color}-500/20 rounded-full flex items-center justify-center`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-5 h-5 text-${category.color}-400`
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-dark-primary"
    }, category.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-dark-secondary"
    }, category.count, " ", category.count === 1 ? 'integration' : 'integrations'))), /*#__PURE__*/React.createElement(Badge, {
      className: `bg-${category.color}-500/20 text-${category.color}-400 border-${category.color}-500/30`
    }, connectedInCategory, " Connected")), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, categoryIntegrations.map(integration => /*#__PURE__*/React.createElement("div", {
      key: integration.id,
      className: "text-sm text-dark-secondary flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", null, "\u2022 ", integration.name), integration.connected && /*#__PURE__*/React.createElement(CheckCircle, {
      className: "w-3 h-3 text-green-400"
    })))));
  })))))));
}