import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { FileText, BarChart3, Download, Users, TrendingUp, Filter, Eye, CheckCircle2, Clock, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { STUDENTS_DATA } from "../StudentData";
// Teacher-specific class performance data
const getClassPerformanceData = (teacherId, department) => {
  const teacherData = {
    "2001": [{
      class: "Data Structures & Algorithms",
      avgScore: 87,
      totalStudents: 22,
      passRate: 96,
      highestScore: 98,
      lowestScore: 65,
      median: 88
    }, {
      class: "Advanced Algorithms",
      avgScore: 82,
      totalStudents: 18,
      passRate: 94,
      highestScore: 95,
      lowestScore: 62,
      median: 84
    }, {
      class: "Theory of Computation",
      avgScore: 79,
      totalStudents: 20,
      passRate: 90,
      highestScore: 92,
      lowestScore: 58,
      median: 80
    }],
    "2002": [{
      class: "Digital Signal Processing",
      avgScore: 85,
      totalStudents: 24,
      passRate: 92,
      highestScore: 96,
      lowestScore: 68,
      median: 86
    }, {
      class: "Signal & Systems",
      avgScore: 81,
      totalStudents: 20,
      passRate: 95,
      highestScore: 94,
      lowestScore: 64,
      median: 82
    }, {
      class: "Communication Systems",
      avgScore: 88,
      totalStudents: 19,
      passRate: 100,
      highestScore: 98,
      lowestScore: 72,
      median: 89
    }],
    "2003": [{
      class: "Thermodynamics",
      avgScore: 83,
      totalStudents: 26,
      passRate: 88,
      highestScore: 95,
      lowestScore: 60,
      median: 84
    }, {
      class: "Heat Transfer",
      avgScore: 78,
      totalStudents: 22,
      passRate: 86,
      highestScore: 90,
      lowestScore: 56,
      median: 79
    }, {
      class: "Applied Thermodynamics",
      avgScore: 86,
      totalStudents: 21,
      passRate: 95,
      highestScore: 97,
      lowestScore: 70,
      median: 87
    }],
    "2004": [{
      class: "Database Management Systems",
      avgScore: 92,
      totalStudents: 20,
      passRate: 100,
      highestScore: 100,
      lowestScore: 78,
      median: 93
    }, {
      class: "Advanced Database Systems",
      avgScore: 88,
      totalStudents: 17,
      passRate: 94,
      highestScore: 96,
      lowestScore: 72,
      median: 89
    }, {
      class: "Data Warehousing",
      avgScore: 85,
      totalStudents: 19,
      passRate: 95,
      highestScore: 94,
      lowestScore: 68,
      median: 86
    }],
    "2005": [{
      class: "Structural Engineering",
      avgScore: 84,
      totalStudents: 25,
      passRate: 92,
      highestScore: 96,
      lowestScore: 66,
      median: 85
    }, {
      class: "Structural Analysis",
      avgScore: 81,
      totalStudents: 23,
      passRate: 87,
      highestScore: 93,
      lowestScore: 62,
      median: 82
    }, {
      class: "Design of Structures",
      avgScore: 87,
      totalStudents: 20,
      passRate: 95,
      highestScore: 98,
      lowestScore: 74,
      median: 88
    }],
    "2006": [{
      class: "Machine Learning",
      avgScore: 89,
      totalStudents: 21,
      passRate: 95,
      highestScore: 99,
      lowestScore: 70,
      median: 90
    }, {
      class: "Deep Learning",
      avgScore: 85,
      totalStudents: 18,
      passRate: 94,
      highestScore: 96,
      lowestScore: 68,
      median: 86
    }, {
      class: "AI Fundamentals",
      avgScore: 91,
      totalStudents: 19,
      passRate: 100,
      highestScore: 100,
      lowestScore: 76,
      median: 92
    }],
    "2007": [{
      class: "VLSI Design",
      avgScore: 87,
      totalStudents: 22,
      passRate: 95,
      highestScore: 98,
      lowestScore: 72,
      median: 88
    }, {
      class: "Digital VLSI",
      avgScore: 82,
      totalStudents: 19,
      passRate: 89,
      highestScore: 92,
      lowestScore: 64,
      median: 83
    }, {
      class: "VLSI Technology",
      avgScore: 86,
      totalStudents: 20,
      passRate: 95,
      highestScore: 96,
      lowestScore: 70,
      median: 87
    }],
    "2008": [{
      class: "Cybersecurity Fundamentals",
      avgScore: 90,
      totalStudents: 19,
      passRate: 100,
      highestScore: 100,
      lowestScore: 74,
      median: 91
    }, {
      class: "Network Security",
      avgScore: 86,
      totalStudents: 17,
      passRate: 94,
      highestScore: 95,
      lowestScore: 68,
      median: 87
    }, {
      class: "Ethical Hacking",
      avgScore: 88,
      totalStudents: 18,
      passRate: 94,
      highestScore: 97,
      lowestScore: 72,
      median: 89
    }],
    "2009": [{
      class: "Fluid Mechanics",
      avgScore: 82,
      totalStudents: 24,
      passRate: 92,
      highestScore: 94,
      lowestScore: 64,
      median: 83
    }, {
      class: "Advanced Fluid Mechanics",
      avgScore: 78,
      totalStudents: 21,
      passRate: 86,
      highestScore: 90,
      lowestScore: 58,
      median: 79
    }, {
      class: "Computational Fluid Dynamics",
      avgScore: 85,
      totalStudents: 19,
      passRate: 95,
      highestScore: 96,
      lowestScore: 70,
      median: 86
    }],
    "2010": [{
      class: "Environmental Engineering",
      avgScore: 84,
      totalStudents: 23,
      passRate: 91,
      highestScore: 95,
      lowestScore: 66,
      median: 85
    }, {
      class: "Water Resources Engineering",
      avgScore: 81,
      totalStudents: 20,
      passRate: 90,
      highestScore: 92,
      lowestScore: 62,
      median: 82
    }, {
      class: "Pollution Control",
      avgScore: 87,
      totalStudents: 21,
      passRate: 95,
      highestScore: 97,
      lowestScore: 72,
      median: 88
    }]
  };
  return teacherData[teacherId] || [];
};

// Teacher-specific attendance data
const getAttendanceData = teacherId => {
  const seed = parseInt(teacherId);
  return [{
    month: "Sep",
    attendance: 88 + seed % 5,
    present: 18 + seed % 4,
    absent: 2 + seed % 2,
    totalClasses: 20
  }, {
    month: "Oct",
    attendance: 85 + seed % 6,
    present: 17 + seed % 5,
    absent: 3 + seed % 2,
    totalClasses: 20
  }, {
    month: "Nov",
    attendance: 90 + seed % 4,
    present: 19 + seed % 3,
    absent: 1 + seed % 2,
    totalClasses: 20
  }, {
    month: "Dec",
    attendance: 87 + seed % 5,
    present: 18 + seed % 4,
    absent: 2 + seed % 2,
    totalClasses: 20
  }, {
    month: "Jan",
    attendance: 84 + seed % 6,
    present: 17 + seed % 5,
    absent: 3 + seed % 3,
    totalClasses: 20
  }];
};

// Teacher-specific recent reports
const getRecentReports = (teacherId, department) => {
  const teacherReports = {
    "2001": [{
      id: 1,
      title: "Algorithms Performance - Mid Semester",
      type: "Academic Performance",
      generatedDate: "2024-01-10",
      status: "Ready",
      fileSize: "2.2 MB",
      downloads: 5,
      viewCount: 12
    }, {
      id: 2,
      title: "Data Structures Attendance Summary",
      type: "Attendance",
      generatedDate: "2024-01-05",
      status: "Ready",
      fileSize: "1.6 MB",
      downloads: 3,
      viewCount: 8
    }, {
      id: 3,
      title: "Theory of Computation Assignment Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-03",
      status: "Ready",
      fileSize: "2.8 MB",
      downloads: 6,
      viewCount: 14
    }, {
      id: 4,
      title: "Advanced Algorithms Progress Report",
      type: "Course Progress",
      generatedDate: "2023-12-28",
      status: "Ready",
      fileSize: "1.4 MB",
      downloads: 4,
      viewCount: 9
    }],
    "2002": [{
      id: 1,
      title: "DSP Mid-Semester Performance",
      type: "Academic Performance",
      generatedDate: "2024-01-11",
      status: "Ready",
      fileSize: "2.5 MB",
      downloads: 6,
      viewCount: 13
    }, {
      id: 2,
      title: "Signal Systems Attendance Report",
      type: "Attendance",
      generatedDate: "2024-01-06",
      status: "Ready",
      fileSize: "1.7 MB",
      downloads: 4,
      viewCount: 9
    }, {
      id: 3,
      title: "Communication Systems Lab Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-04",
      status: "Ready",
      fileSize: "3.1 MB",
      downloads: 7,
      viewCount: 16
    }, {
      id: 4,
      title: "Electronics Course Progress",
      type: "Course Progress",
      generatedDate: "2023-12-29",
      status: "Ready",
      fileSize: "1.6 MB",
      downloads: 5,
      viewCount: 10
    }],
    "2003": [{
      id: 1,
      title: "Thermodynamics Performance Report",
      type: "Academic Performance",
      generatedDate: "2024-01-09",
      status: "Ready",
      fileSize: "2.3 MB",
      downloads: 4,
      viewCount: 11
    }, {
      id: 2,
      title: "Heat Transfer Attendance Summary",
      type: "Attendance",
      generatedDate: "2024-01-04",
      status: "Ready",
      fileSize: "1.5 MB",
      downloads: 3,
      viewCount: 7
    }, {
      id: 3,
      title: "Applied Thermodynamics Lab Report",
      type: "Academic Performance",
      generatedDate: "2024-01-02",
      status: "Ready",
      fileSize: "3.0 MB",
      downloads: 6,
      viewCount: 13
    }, {
      id: 4,
      title: "Mechanical Engineering Progress",
      type: "Course Progress",
      generatedDate: "2023-12-27",
      status: "Ready",
      fileSize: "1.3 MB",
      downloads: 3,
      viewCount: 8
    }],
    "2004": [{
      id: 1,
      title: "DBMS Mid-Semester Evaluation",
      type: "Academic Performance",
      generatedDate: "2024-01-12",
      status: "Ready",
      fileSize: "2.6 MB",
      downloads: 7,
      viewCount: 15
    }, {
      id: 2,
      title: "Database Systems Attendance",
      type: "Attendance",
      generatedDate: "2024-01-07",
      status: "Ready",
      fileSize: "1.9 MB",
      downloads: 5,
      viewCount: 11
    }, {
      id: 3,
      title: "Data Warehousing Project Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-05",
      status: "Ready",
      fileSize: "3.4 MB",
      downloads: 8,
      viewCount: 17
    }, {
      id: 4,
      title: "IT Course Completion Statistics",
      type: "Course Progress",
      generatedDate: "2023-12-30",
      status: "Ready",
      fileSize: "1.7 MB",
      downloads: 6,
      viewCount: 12
    }],
    "2005": [{
      id: 1,
      title: "Structural Engineering Performance",
      type: "Academic Performance",
      generatedDate: "2024-01-08",
      status: "Ready",
      fileSize: "2.4 MB",
      downloads: 5,
      viewCount: 10
    }, {
      id: 2,
      title: "Structural Analysis Attendance",
      type: "Attendance",
      generatedDate: "2024-01-03",
      status: "Ready",
      fileSize: "1.6 MB",
      downloads: 4,
      viewCount: 8
    }, {
      id: 3,
      title: "Design of Structures Assessment",
      type: "Academic Performance",
      generatedDate: "2024-01-01",
      status: "Ready",
      fileSize: "2.9 MB",
      downloads: 6,
      viewCount: 14
    }, {
      id: 4,
      title: "Civil Engineering Progress Report",
      type: "Course Progress",
      generatedDate: "2023-12-26",
      status: "Ready",
      fileSize: "1.4 MB",
      downloads: 4,
      viewCount: 9
    }],
    "2006": [{
      id: 1,
      title: "Machine Learning Mid-Term Report",
      type: "Academic Performance",
      generatedDate: "2024-01-11",
      status: "Ready",
      fileSize: "2.7 MB",
      downloads: 8,
      viewCount: 16
    }, {
      id: 2,
      title: "Deep Learning Attendance Report",
      type: "Attendance",
      generatedDate: "2024-01-06",
      status: "Ready",
      fileSize: "1.8 MB",
      downloads: 5,
      viewCount: 10
    }, {
      id: 3,
      title: "AI Fundamentals Project Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-04",
      status: "Ready",
      fileSize: "3.3 MB",
      downloads: 9,
      viewCount: 18
    }, {
      id: 4,
      title: "ML/AI Course Progress Statistics",
      type: "Course Progress",
      generatedDate: "2023-12-29",
      status: "Ready",
      fileSize: "1.8 MB",
      downloads: 7,
      viewCount: 13
    }],
    "2007": [{
      id: 1,
      title: "VLSI Design Performance Report",
      type: "Academic Performance",
      generatedDate: "2024-01-10",
      status: "Ready",
      fileSize: "2.5 MB",
      downloads: 6,
      viewCount: 12
    }, {
      id: 2,
      title: "Digital VLSI Attendance Summary",
      type: "Attendance",
      generatedDate: "2024-01-05",
      status: "Ready",
      fileSize: "1.7 MB",
      downloads: 4,
      viewCount: 9
    }, {
      id: 3,
      title: "VLSI Technology Lab Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-03",
      status: "Ready",
      fileSize: "3.2 MB",
      downloads: 7,
      viewCount: 15
    }, {
      id: 4,
      title: "VLSI Course Completion Report",
      type: "Course Progress",
      generatedDate: "2023-12-28",
      status: "Ready",
      fileSize: "1.6 MB",
      downloads: 5,
      viewCount: 10
    }],
    "2008": [{
      id: 1,
      title: "Cybersecurity Mid-Semester Evaluation",
      type: "Academic Performance",
      generatedDate: "2024-01-12",
      status: "Ready",
      fileSize: "2.8 MB",
      downloads: 7,
      viewCount: 14
    }, {
      id: 2,
      title: "Network Security Attendance",
      type: "Attendance",
      generatedDate: "2024-01-07",
      status: "Ready",
      fileSize: "1.9 MB",
      downloads: 5,
      viewCount: 11
    }, {
      id: 3,
      title: "Ethical Hacking Assignment Report",
      type: "Academic Performance",
      generatedDate: "2024-01-05",
      status: "Ready",
      fileSize: "3.5 MB",
      downloads: 8,
      viewCount: 17
    }, {
      id: 4,
      title: "Security Course Progress Statistics",
      type: "Course Progress",
      generatedDate: "2023-12-30",
      status: "Ready",
      fileSize: "1.8 MB",
      downloads: 6,
      viewCount: 12
    }],
    "2009": [{
      id: 1,
      title: "Fluid Mechanics Performance Report",
      type: "Academic Performance",
      generatedDate: "2024-01-09",
      status: "Ready",
      fileSize: "2.4 MB",
      downloads: 5,
      viewCount: 11
    }, {
      id: 2,
      title: "Advanced Fluid Mechanics Attendance",
      type: "Attendance",
      generatedDate: "2024-01-04",
      status: "Ready",
      fileSize: "1.6 MB",
      downloads: 4,
      viewCount: 8
    }, {
      id: 3,
      title: "CFD Simulation Project Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-02",
      status: "Ready",
      fileSize: "3.1 MB",
      downloads: 7,
      viewCount: 14
    }, {
      id: 4,
      title: "Fluid Dynamics Course Progress",
      type: "Course Progress",
      generatedDate: "2023-12-27",
      status: "Ready",
      fileSize: "1.5 MB",
      downloads: 4,
      viewCount: 9
    }],
    "2010": [{
      id: 1,
      title: "Environmental Engineering Assessment",
      type: "Academic Performance",
      generatedDate: "2024-01-08",
      status: "Ready",
      fileSize: "2.3 MB",
      downloads: 4,
      viewCount: 10
    }, {
      id: 2,
      title: "Water Resources Attendance Report",
      type: "Attendance",
      generatedDate: "2024-01-03",
      status: "Ready",
      fileSize: "1.5 MB",
      downloads: 3,
      viewCount: 7
    }, {
      id: 3,
      title: "Pollution Control Lab Analysis",
      type: "Academic Performance",
      generatedDate: "2024-01-01",
      status: "Ready",
      fileSize: "2.8 MB",
      downloads: 6,
      viewCount: 13
    }, {
      id: 4,
      title: "Environmental Studies Progress",
      type: "Course Progress",
      generatedDate: "2023-12-26",
      status: "Ready",
      fileSize: "1.3 MB",
      downloads: 3,
      viewCount: 8
    }]
  };
  return teacherReports[teacherId] || [];
};
const reportTemplates = [{
  name: "Student Performance Report",
  description: "Comprehensive analysis of student academic performance",
  dataPoints: ["Grades", "Assignments", "Quizzes", "Participation"],
  estimatedTime: "5 minutes"
}, {
  name: "Class Attendance Report",
  description: "Detailed attendance tracking and analysis",
  dataPoints: ["Daily Attendance", "Trends", "Absenteeism Patterns"],
  estimatedTime: "3 minutes"
}, {
  name: "Course Progress Report",
  description: "Track course completion and module progress",
  dataPoints: ["Module Completion", "Timeline Analysis", "Learning Outcomes"],
  estimatedTime: "4 minutes"
}, {
  name: "Assignment Analysis Report",
  description: "Analyze assignment submission patterns and scores",
  dataPoints: ["Submission Rates", "Score Distribution", "Late Submissions"],
  estimatedTime: "6 minutes"
}];
export function TeacherReportsPage({
  user
}) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [selectedChartData, setSelectedChartData] = useState(null);

  // Get teacher-specific data
  const classPerformanceData = getClassPerformanceData(user.id, user.department);
  const attendanceData = getAttendanceData(user.id);
  const recentReports = getRecentReports(user.id, user.department);

  // Get students from teacher's department (including custom and excluding deleted)
  const loadCustomStudents = () => {
    try {
      const stored = localStorage.getItem("eduquest_custom_students");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  };
  const loadDeletedStudents = () => {
    try {
      const stored = localStorage.getItem("eduquest_deleted_students");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  };
  const loadEditedStudents = () => {
    try {
      const stored = localStorage.getItem("eduquest_edited_students");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  };
  const customStudents = loadCustomStudents();
  const deletedStudents = loadDeletedStudents();
  const editedStudents = loadEditedStudents();

  // Combine all students from teacher's department
  const allDepartmentStudents = [...STUDENTS_DATA.filter(s => !deletedStudents.includes(s.rollNo)).map(s => {
    const editedVersion = editedStudents.find(es => es.rollNo === s.rollNo);
    return editedVersion || s;
  }), ...customStudents.filter(s => !deletedStudents.includes(s.rollNo))];
  const departmentStudents = allDepartmentStudents.filter(s => s.department === user.department);
  const totalStudents = classPerformanceData.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const avgClassScore = classPerformanceData.length > 0 ? Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.avgScore, 0) / classPerformanceData.length) : 0;
  const overallPassRate = classPerformanceData.length > 0 ? Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.passRate, 0) / classPerformanceData.length) : 0;
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
  }, "Academic Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Generate and analyze comprehensive academic reports")), /*#__PURE__*/React.createElement(motion.div, {
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
    },
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 mr-2"
  }), "Generate New Report")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
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
      duration: 0.5,
      delay: 0.3
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: selectedTab,
    onValueChange: setSelectedTab,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.4
    }
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "bg-dark-card border border-dark-color"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "overview",
    className: "data-[state=active]:bg-dark-hover"
  }, "Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "generate",
    className: "data-[state=active]:bg-dark-hover"
  }, "Generate Reports"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "history",
    className: "data-[state=active]:bg-dark-hover"
  }, "Report History"))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "overview",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setSelectedDialog('total-students')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Students"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, totalStudents)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-blue-400"
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setSelectedDialog('average-score')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Average Score"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.6
    }
  }, avgClassScore, "%")), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 text-green-400"
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setSelectedDialog('pass-rate')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Pass Rate"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.7
    }
  }, overallPassRate, "%")), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center",
    whileHover: {
      rotate: -360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 text-purple-400"
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer",
    onClick: () => setSelectedDialog('reports-generated')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Reports Generated"), /*#__PURE__*/React.createElement(motion.p, {
    className: "text-3xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5,
      delay: 0.8
    }
  }, recentReports.length)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6 text-orange-400"
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
      duration: 0.5,
      delay: 0.6
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover:border-blue-500/50 transition-all",
    onClick: () => {
      setSelectedChartData(classPerformanceData);
      setSelectedDialog('class-performance-chart');
    }
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Class Performance Overview"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Click to view detailed metrics")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: classPerformanceData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "class",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "avgScore",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.5,
      delay: 0.6
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover:border-green-500/50 transition-all",
    onClick: () => {
      setSelectedChartData(attendanceData);
      setSelectedDialog('attendance-chart');
    }
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Attendance Trend"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Click to view detailed analytics")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: attendanceData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#10B981",
    strokeWidth: 3,
    dot: {
      fill: '#10B981',
      r: 6
    }
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
      delay: 0.8
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Recent Reports"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Latest generated reports")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, recentReports.slice(0, 3).map((report, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: report.id,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 text-purple-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, report.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, report.generatedDate))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, report.status), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download")))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "generate",
    className: "space-y-6"
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
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Report Templates"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Choose from pre-configured report templates")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, reportTemplates.map((template, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-6 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-2"
  }, template.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-3"
  }, template.description), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, template.dataPoints.map((point, pointIndex) => /*#__PURE__*/React.createElement(motion.div, {
    key: pointIndex,
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
      delay: pointIndex * 0.05
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
  }, point)))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary flex items-center"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-3 h-3 mr-1"
  }), "Estimated generation time: ", template.estimatedTime)), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 mr-2"
  }), "Generate")))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "history",
    className: "space-y-6"
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
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Generated Reports"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "View and download your previously generated reports")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 mr-2"
  }), "Filter")))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, recentReports.map((report, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: report.id,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-5 h-5 text-blue-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, report.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Generated on ", report.generatedDate, " \u2022 ", report.fileSize))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  }, report.type), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, report.status), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-4 h-4 mr-2"
  }), "View")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download"))))))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'total-students',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Total Students Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete breakdown of all students across your classes")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, totalStudents), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Total Students")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, classPerformanceData.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Classes")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, Math.round(totalStudents / classPerformanceData.length)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg per Class"))), classPerformanceData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, cls.class), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400"
  }, cls.totalStudents, " students")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Average Score:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, cls.avgScore, "%")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Pass Rate:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, cls.passRate, "%"))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'average-score',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Average Score Analysis"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed breakdown of class performance")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "text-5xl font-bold text-green-400",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5
    }
  }, avgClassScore, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Average Score")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Class-wise Scores"), classPerformanceData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-3 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-dark-primary"
  }, cls.class), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold text-dark-primary"
  }, cls.avgScore, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: cls.avgScore,
    className: "h-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mt-2 text-xs text-dark-secondary"
  }, /*#__PURE__*/React.createElement("div", null, "Highest: ", cls.highestScore, "%"), /*#__PURE__*/React.createElement("div", null, "Median: ", cls.median, "%"), /*#__PURE__*/React.createElement("div", null, "Lowest: ", cls.lowestScore, "%")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'pass-rate',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "Pass Rate Statistics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Student success rates across all classes")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "text-5xl font-bold text-purple-400",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5
    }
  }, overallPassRate, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Pass Rate")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-8 h-8 text-green-400 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.round(totalStudents * overallPassRate / 100)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Students Passed")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-8 h-8 text-orange-400 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, totalStudents - Math.round(totalStudents * overallPassRate / 100)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Need Support"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, classPerformanceData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-3 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, cls.class), /*#__PURE__*/React.createElement(Badge, {
    className: `${cls.passRate >= 95 ? 'bg-green-500/20 text-green-400' : cls.passRate >= 85 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`
  }, cls.passRate, "% Pass Rate")), /*#__PURE__*/React.createElement(Progress, {
    value: cls.passRate,
    className: "h-2"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'reports-generated',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6 mr-2 text-orange-400"
  }), "Reports Generated"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "All generated reports with download statistics")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  }, recentReports.map((report, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: report.id,
    className: "p-4 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, report.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Generated on ", report.generatedDate)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400"
  }, report.status)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2 mb-3 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Type: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, report.type)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Size: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, report.fileSize)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Downloads: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, report.downloads)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Views: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, report.viewCount))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary flex-1"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-3 h-3 mr-1"
  }), "View"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-primary flex-1"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-3 h-3 mr-1"
  }), "Download")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'class-performance-chart',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-4xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Class Performance Overview - Detailed View"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive performance metrics for all classes")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[600px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: classPerformanceData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "class",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "avgScore",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "passRate",
    fill: "#10B981",
    radius: [4, 4, 0, 0]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, classPerformanceData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-3"
  }, cls.class), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Total Students"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-blue-400"
  }, cls.totalStudents)), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Average Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-green-400"
  }, cls.avgScore, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Pass Rate"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-purple-400"
  }, cls.passRate, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Highest Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-green-400"
  }, cls.highestScore, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Median Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-blue-400"
  }, cls.median, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Lowest Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-orange-400"
  }, cls.lowestScore, "%")))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'attendance-chart',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-4xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Attendance Trend - Detailed Analytics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Monthly attendance patterns and statistics")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[600px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: attendanceData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#10B981",
    strokeWidth: 3,
    dot: {
      fill: '#10B981',
      r: 6
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-green-400"
  }, Math.round(attendanceData.reduce((sum, d) => sum + d.attendance, 0) / attendanceData.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Average Attendance")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-blue-400"
  }, attendanceData.reduce((sum, d) => sum + d.totalClasses, 0)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Total Classes"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, attendanceData.map((data, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg",
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, data.month), /*#__PURE__*/React.createElement(Badge, {
    className: `${data.attendance >= 92 ? 'bg-green-500/20 text-green-400' : data.attendance >= 85 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`
  }, data.attendance, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: data.attendance,
    className: "h-2 mb-3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Present"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-green-400"
  }, data.present)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Absent"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-red-400"
  }, data.absent)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Total Classes"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-blue-400"
  }, data.totalClasses)))))))))));
}