import * as React from "react";
import { useState } from "react";
import { Calendar, BarChart3, CheckCircle, XCircle, Clock, TrendingUp, Target, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "motion/react";
// Function to generate personalized attendance data based on student information
function getPersonalizedAttendanceData(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 95 : user.cgpa >= 8.5 ? 90 : user.cgpa >= 8.0 ? 85 : 80;
  const departmentSubjects = {
    "Computer Science": ["Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Software Engineering"],
    "Electronics": ["Digital Signal Processing", "VLSI Design", "Communication Systems", "Microprocessors"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing Processes"],
    "Information Technology": ["Web Development", "Database Systems", "Cybersecurity", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Engineering", "Geotechnical Engineering", "Construction Management"]
  };
  const subjects = departmentSubjects[user.department] || [];
  return subjects.map((subject, index) => {
    const variance = (rollNoSeed + index * 13) % 8 - 4; // -4 to +4 variance
    const attendance = Math.max(75, Math.min(100, baseAttendance + variance));
    const totalClasses = 28 + (rollNoSeed + index) % 5; // 28-32 total classes
    const attendedClasses = Math.round(attendance / 100 * totalClasses);
    return {
      subject: subject,
      attended: attendedClasses,
      total: totalClasses,
      percentage: parseFloat((attendedClasses / totalClasses * 100).toFixed(1))
    };
  });
}

// Function to generate monthly attendance trend
function getMonthlyTrend(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 93 : user.cgpa >= 8.5 ? 89 : user.cgpa >= 8.0 ? 85 : 82;
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan"];
  return months.map((month, index) => {
    const variance = (rollNoSeed + index * 7) % 6 - 3; // -3 to +3 variance
    const attendance = Math.max(75, Math.min(98, baseAttendance + variance));
    return {
      month: month,
      attendance: attendance
    };
  });
}

// Function to generate recent attendance records
function getRecentAttendance(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  const subjects = {
    "Computer Science": ["Data Structures", "Database Systems", "Computer Networks", "Software Engineering"],
    "Electronics": ["DSP", "VLSI Design", "Communication Systems", "Microprocessors"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing"],
    "Information Technology": ["Web Development", "Database Systems", "Cybersecurity", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Eng", "Geotechnical", "Construction Mgmt"]
  }[user.department] || [];
  const records = [];
  for (let i = 0; i < 8; i++) {
    const daysAgo = i + 1;
    const subject = subjects[i % subjects.length];
    const attendanceChance = user.cgpa >= 9.0 ? 0.95 : user.cgpa >= 8.5 ? 0.90 : user.cgpa >= 8.0 ? 0.85 : 0.80;
    const isPresent = (rollNoSeed + i * 11) % 100 < attendanceChance * 100;
    const timeSlots = ["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM", "11:00 AM - 12:30 PM", "3:00 PM - 4:30 PM"];
    records.push({
      date: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subject: subject,
      status: isPresent ? "Present" : "Absent",
      time: timeSlots[i % timeSlots.length]
    });
  }
  return records;
}
export function StudentAttendancePage({
  user
}) {
  // Get personalized data for this student
  const attendanceData = getPersonalizedAttendanceData(user);
  const monthlyTrend = getMonthlyTrend(user);
  const recentAttendance = getRecentAttendance(user);
  const overallAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);
  const totalClasses = attendanceData.reduce((sum, item) => sum + item.total, 0);
  const attendedClasses = attendanceData.reduce((sum, item) => sum + item.attended, 0);

  // Dialog states
  const [overallAttendanceOpen, setOverallAttendanceOpen] = useState(false);
  const [classesAttendedOpen, setClassesAttendedOpen] = useState(false);
  const [thisMonthOpen, setThisMonthOpen] = useState(false);
  const [attendanceStatusOpen, setAttendanceStatusOpen] = useState(false);
  const [monthlyTrendOpen, setMonthlyTrendOpen] = useState(false);
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
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
  }, "Attendance Tracking"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, "Monitor your class attendance and patterns - ", user.department)), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 mr-2"
  }), "Overall: ", overallAttendance, "%"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 mr-2"
  }), attendedClasses, "/", totalClasses, " Classes")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.1,
      duration: 0.5
    },
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20",
    onClick: () => setOverallAttendanceOpen(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Overall Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary"
  }, overallAttendance, "%"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: `w-4 h-4 ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-medium ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`
  }, overallAttendance >= user.cgpa * 10 ? '+2.3%' : '-1.2%'), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "vs target"))), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 text-green-400"
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
      delay: 0.2,
      duration: 0.5
    },
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20",
    onClick: () => setClassesAttendedOpen(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Classes Attended"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary"
  }, attendedClasses), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "out of ", totalClasses, " classes")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 text-blue-400"
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
      delay: 0.3,
      duration: 0.5
    },
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20",
    onClick: () => setThisMonthOpen(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "This Month"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary"
  }, monthlyTrend[monthlyTrend.length - 1]?.attendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Current month attendance")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-6 h-6 text-purple-400"
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
      delay: 0.4,
      duration: 0.5
    },
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20",
    onClick: () => setAttendanceStatusOpen(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Attendance Status"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary"
  }, overallAttendance >= 85 ? "Good" : overallAttendance >= 75 ? "Fair" : "Low"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, overallAttendance >= 85 ? "Above requirement" : "Needs improvement")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center"
  }, overallAttendance >= 85 ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 text-green-400"
  }) : /*#__PURE__*/React.createElement(XCircle, {
    className: "w-6 h-6 text-red-400"
  }))))))), /*#__PURE__*/React.createElement("div", {
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
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Subject-wise Attendance"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your attendance breakdown by subject")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, attendanceData.map((item, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "space-y-2",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.6 + index * 0.1,
      duration: 0.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, item.subject), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, item.attended, "/", item.total), /*#__PURE__*/React.createElement(Badge, {
    className: `${item.percentage >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' : item.percentage >= 75 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`
  }, item.percentage, "%"))), /*#__PURE__*/React.createElement(Progress, {
    value: item.percentage,
    className: "h-2 bg-dark-bg"
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
    },
    whileHover: {
      scale: 1.01
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50",
    onClick: () => setMonthlyTrendOpen(true)
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Monthly Attendance Trend"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your attendance pattern over months (Click for details)")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: monthlyTrend
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    domain: [70, 100]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px'
    },
    labelStyle: {
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#3B82F6",
    strokeWidth: 3,
    dot: {
      fill: '#3B82F6',
      strokeWidth: 2,
      r: 6
    }
  })))))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.7,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Recent Attendance Records"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your latest class attendance history")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, recentAttendance.map((record, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.8 + index * 0.05,
      duration: 0.4
    },
    whileHover: {
      scale: 1.01,
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-3 h-3 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, record.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, formatDate(record.date), " \u2022 ", record.time))), /*#__PURE__*/React.createElement(Badge, {
    className: `${record.status === 'Present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`
  }, record.status === 'Present' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 mr-1"
  }) : /*#__PURE__*/React.createElement(XCircle, {
    className: "w-4 h-4 mr-1"
  }), record.status))))))), overallAttendance < 85 && /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: 0.9,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-8 h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary"
  }, "Attendance Alert"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Your attendance is ", overallAttendance, "%. You need ", 85 - overallAttendance, "% more to reach the minimum requirement of 85%.")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2"
  }, "Action Required")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: overallAttendanceOpen,
    onOpenChange: setOverallAttendanceOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Overall Attendance Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive breakdown of your attendance across all subjects")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-green-400"
  }, overallAttendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Overall Attendance Rate")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-8 h-8 text-green-400"
  }))), /*#__PURE__*/React.createElement(Progress, {
    value: overallAttendance,
    className: "h-3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Total Classes"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, totalClasses), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Scheduled")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Attended"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, attendedClasses), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Present")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Missed"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-red-400"
  }, totalClasses - attendedClasses), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Absent"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Subject-wise Breakdown"), attendanceData.map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, item.subject), /*#__PURE__*/React.createElement(Badge, {
    className: `${item.percentage >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' : item.percentage >= 75 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`
  }, item.percentage, "%")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm text-dark-secondary mb-2"
  }, /*#__PURE__*/React.createElement("span", null, item.attended, " / ", item.total, " classes"), /*#__PURE__*/React.createElement("span", null, item.total - item.attended, " missed")), /*#__PURE__*/React.createElement(Progress, {
    value: item.percentage,
    className: "h-1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-2 text-dark-primary"
  }, "Attendance Insights"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: `${overallAttendance >= 85 ? 'text-green-400' : 'text-yellow-400'} mr-2`
  }, overallAttendance >= 85 ? '✓' : '⚠'), /*#__PURE__*/React.createElement("span", null, "Your attendance is ", overallAttendance >= 85 ? 'above' : 'below', " the minimum requirement of 85%")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 mr-2"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Best attendance: ", attendanceData.sort((a, b) => b.percentage - a.percentage)[0]?.subject, " (", attendanceData.sort((a, b) => b.percentage - a.percentage)[0]?.percentage, "%)")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-orange-400 mr-2"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Needs attention: ", attendanceData.sort((a, b) => a.percentage - b.percentage)[0]?.subject, " (", attendanceData.sort((a, b) => a.percentage - b.percentage)[0]?.percentage, "%)"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: classesAttendedOpen,
    onOpenChange: setClassesAttendedOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Classes Attended Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete overview of your class participation")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-blue-400"
  }, attendedClasses, "/", totalClasses), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Classes Attended")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-8 h-8 text-blue-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "This Week"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, Math.floor(attendedClasses / 5)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Classes attended")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "This Month"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, Math.floor(attendedClasses / 1.5)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Classes attended")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Consecutive"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.floor(attendedClasses / 10)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Days present")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Perfect Weeks"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, Math.floor(attendedClasses / 20)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "100% attendance"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Recent Attendance"), recentAttendance.slice(0, 5).map((record, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-2 h-2 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, record.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, formatDate(record.date), " \u2022 ", record.time))), /*#__PURE__*/React.createElement(Badge, {
    className: `${record.status === 'Present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`
  }, record.status))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: thisMonthOpen,
    onOpenChange: setThisMonthOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "This Month's Attendance"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Current month attendance analysis and trends")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-6 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-purple-400"
  }, monthlyTrend[monthlyTrend.length - 1]?.attendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, monthlyTrend[monthlyTrend.length - 1]?.month, " Attendance")), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-8 h-8 text-purple-400"
  }))), /*#__PURE__*/React.createElement(Progress, {
    value: monthlyTrend[monthlyTrend.length - 1]?.attendance,
    className: "h-3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Monthly Average"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, Math.round(monthlyTrend.reduce((sum, m) => sum + m.attendance, 0) / monthlyTrend.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Across all months")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Best Month"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.max(...monthlyTrend.map(m => m.attendance)), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month)), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Trend"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[monthlyTrend.length - 2]?.attendance ? '↑' : '↓', Math.abs(monthlyTrend[monthlyTrend.length - 1]?.attendance - monthlyTrend[monthlyTrend.length - 2]?.attendance).toFixed(1), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "From last month")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Classes This Month"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, Math.floor(totalClasses / 5)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Total conducted"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Monthly Comparison"), monthlyTrend.map((month, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-dark-hover p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-dark-primary"
  }, month.month), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-purple-400"
  }, month.attendance, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: month.attendance,
    className: "h-1.5"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: attendanceStatusOpen,
    onOpenChange: setAttendanceStatusOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, overallAttendance >= 85 ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 mr-2 text-green-400"
  }) : /*#__PURE__*/React.createElement(XCircle, {
    className: "w-6 h-6 mr-2 text-orange-400"
  }), "Attendance Status"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Current attendance status and recommendations")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `bg-dark-hover p-6 rounded-lg border ${overallAttendance >= 85 ? 'border-green-500/30' : 'border-orange-500/30'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-dark-primary"
  }, overallAttendance >= 85 ? "Good" : overallAttendance >= 75 ? "Fair" : "Low"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Current Status")), /*#__PURE__*/React.createElement("div", {
    className: `w-16 h-16 rounded-xl flex items-center justify-center ${overallAttendance >= 85 ? 'bg-green-500/20' : 'bg-orange-500/20'}`
  }, overallAttendance >= 85 ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-8 h-8 text-green-400"
  }) : /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-8 h-8 text-orange-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Requirement"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, "85%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Minimum needed")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Your Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, overallAttendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, overallAttendance >= 85 ? `+${overallAttendance - 85}% above` : `${85 - overallAttendance}% below`))), overallAttendance < 85 && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-orange-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Action Required"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-3"
  }, "To reach 85% attendance, you need to attend ", Math.ceil((0.85 * totalClasses - attendedClasses) / (1 - 0.85)), " consecutive classes without any absences."), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "Classes needed to attend:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-orange-400"
  }, Math.ceil((0.85 * totalClasses - attendedClasses) / (1 - 0.85)))), /*#__PURE__*/React.createElement(Progress, {
    value: 50,
    className: "h-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-3 text-dark-primary"
  }, "Status Insights"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-dark-secondary"
  }, overallAttendance >= 85 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 mr-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, "Excellent! You've met the minimum attendance requirement")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 mr-2"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "You can miss up to ", Math.floor((overallAttendance - 85) * totalClasses / 100), " more classes")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-purple-400 mr-2"
  }, "\u2605"), /*#__PURE__*/React.createElement("span", null, "Keep maintaining this consistent attendance pattern"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-orange-400 mr-2"
  }, "\u26A0"), /*#__PURE__*/React.createElement("span", null, "Your attendance is below the required 85% threshold")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-red-400 mr-2"
  }, "!"), /*#__PURE__*/React.createElement("span", null, "You need to improve attendance in ", attendanceData.filter(d => d.percentage < 85).length, " subjects")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 mr-2"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Focus on maintaining 100% attendance for the next few weeks")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: monthlyTrendOpen,
    onOpenChange: setMonthlyTrendOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color text-dark-primary max-w-3xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "flex items-center text-2xl"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Monthly Attendance Trend Analysis"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed analysis of your attendance pattern over time")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: monthlyTrend
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    domain: [70, 100]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px'
    },
    labelStyle: {
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#3B82F6",
    strokeWidth: 3,
    dot: {
      fill: '#3B82F6',
      strokeWidth: 2,
      r: 8
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Average"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, Math.round(monthlyTrend.reduce((sum, m) => sum + m.attendance, 0) / monthlyTrend.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Overall")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Highest"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.max(...monthlyTrend.map(m => m.attendance)), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month)), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Lowest"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-red-400"
  }, Math.min(...monthlyTrend.map(m => m.attendance)), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, monthlyTrend.sort((a, b) => a.attendance - b.attendance)[0]?.month))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Month-by-Month"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, monthlyTrend.map((month, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded-full bg-blue-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-dark-primary"
  }, month.month)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Progress, {
    value: month.attendance,
    className: "h-1.5 w-20"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-blue-400 w-12"
  }, month.attendance, "%")))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-hover p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, "Trend Analysis"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-4 h-4 mr-2 text-blue-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[0]?.attendance ? `Improved by ${(monthlyTrend[monthlyTrend.length - 1]?.attendance - monthlyTrend[0]?.attendance).toFixed(1)}% since ${monthlyTrend[0]?.month}` : `Decreased by ${(monthlyTrend[0]?.attendance - monthlyTrend[monthlyTrend.length - 1]?.attendance).toFixed(1)}% since ${monthlyTrend[0]?.month}`)), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4 mr-2 text-green-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, "Best performance in ", monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month, " with ", Math.max(...monthlyTrend.map(m => m.attendance)), "% attendance")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 mr-2 text-purple-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, monthlyTrend.filter((m, i) => i > 0 && m.attendance > monthlyTrend[i - 1].attendance).length, " months showed improvement")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 mr-2 text-orange-400 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, "Consistently ", monthlyTrend.filter(m => m.attendance >= 85).length >= monthlyTrend.length / 2 ? 'above' : 'meeting', " attendance targets"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/30"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Key Insights"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Your attendance trend shows ", monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[monthlyTrend.length - 2]?.attendance ? 'positive momentum' : 'room for improvement', ".", monthlyTrend.filter(m => m.attendance >= 85).length === monthlyTrend.length ? ' You\'ve maintained excellent attendance throughout all months!' : ` Focus on the upcoming months to maintain consistency and reach the ${85 - monthlyTrend[monthlyTrend.length - 1]?.attendance > 0 ? '85% target' : 'higher goals'}.`))))));
}