import * as React from "react";
import { useState } from "react";
import { Zap, FileText, MessageSquare, Book, Clock, CheckCircle, TrendingUp, Target, Award, Download, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
// Function to generate personalized recent activities
function getPersonalizedActivities(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  const departmentActivities = {
    "Computer Science": [{
      type: "assignment",
      title: `Submitted Advanced DSA Assignment ${user.semester}`,
      description: "Binary Search Tree with AVL balancing",
      subject: "Data Structures & Algorithms",
      points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
    }, {
      type: "discussion",
      title: "Posted in Database Systems Forum",
      description: "Query optimization techniques discussion",
      subject: "Database Management Systems",
      points: 5
    }, {
      type: "quiz",
      title: "Completed Computer Networks Quiz",
      description: "OSI Model and TCP/IP protocols",
      subject: "Computer Networks",
      points: user.cgpa >= 8.5 ? 18 : 15
    }, {
      type: "resource",
      title: "Downloaded Software Engineering Materials",
      description: "Design patterns and UML diagrams",
      subject: "Software Engineering",
      points: 3
    }],
    "Electronics": [{
      type: "assignment",
      title: `Submitted DSP Lab Assignment ${user.semester}`,
      description: "Digital filter design using MATLAB",
      subject: "Digital Signal Processing",
      points: user.cgpa >= 9.0 ? 16 : user.cgpa >= 8.5 ? 13 : 11
    }, {
      type: "discussion",
      title: "Posted in VLSI Design Forum",
      description: "CMOS technology scaling discussion",
      subject: "VLSI Design",
      points: 6
    }, {
      type: "quiz",
      title: "Completed Communication Systems Quiz",
      description: "Modulation techniques and applications",
      subject: "Communication Systems",
      points: user.cgpa >= 8.5 ? 17 : 14
    }, {
      type: "resource",
      title: "Downloaded Microprocessor Lab Manual",
      description: "8086 assembly programming guide",
      subject: "Microprocessors",
      points: 2
    }],
    "Mechanical": [{
      type: "assignment",
      title: `Submitted Thermal Analysis Project ${user.semester}`,
      description: "Heat exchanger design calculations",
      subject: "Thermodynamics",
      points: user.cgpa >= 9.0 ? 14 : user.cgpa >= 8.5 ? 11 : 9
    }, {
      type: "discussion",
      title: "Posted in Fluid Mechanics Forum",
      description: "Bernoulli's equation applications",
      subject: "Fluid Mechanics",
      points: 4
    }, {
      type: "quiz",
      title: "Completed Machine Design Quiz",
      description: "Shaft design and stress analysis",
      subject: "Machine Design",
      points: user.cgpa >= 8.5 ? 16 : 13
    }, {
      type: "resource",
      title: "Downloaded Manufacturing Processes Guide",
      description: "CNC machining and tooling",
      subject: "Manufacturing Processes",
      points: 3
    }],
    "Information Technology": [{
      type: "assignment",
      title: `Submitted Web Development Project ${user.semester}`,
      description: "Full-stack e-commerce application",
      subject: "Web Development",
      points: user.cgpa >= 9.0 ? 18 : user.cgpa >= 8.5 ? 15 : 12
    }, {
      type: "discussion",
      title: "Posted in Cybersecurity Forum",
      description: "Web application security vulnerabilities",
      subject: "Cybersecurity",
      points: 7
    }, {
      type: "quiz",
      title: "Completed Cloud Computing Quiz",
      description: "AWS services and deployment models",
      subject: "Cloud Computing",
      points: user.cgpa >= 8.5 ? 19 : 16
    }, {
      type: "resource",
      title: "Downloaded Database Systems Resources",
      description: "NoSQL databases and scalability",
      subject: "Database Systems",
      points: 4
    }],
    "Civil": [{
      type: "assignment",
      title: `Submitted Structural Design Project ${user.semester}`,
      description: "Reinforced concrete beam analysis",
      subject: "Structural Engineering",
      points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
    }, {
      type: "discussion",
      title: "Posted in Environmental Engineering Forum",
      description: "Wastewater treatment processes",
      subject: "Environmental Engineering",
      points: 5
    }, {
      type: "quiz",
      title: "Completed Geotechnical Engineering Quiz",
      description: "Soil mechanics and foundation design",
      subject: "Geotechnical Engineering",
      points: user.cgpa >= 8.5 ? 17 : 14
    }, {
      type: "resource",
      title: "Downloaded Construction Management Guide",
      description: "Project scheduling and cost estimation",
      subject: "Construction Management",
      points: 3
    }]
  };
  const activities = departmentActivities[user.department] || [];
  return activities.map((activity, index) => {
    const daysAgo = Math.floor((rollNoSeed + index * 7) % 15 + 1); // 1-15 days ago
    const hoursAgo = Math.floor((rollNoSeed + index * 3) % 12 + 1); // 1-12 hours ago within that day

    return {
      id: rollNoSeed + index + 1,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      timestamp: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      subject: activity.subject,
      status: rollNoSeed % 3 === index % 3 ? "completed" : "active",
      points: activity.points
    };
  });
}

// Function to generate weekly activity data
function getWeeklyActivity(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseActivity = user.cgpa >= 9.0 ? 85 : user.cgpa >= 8.5 ? 75 : user.cgpa >= 8.0 ? 65 : 55;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, index) => {
    const variance = (rollNoSeed + index * 11) % 20 - 10; // -10 to +10 variance
    const activity = Math.max(20, Math.min(100, baseActivity + variance));
    return {
      day: day,
      activity: activity,
      assignments: Math.floor((rollNoSeed + index) % 4 + 1),
      discussions: Math.floor((rollNoSeed + index * 3) % 3 + 1),
      resources: Math.floor((rollNoSeed + index * 5) % 5 + 2)
    };
  });
}

// Function to generate engagement metrics
function getEngagementMetrics(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const performanceMultiplier = user.cgpa >= 9.0 ? 1.3 : user.cgpa >= 8.5 ? 1.15 : user.cgpa >= 8.0 ? 1.0 : 0.85;
  return [{
    title: "Study Sessions",
    value: Math.floor((45 + rollNoSeed % 20) * performanceMultiplier),
    change: `+${(Math.random() * 15 + 5).toFixed(1)}%`,
    icon: Book,
    iconColor: "text-blue-400",
    isPositive: true
  }, {
    title: "Discussion Posts",
    value: Math.floor((12 + rollNoSeed % 8) * performanceMultiplier),
    change: `+${(Math.random() * 20 + 10).toFixed(1)}%`,
    icon: MessageSquare,
    iconColor: "text-green-400",
    isPositive: true
  }, {
    title: "Resources Downloaded",
    value: Math.floor((28 + rollNoSeed % 15) * performanceMultiplier),
    change: `+${(Math.random() * 12 + 8).toFixed(1)}%`,
    icon: Download,
    iconColor: "text-purple-400",
    isPositive: true
  }, {
    title: "Activity Points",
    value: Math.floor((150 + rollNoSeed % 50) * performanceMultiplier),
    change: `+${(Math.random() * 18 + 12).toFixed(1)}%`,
    icon: Award,
    iconColor: "text-orange-400",
    isPositive: true
  }];
}
export function StudentActivityPage({
  user
}) {
  // Get personalized data for this student
  const recentActivities = getPersonalizedActivities(user);
  const weeklyActivity = getWeeklyActivity(user);
  const engagementMetrics = getEngagementMetrics(user);
  const totalPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
  const avgActivity = Math.round(weeklyActivity.reduce((sum, day) => sum + day.activity, 0) / weeklyActivity.length);

  // Dialog states
  const [studySessionsOpen, setStudySessionsOpen] = useState(false);
  const [discussionPostsOpen, setDiscussionPostsOpen] = useState(false);
  const [resourcesDownloadedOpen, setResourcesDownloadedOpen] = useState(false);
  const [activityPointsOpen, setActivityPointsOpen] = useState(false);
  const [weeklyOverviewOpen, setWeeklyOverviewOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const getActivityIcon = type => {
    switch (type) {
      case 'assignment':
        return FileText;
      case 'discussion':
        return MessageSquare;
      case 'quiz':
        return CheckCircle;
      case 'resource':
        return Download;
      default:
        return Zap;
    }
  };
  const getActivityColor = type => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'discussion':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'quiz':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'resource':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(motion.h1, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.2,
      duration: 0.5
    }
  }, "Learning Activity"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-dark-secondary mt-2",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }, "Track your engagement and learning progress - ", user.department)), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center space-x-4",
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: 0.4,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-4 h-4 mr-2"
  }), totalPoints, " Points This Week"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 mr-2"
  }), avgActivity, "% Avg Activity")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, engagementMetrics.map((metric, index) => {
    const Icon = metric.icon;
    const handleClick = () => {
      if (metric.title === "Study Sessions") setStudySessionsOpen(true);else if (metric.title === "Discussion Posts") setDiscussionPostsOpen(true);else if (metric.title === "Resources Downloaded") setResourcesDownloadedOpen(true);else if (metric.title === "Activity Points") setActivityPointsOpen(true);
    };
    return /*#__PURE__*/React.createElement(motion.div, {
      key: index,
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        delay: 0.1 * (index + 1),
        duration: 0.5
      },
      whileHover: {
        scale: 1.02
      },
      whileTap: {
        scale: 0.98
      }
    }, /*#__PURE__*/React.createElement(Card, {
      className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-opacity-100 hover:shadow-lg",
      style: {
        borderColor: metric.iconColor.replace('text-', 'rgba(') + '50'
      },
      onClick: handleClick
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary"
    }, metric.title), /*#__PURE__*/React.createElement("p", {
      className: "text-3xl font-bold text-dark-primary"
    }, metric.value), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement(TrendingUp, {
      className: `w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-sm font-medium ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }, metric.change), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-dark-secondary"
    }, "this month"))), /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-6 h-6 ${metric.iconColor}`
    }))))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8"
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
      delay: 0.5,
      duration: 0.5
    },
    whileHover: {
      scale: 1.01
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50",
    onClick: () => setWeeklyOverviewOpen(true)
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Weekly Activity Overview"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your learning activity pattern this week (Click for details)")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: weeklyActivity
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "day",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px'
    },
    labelStyle: {
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "activity",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
  }))))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.5,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Activity Breakdown"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Distribution of your learning activities")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.6,
      duration: 0.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 bg-blue-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, "Assignments")), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, weeklyActivity.reduce((sum, day) => sum + day.assignments, 0))), /*#__PURE__*/React.createElement(Progress, {
    value: 75,
    className: "h-2 bg-dark-bg"
  })), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.7,
      duration: 0.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 bg-green-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, "Discussions")), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, weeklyActivity.reduce((sum, day) => sum + day.discussions, 0))), /*#__PURE__*/React.createElement(Progress, {
    value: 60,
    className: "h-2 bg-dark-bg"
  })), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.8,
      duration: 0.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 bg-orange-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, "Resources")), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, weeklyActivity.reduce((sum, day) => sum + day.resources, 0))), /*#__PURE__*/React.createElement(Progress, {
    value: 85,
    className: "h-2 bg-dark-bg"
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
      delay: 0.9,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Recent Activities"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your latest learning activities and achievements (Click for details)")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, recentActivities.map((activity, index) => {
    const Icon = getActivityIcon(activity.type);
    return /*#__PURE__*/React.createElement(motion.div, {
      key: activity.id,
      className: "flex items-start space-x-4 p-4 bg-dark-hover rounded-lg cursor-pointer transition-all hover:bg-dark-card",
      initial: {
        opacity: 0,
        x: -20
      },
      animate: {
        opacity: 1,
        x: 0
      },
      transition: {
        delay: 1.0 + index * 0.05,
        duration: 0.4
      },
      whileHover: {
        scale: 1.01,
        x: 5
      },
      onClick: () => setSelectedActivity(activity)
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-dark-card rounded-lg flex items-center justify-center flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-5 h-5 text-dark-secondary"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-medium text-dark-primary"
    }, activity.title), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary"
    }, activity.description), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4 text-xs text-dark-secondary"
    }, /*#__PURE__*/React.createElement("span", null, activity.subject), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, activity.timestamp))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Badge, {
      className: getActivityColor(activity.type)
    }, "+", activity.points, " pts"), /*#__PURE__*/React.createElement(Badge, {
      className: `${activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`
    }, activity.status === 'completed' ? /*#__PURE__*/React.createElement(CheckCircle, {
      className: "w-3 h-3 mr-1"
    }) : /*#__PURE__*/React.createElement(Clock, {
      className: "w-3 h-3 mr-1"
    }), activity.status === 'completed' ? 'Completed' : 'Active')))));
  }))))), user.cgpa >= 8.5 && /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: 1.2,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-8 h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary"
  }, "High Achiever!"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Excellent engagement, ", user.name.split(' ')[0], "! Your CGPA of ", user.cgpa, "/10.0 reflects your consistent effort and participation.")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2"
  }, "Active Learner")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: studySessionsOpen,
    onOpenChange: setStudySessionsOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Book, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Study Sessions Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete overview of your study session activities")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-blue-400"
  }, engagementMetrics[0].value), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Total Study Sessions")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Book, {
    className: "w-8 h-8 text-blue-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "This Week"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, Math.floor(engagementMetrics[0].value / 4)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Sessions")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Avg Duration"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, "2.5h"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Per session")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Total Hours"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.floor(engagementMetrics[0].value * 2.5)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "This month"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Recent Study Sessions"), recentActivities.filter(a => a.type === 'assignment' || a.type === 'quiz').map((activity, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, activity.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, activity.timestamp)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, "2-3 hours")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Study Insights"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 mr-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, "You're ", engagementMetrics[0].change, " more active compared to last month")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 mr-2"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Most productive time: ", Math.random() > 0.5 ? 'Evenings (6-9 PM)' : 'Mornings (9-11 AM)'))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: discussionPostsOpen,
    onOpenChange: setDiscussionPostsOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Discussion Posts Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Your forum participation and engagement metrics")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-green-400"
  }, engagementMetrics[1].value), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Total Discussion Posts")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    className: "w-8 h-8 text-green-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Replies Received"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, Math.floor(engagementMetrics[1].value * 3.5)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Total responses")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Likes"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.floor(engagementMetrics[1].value * 5.2)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "On your posts")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Most Active"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-blue-400"
  }, user.department), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Subject forum")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Helpful Marks"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, Math.floor(engagementMetrics[1].value * 2.3)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Received"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Recent Posts"), recentActivities.filter(a => a.type === 'discussion').map((activity, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary mb-1"
  }, activity.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mb-2"
  }, activity.description), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-dark-secondary"
  }, activity.timestamp), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400"
  }, Math.floor(Math.random() * 10 + 5), " likes"), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400"
  }, Math.floor(Math.random() * 5 + 2), " replies"))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: resourcesDownloadedOpen,
    onOpenChange: setResourcesDownloadedOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "Resources Downloaded Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Materials and resources you've accessed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-purple-400"
  }, engagementMetrics[2].value), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Total Resources Downloaded")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-8 h-8 text-purple-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, Math.floor(engagementMetrics[2].value * 0.4)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "PDFs")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.floor(engagementMetrics[2].value * 0.35)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Videos")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, Math.floor(engagementMetrics[2].value * 0.25)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Documents"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Recently Downloaded"), recentActivities.filter(a => a.type === 'resource').map((activity, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 text-purple-400"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, activity.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, activity.subject, " \u2022 ", activity.timestamp))), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  }, "PDF")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Resource Insights"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "You're actively using learning resources with ", engagementMetrics[2].change, " increase this month. Keep accessing quality materials!"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: activityPointsOpen,
    onOpenChange: setActivityPointsOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 mr-2 text-orange-400"
  }), "Activity Points Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Points earned through learning activities")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-orange-400"
  }, engagementMetrics[3].value), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Total Activity Points")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-orange-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-8 h-8 text-orange-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "This Week"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, totalPoints), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Points earned")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Next Milestone"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, Math.ceil(engagementMetrics[3].value / 100) * 100), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, Math.ceil(engagementMetrics[3].value / 100) * 100 - engagementMetrics[3].value, " to go"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Points Breakdown"), [{
    type: 'Assignments',
    points: Math.floor(totalPoints * 0.5),
    color: 'blue'
  }, {
    type: 'Discussions',
    points: Math.floor(totalPoints * 0.2),
    color: 'green'
  }, {
    type: 'Quizzes',
    points: Math.floor(totalPoints * 0.25),
    color: 'purple'
  }, {
    type: 'Resources',
    points: Math.floor(totalPoints * 0.05),
    color: 'orange'
  }].map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-dark-primary"
  }, item.type), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-semibold text-${item.color}-400`
  }, "+", item.points, " pts")), /*#__PURE__*/React.createElement(Progress, {
    value: item.points / totalPoints * 100,
    className: "h-1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg border border-orange-500/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Progress to Milestone"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-semibold text-dark-primary"
  }, engagementMetrics[3].value, " / ", Math.ceil(engagementMetrics[3].value / 100) * 100, " points")), /*#__PURE__*/React.createElement(Target, {
    className: "w-8 h-8 text-orange-400"
  })), /*#__PURE__*/React.createElement(Progress, {
    value: engagementMetrics[3].value % 100,
    className: "h-2 mt-3"
  }))))), /*#__PURE__*/React.createElement(Dialog, {
    open: weeklyOverviewOpen,
    onOpenChange: setWeeklyOverviewOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-3xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Weekly Activity Overview Analysis"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed breakdown of your weekly learning pattern")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: weeklyActivity
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "day",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px'
    },
    labelStyle: {
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "activity",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Average"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, avgActivity, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Weekly activity")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Most Active"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, weeklyActivity.sort((a, b) => b.activity - a.activity)[0]?.day), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, Math.max(...weeklyActivity.map(d => d.activity)), "% activity")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Total Activities"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, weeklyActivity.reduce((sum, day) => sum + day.assignments + day.discussions + day.resources, 0)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "This week"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Day-by-Day Breakdown"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, weeklyActivity.map((day, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, day.day), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Progress, {
    value: day.activity,
    className: "h-1.5 w-20"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 font-semibold w-12"
  }, day.activity, "%")))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Activity Types"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-blue-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-primary"
  }, "Assignments")), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-blue-400"
  }, weeklyActivity.reduce((sum, day) => sum + day.assignments, 0))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-green-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-primary"
  }, "Discussions")), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-green-400"
  }, weeklyActivity.reduce((sum, day) => sum + day.discussions, 0))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-orange-500 rounded"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-primary"
  }, "Resources")), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-orange-400"
  }, weeklyActivity.reduce((sum, day) => sum + day.resources, 0)))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Weekly Insights"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 mr-2 text-green-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, "Your most productive day is ", weeklyActivity.sort((a, b) => b.activity - a.activity)[0]?.day)), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 mr-2 text-blue-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, "Consistent activity pattern throughout the week")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-4 h-4 mr-2 text-purple-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, "Keep maintaining this balanced approach across different activities"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!selectedActivity,
    onOpenChange: () => setSelectedActivity(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, selectedActivity && (() => {
    const Icon = getActivityIcon(selectedActivity.type);
    return /*#__PURE__*/React.createElement(Icon, {
      className: "w-6 h-6 mr-2 text-blue-400"
    });
  })(), "Activity Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete information about this learning activity")), selectedActivity && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2"
  }, selectedActivity.title), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, selectedActivity.description)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Subject"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, selectedActivity.subject)), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Status"), /*#__PURE__*/React.createElement(Badge, {
    className: `${selectedActivity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`
  }, selectedActivity.status === 'completed' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-3 h-3 mr-1"
  }) : /*#__PURE__*/React.createElement(Clock, {
    className: "w-3 h-3 mr-1"
  }), selectedActivity.status === 'completed' ? 'Completed' : 'Active')), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Points Earned"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, "+", selectedActivity.points)), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Timestamp"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, selectedActivity.timestamp))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Activity Type"), /*#__PURE__*/React.createElement(Badge, {
    className: getActivityColor(selectedActivity.type)
  }, selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500/10 to-green-500/10 p-4 rounded-lg border border-blue-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Activity Impact"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "This activity contributed ", selectedActivity.points, " points to your total score and helped improve your ", selectedActivity.subject, " engagement.", selectedActivity.status === 'completed' && ' Great job on completing this!'))))));
}