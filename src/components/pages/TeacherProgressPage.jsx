import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, Target, Calendar, Award, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { ScrollArea } from "../ui/scroll-area";
import { STUDENTS_DATA } from "../StudentData";
// Teacher-specific data generation functions
function getDepartmentClassData(department, teacherId) {
  const seed = parseInt(teacherId);
  const offset = seed % 5;
  const departmentData = {
    "Computer Science": [{
      class: "Data Structures & Algorithms",
      students: 20 + offset,
      avgProgress: 80 + offset,
      completed: 16 + offset,
      struggling: 2 + offset % 2
    }, {
      class: "Database Management Systems",
      students: 18 + offset,
      avgProgress: 85 + offset,
      completed: 15 + offset,
      struggling: 1
    }, {
      class: "Computer Networks",
      students: 17 + offset,
      avgProgress: 72 + offset,
      completed: 12 + offset,
      struggling: 3 + offset % 2
    }, {
      class: "Software Engineering",
      students: 19 + offset,
      avgProgress: 82 + offset,
      completed: 14 + offset,
      struggling: 2
    }],
    "Electronics": [{
      class: "Digital Signal Processing",
      students: 16 + offset,
      avgProgress: 76 + offset,
      completed: 12 + offset,
      struggling: 2 + offset % 2
    }, {
      class: "VLSI Design",
      students: 14 + offset,
      avgProgress: 81 + offset,
      completed: 11 + offset,
      struggling: 1 + offset % 2
    }, {
      class: "Communication Systems",
      students: 18 + offset,
      avgProgress: 74 + offset,
      completed: 13 + offset,
      struggling: 3 + offset % 2
    }, {
      class: "Microprocessors",
      students: 17 + offset,
      avgProgress: 78 + offset,
      completed: 13 + offset,
      struggling: 2
    }],
    "Mechanical": [{
      class: "Thermodynamics",
      students: 22 + offset,
      avgProgress: 77 + offset,
      completed: 16 + offset,
      struggling: 3 + offset % 2
    }, {
      class: "Fluid Mechanics",
      students: 20 + offset,
      avgProgress: 73 + offset,
      completed: 14 + offset,
      struggling: 4 + offset % 2
    }, {
      class: "Machine Design",
      students: 16 + offset,
      avgProgress: 80 + offset,
      completed: 12 + offset,
      struggling: 2
    }, {
      class: "Manufacturing Processes",
      students: 18 + offset,
      avgProgress: 75 + offset,
      completed: 13 + offset,
      struggling: 2 + offset % 2
    }],
    "Information Technology": [{
      class: "Web Development",
      students: 18 + offset,
      avgProgress: 83 + offset,
      completed: 15 + offset,
      struggling: 1 + offset % 2
    }, {
      class: "Database Systems",
      students: 16 + offset,
      avgProgress: 81 + offset,
      completed: 13 + offset,
      struggling: 1
    }, {
      class: "Cybersecurity",
      students: 14 + offset,
      avgProgress: 76 + offset,
      completed: 10 + offset,
      struggling: 2 + offset % 2
    }, {
      class: "Cloud Computing",
      students: 17 + offset,
      avgProgress: 79 + offset,
      completed: 13 + offset,
      struggling: 2
    }],
    "Civil": [{
      class: "Structural Engineering",
      students: 20 + offset,
      avgProgress: 78 + offset,
      completed: 15 + offset,
      struggling: 2 + offset % 2
    }, {
      class: "Environmental Engineering",
      students: 18 + offset,
      avgProgress: 74 + offset,
      completed: 13 + offset,
      struggling: 3 + offset % 2
    }, {
      class: "Geotechnical Engineering",
      students: 16 + offset,
      avgProgress: 72 + offset,
      completed: 11 + offset,
      struggling: 3 + offset % 2
    }, {
      class: "Construction Management",
      students: 19 + offset,
      avgProgress: 80 + offset,
      completed: 14 + offset,
      struggling: 2
    }]
  };
  return departmentData[department] || [];
}
function getDepartmentWeeklyTrend(department, teacherId) {
  const seed = parseInt(teacherId);
  const offset = seed % 4 - 2; // -2 to +1 variation

  const baseData = {
    "Computer Science": [{
      week: "Week 1",
      avgProgress: 70 + offset,
      assignments: 88 + offset,
      attendance: 94 + offset
    }, {
      week: "Week 2",
      avgProgress: 75 + offset,
      assignments: 91 + offset,
      attendance: 92 + offset
    }, {
      week: "Week 3",
      avgProgress: 80 + offset,
      assignments: 85 + offset,
      attendance: 93 + offset
    }, {
      week: "Week 4",
      avgProgress: 82 + offset,
      assignments: 93 + offset,
      attendance: 89 + offset
    }],
    "Electronics": [{
      week: "Week 1",
      avgProgress: 68 + offset,
      assignments: 85 + offset,
      attendance: 91 + offset
    }, {
      week: "Week 2",
      avgProgress: 72 + offset,
      assignments: 87 + offset,
      attendance: 89 + offset
    }, {
      week: "Week 3",
      avgProgress: 77 + offset,
      assignments: 83 + offset,
      attendance: 92 + offset
    }, {
      week: "Week 4",
      avgProgress: 79 + offset,
      assignments: 90 + offset,
      attendance: 87 + offset
    }],
    "Mechanical": [{
      week: "Week 1",
      avgProgress: 65 + offset,
      assignments: 82 + offset,
      attendance: 89 + offset
    }, {
      week: "Week 2",
      avgProgress: 69 + offset,
      assignments: 85 + offset,
      attendance: 87 + offset
    }, {
      week: "Week 3",
      avgProgress: 74 + offset,
      assignments: 79 + offset,
      attendance: 90 + offset
    }, {
      week: "Week 4",
      avgProgress: 78 + offset,
      assignments: 87 + offset,
      attendance: 85 + offset
    }],
    "Information Technology": [{
      week: "Week 1",
      avgProgress: 72 + offset,
      assignments: 90 + offset,
      attendance: 95 + offset
    }, {
      week: "Week 2",
      avgProgress: 77 + offset,
      assignments: 93 + offset,
      attendance: 93 + offset
    }, {
      week: "Week 3",
      avgProgress: 82 + offset,
      assignments: 87 + offset,
      attendance: 94 + offset
    }, {
      week: "Week 4",
      avgProgress: 86 + offset,
      assignments: 95 + offset,
      attendance: 91 + offset
    }],
    "Civil": [{
      week: "Week 1",
      avgProgress: 67 + offset,
      assignments: 84 + offset,
      attendance: 90 + offset
    }, {
      week: "Week 2",
      avgProgress: 71 + offset,
      assignments: 86 + offset,
      attendance: 88 + offset
    }, {
      week: "Week 3",
      avgProgress: 76 + offset,
      assignments: 81 + offset,
      attendance: 91 + offset
    }, {
      week: "Week 4",
      avgProgress: 81 + offset,
      assignments: 89 + offset,
      attendance: 86 + offset
    }]
  };
  return baseData[department] || [];
}
function getDepartmentPerformanceDistribution(department) {
  const distributions = {
    "Computer Science": [{
      name: "Excellent (90-100%)",
      value: 28,
      color: "#10B981"
    }, {
      name: "Good (80-89%)",
      value: 38,
      color: "#3B82F6"
    }, {
      name: "Average (70-79%)",
      value: 24,
      color: "#F59E0B"
    }, {
      name: "Below Average (<70%)",
      value: 10,
      color: "#EF4444"
    }],
    "Electronics": [{
      name: "Excellent (90-100%)",
      value: 22,
      color: "#10B981"
    }, {
      name: "Good (80-89%)",
      value: 35,
      color: "#3B82F6"
    }, {
      name: "Average (70-79%)",
      value: 30,
      color: "#F59E0B"
    }, {
      name: "Below Average (<70%)",
      value: 13,
      color: "#EF4444"
    }],
    "Mechanical": [{
      name: "Excellent (90-100%)",
      value: 20,
      color: "#10B981"
    }, {
      name: "Good (80-89%)",
      value: 32,
      color: "#3B82F6"
    }, {
      name: "Average (70-79%)",
      value: 33,
      color: "#F59E0B"
    }, {
      name: "Below Average (<70%)",
      value: 15,
      color: "#EF4444"
    }],
    "Information Technology": [{
      name: "Excellent (90-100%)",
      value: 30,
      color: "#10B981"
    }, {
      name: "Good (80-89%)",
      value: 40,
      color: "#3B82F6"
    }, {
      name: "Average (70-79%)",
      value: 22,
      color: "#F59E0B"
    }, {
      name: "Below Average (<70%)",
      value: 8,
      color: "#EF4444"
    }],
    "Civil": [{
      name: "Excellent (90-100%)",
      value: 18,
      color: "#10B981"
    }, {
      name: "Good (80-89%)",
      value: 30,
      color: "#3B82F6"
    }, {
      name: "Average (70-79%)",
      value: 35,
      color: "#F59E0B"
    }, {
      name: "Below Average (<70%)",
      value: 17,
      color: "#EF4444"
    }]
  };
  return distributions[department] || [];
}
function getDepartmentStrugglingStudents(department) {
  const strugglingData = {
    "Computer Science": [{
      name: "Rahul Singh",
      rollNo: "1000030021",
      subject: "Computer Networks",
      currentGrade: "C",
      issues: ["Low Attendance", "Missing Assignments"]
    }, {
      name: "Sanjay Malhotra",
      rollNo: "1000030031",
      subject: "Data Structures",
      currentGrade: "D",
      issues: ["Struggling with Concepts", "Needs Extra Help"]
    }],
    "Electronics": [{
      name: "Vikram Rao",
      rollNo: "1000030013",
      subject: "Digital Signal Processing",
      currentGrade: "C-",
      issues: ["Lab Performance", "Theory Gaps"]
    }, {
      name: "Deepak Chatterjee",
      rollNo: "1000030027",
      subject: "VLSI Design",
      currentGrade: "D+",
      issues: ["Project Delays", "Technical Issues"]
    }],
    "Mechanical": [{
      name: "Kiran Das",
      rollNo: "1000030009",
      subject: "Thermodynamics",
      currentGrade: "C",
      issues: ["Mathematical Foundation", "Problem Solving"]
    }, {
      name: "Krishna Reddy",
      rollNo: "1000030039",
      subject: "Fluid Mechanics",
      currentGrade: "C-",
      issues: ["Late Submissions", "Quality Issues"]
    }],
    "Information Technology": [{
      name: "Siddharth Menon",
      rollNo: "1000030015",
      subject: "Web Development",
      currentGrade: "C+",
      issues: ["Programming Skills", "Project Management"]
    }, {
      name: "Prakash Naik",
      rollNo: "1000030035",
      subject: "Database Systems",
      currentGrade: "C",
      issues: ["SQL Concepts", "Design Principles"]
    }],
    "Civil": [{
      name: "Arjun Verma",
      rollNo: "1000030005",
      subject: "Structural Engineering",
      currentGrade: "C",
      issues: ["Design Calculations", "Software Usage"]
    }, {
      name: "Harsh Agarwal",
      rollNo: "1000030017",
      subject: "Construction Management",
      currentGrade: "C-",
      issues: ["Project Planning", "Cost Estimation"]
    }]
  };
  return strugglingData[department] || [];
}
function getDepartmentTopPerformers(department) {
  const topPerformersData = {
    "Computer Science": [{
      name: "Ishita Ghosh",
      rollNo: "1000030016",
      avgScore: 96,
      streak: 8
    }, {
      name: "Sneha Patel",
      rollNo: "1000030004",
      avgScore: 94,
      streak: 7
    }, {
      name: "Ananya Singh",
      rollNo: "1000030012",
      avgScore: 93,
      streak: 6
    }, {
      name: "Lakshmi Narayan",
      rollNo: "1000030026",
      avgScore: 92,
      streak: 5
    }],
    "Electronics": [{
      name: "Priya Reddy",
      rollNo: "1000030002",
      avgScore: 95,
      streak: 9
    }, {
      name: "Ritika Jha",
      rollNo: "1000030022",
      avgScore: 92,
      streak: 6
    }, {
      name: "Divya Bansal",
      rollNo: "1000030018",
      avgScore: 90,
      streak: 5
    }, {
      name: "Simran Kaur",
      rollNo: "1000030032",
      avgScore: 89,
      streak: 4
    }],
    "Mechanical": [{
      name: "Pooja Mishra",
      rollNo: "1000030014",
      avgScore: 91,
      streak: 7
    }, {
      name: "Shreya Pillai",
      rollNo: "1000030024",
      avgScore: 89,
      streak: 5
    }, {
      name: "Anjali Deshmukh",
      rollNo: "1000030034",
      avgScore: 88,
      streak: 4
    }, {
      name: "Karthik R",
      rollNo: "1000030029",
      avgScore: 87,
      streak: 3
    }],
    "Information Technology": [{
      name: "Kavya Iyer",
      rollNo: "1000030006",
      avgScore: 97,
      streak: 10
    }, {
      name: "Tanvi Kulkarni",
      rollNo: "1000030020",
      avgScore: 94,
      streak: 8
    }, {
      name: "Bhavna Kaur",
      rollNo: "1000030030",
      avgScore: 92,
      streak: 6
    }, {
      name: "Monika Paul",
      rollNo: "1000030040",
      avgScore: 90,
      streak: 5
    }],
    "Civil": [{
      name: "Aishwarya Roy",
      rollNo: "1000030028",
      avgScore: 90,
      streak: 6
    }, {
      name: "Rahul Mehta",
      rollNo: "1000030011",
      avgScore: 88,
      streak: 4
    }, {
      name: "Jyoti Dubey",
      rollNo: "1000030038",
      avgScore: 87,
      streak: 3
    }, {
      name: "Abhinav Saxena",
      rollNo: "1000030023",
      avgScore: 85,
      streak: 2
    }]
  };
  return topPerformersData[department] || [];
}
function getDepartmentCourseModules(department) {
  const modulesData = {
    "Computer Science": [{
      course: "Data Structures & Algorithms",
      modules: [{
        name: "Arrays & Linked Lists",
        completion: 95,
        students: 23
      }, {
        name: "Stacks & Queues",
        completion: 88,
        students: 20
      }, {
        name: "Trees & Graphs",
        completion: 72,
        students: 16
      }, {
        name: "Dynamic Programming",
        completion: 45,
        students: 10
      }]
    }, {
      course: "Database Management Systems",
      modules: [{
        name: "SQL Fundamentals",
        completion: 100,
        students: 22
      }, {
        name: "Database Design",
        completion: 85,
        students: 19
      }, {
        name: "Normalization",
        completion: 78,
        students: 17
      }, {
        name: "Advanced Queries",
        completion: 60,
        students: 13
      }]
    }],
    "Electronics": [{
      course: "Digital Signal Processing",
      modules: [{
        name: "Signal Analysis",
        completion: 92,
        students: 16
      }, {
        name: "Filter Design",
        completion: 84,
        students: 15
      }, {
        name: "FFT & Transforms",
        completion: 68,
        students: 12
      }, {
        name: "Digital Filters",
        completion: 52,
        students: 9
      }]
    }, {
      course: "VLSI Design",
      modules: [{
        name: "Logic Design",
        completion: 88,
        students: 14
      }, {
        name: "Layout Design",
        completion: 75,
        students: 12
      }, {
        name: "Verification",
        completion: 62,
        students: 10
      }, {
        name: "Physical Design",
        completion: 48,
        students: 8
      }]
    }],
    "Mechanical": [{
      course: "Thermodynamics",
      modules: [{
        name: "Basic Laws",
        completion: 94,
        students: 22
      }, {
        name: "Heat Engines",
        completion: 81,
        students: 19
      }, {
        name: "Refrigeration",
        completion: 70,
        students: 16
      }, {
        name: "Gas Turbines",
        completion: 55,
        students: 13
      }]
    }, {
      course: "Fluid Mechanics",
      modules: [{
        name: "Fluid Properties",
        completion: 90,
        students: 20
      }, {
        name: "Flow Analysis",
        completion: 76,
        students: 17
      }, {
        name: "Pipe Flow",
        completion: 65,
        students: 14
      }, {
        name: "Turbulent Flow",
        completion: 42,
        students: 9
      }]
    }],
    "Information Technology": [{
      course: "Web Development",
      modules: [{
        name: "HTML/CSS",
        completion: 100,
        students: 20
      }, {
        name: "JavaScript",
        completion: 90,
        students: 18
      }, {
        name: "React Framework",
        completion: 75,
        students: 15
      }, {
        name: "Backend APIs",
        completion: 60,
        students: 12
      }]
    }, {
      course: "Cybersecurity",
      modules: [{
        name: "Security Fundamentals",
        completion: 95,
        students: 15
      }, {
        name: "Network Security",
        completion: 82,
        students: 13
      }, {
        name: "Cryptography",
        completion: 68,
        students: 11
      }, {
        name: "Ethical Hacking",
        completion: 50,
        students: 8
      }]
    }],
    "Civil": [{
      course: "Structural Engineering",
      modules: [{
        name: "Structural Analysis",
        completion: 89,
        students: 19
      }, {
        name: "Concrete Design",
        completion: 78,
        students: 17
      }, {
        name: "Steel Design",
        completion: 66,
        students: 14
      }, {
        name: "Seismic Design",
        completion: 48,
        students: 10
      }]
    }, {
      course: "Environmental Engineering",
      modules: [{
        name: "Water Treatment",
        completion: 92,
        students: 18
      }, {
        name: "Air Pollution",
        completion: 80,
        students: 16
      }, {
        name: "Waste Management",
        completion: 72,
        students: 14
      }, {
        name: "Environmental Impact",
        completion: 58,
        students: 12
      }]
    }]
  };
  return modulesData[department] || [];
}
export function TeacherProgressPage({
  user
}) {
  const [selectedDialog, setSelectedDialog] = useState(null);

  // Get teacher-specific data based on department and teacher ID
  const classProgressData = getDepartmentClassData(user.department, user.id);
  const weeklyProgressTrend = getDepartmentWeeklyTrend(user.department, user.id);
  const studentPerformanceDistribution = getDepartmentPerformanceDistribution(user.department);
  const strugglingStudents = getDepartmentStrugglingStudents(user.department);
  const topPerformers = getDepartmentTopPerformers(user.department);
  const courseModules = getDepartmentCourseModules(user.department);

  // Total students from the database (always 100)
  const totalStudents = STUDENTS_DATA.length;
  // Students in teacher's classes
  const myClassStudents = classProgressData.reduce((sum, cls) => sum + cls.students, 0);
  const avgClassProgress = classProgressData.length > 0 ? Math.round(classProgressData.reduce((sum, cls) => sum + cls.avgProgress, 0) / classProgressData.length) : 0;
  const totalCompleted = classProgressData.reduce((sum, cls) => sum + cls.completed, 0);
  const totalStruggling = classProgressData.reduce((sum, cls) => sum + cls.struggling, 0);
  const handleScheduleMeeting = (studentName, studentRollNo) => {
    alert(`Meeting scheduled with ${studentName} (${studentRollNo}). You will receive a calendar invitation shortly.`);
  };
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
  }, "Student Progress Tracking"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Monitor class performance and individual student progress")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 mr-2"
  }), avgClassProgress, "% Avg Progress")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
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
      delay: 0.3
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
    onClick: () => setSelectedDialog('average-progress')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Average Progress"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, avgClassProgress, "%")), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Target, {
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
    onClick: () => setSelectedDialog('completed-courses')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Completed Courses"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, totalCompleted)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center",
    whileHover: {
      rotate: -360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(CheckCircle, {
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
    onClick: () => setSelectedDialog('need-attention')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Need Attention"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, totalStruggling)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(AlertCircle, {
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
      duration: 0.5,
      delay: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover:border-blue-500/50 transition-all",
    onClick: () => setSelectedDialog('class-progress-chart')
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Class Progress Overview"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Click to view detailed progress metrics")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: classProgressData
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
    dataKey: "avgProgress",
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
      delay: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover:border-purple-500/50 transition-all",
    onClick: () => setSelectedDialog('performance-distribution-chart')
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Performance Distribution"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Click to view detailed breakdown")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: studentPerformanceDistribution,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    label: ({
      name,
      percent
    }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`,
    outerRadius: 80,
    fill: "#8884d8",
    dataKey: "value"
  }, studentPerformanceDistribution.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
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
      delay: 0.7
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover:border-green-500/50 transition-all",
    onClick: () => setSelectedDialog('weekly-progress-chart')
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Weekly Progress Trends"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Click to view detailed trends and analytics")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 400
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: weeklyProgressTrend
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "week",
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
    dataKey: "avgProgress",
    stroke: "#3B82F6",
    strokeWidth: 3,
    name: "Average Progress"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "assignments",
    stroke: "#10B981",
    strokeWidth: 3,
    name: "Assignment Completion"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#F59E0B",
    strokeWidth: 3,
    name: "Attendance Rate"
  })))))), /*#__PURE__*/React.createElement("div", {
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
      delay: 0.8
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 mr-2"
  }), "Students Needing Attention"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Students who may need extra support")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, strugglingStudents.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-red-500/10 border border-red-500/20 rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, student.rollNo, " \u2022 ", student.subject)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-red-500/20 text-red-400 border-red-500/30"
  }, "Grade: ", student.currentGrade)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, student.issues.map((issue, issueIndex) => /*#__PURE__*/React.createElement(Badge, {
    key: issueIndex,
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs"
  }, issue))), /*#__PURE__*/React.createElement(Dialog, null, /*#__PURE__*/React.createElement(DialogTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-3 h-3 mr-1"
  }), "Schedule Meeting"))), /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Schedule Meeting with ", student.name), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Schedule a one-on-one meeting to discuss academic progress")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "date",
    className: "text-dark-primary"
  }, "Meeting Date"), /*#__PURE__*/React.createElement(Input, {
    id: "date",
    type: "date",
    className: "bg-dark-bg border-dark-color text-dark-primary",
    min: new Date().toISOString().split('T')[0]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "time",
    className: "text-dark-primary"
  }, "Meeting Time"), /*#__PURE__*/React.createElement(Select, null, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select time"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "09:00"
  }, "9:00 AM"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "10:00"
  }, "10:00 AM"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "11:00"
  }, "11:00 AM"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "14:00"
  }, "2:00 PM"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "15:00"
  }, "3:00 PM"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "16:00"
  }, "4:00 PM"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "duration",
    className: "text-dark-primary"
  }, "Duration"), /*#__PURE__*/React.createElement(Select, null, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select duration"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "30"
  }, "30 minutes"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "45"
  }, "45 minutes"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "60"
  }, "1 hour")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "agenda",
    className: "text-dark-primary"
  }, "Meeting Agenda"), /*#__PURE__*/React.createElement(Textarea, {
    id: "agenda",
    placeholder: "Discuss academic performance, address concerns, set improvement goals...",
    className: "bg-dark-bg border-dark-color text-dark-primary",
    rows: 3
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1",
    onClick: () => handleScheduleMeeting(student.name, student.rollNo)
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 mr-2"
  }), "Schedule Meeting"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary flex-1"
  }, "Send Email First"))))))))))), /*#__PURE__*/React.createElement(motion.div, {
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
      delay: 0.8
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-5 h-5 mr-2"
  }), "Top Performers"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Students excelling in their studies")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, topPerformers.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
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
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-semibold text-sm"
  }, "#", index + 1)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, student.rollNo))), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, student.avgScore, "%"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  }, student.streak, " week streak"))))))))), /*#__PURE__*/React.createElement(motion.div, {
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
  }, "Course Module Progress"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Detailed breakdown of module completion rates")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, courseModules.map((course, courseIndex) => /*#__PURE__*/React.createElement(motion.div, {
    key: courseIndex,
    className: "space-y-4",
    variants: itemVariants
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary text-lg"
  }, course.course), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4"
  }, course.modules.map((module, moduleIndex) => /*#__PURE__*/React.createElement(motion.div, {
    key: moduleIndex,
    className: "p-4 bg-dark-hover rounded-lg",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, module.name), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, module.students, " students completed")), /*#__PURE__*/React.createElement(Progress, {
    value: module.completion,
    className: "h-2 mb-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("span", null, module.completion, "% completion rate"), /*#__PURE__*/React.createElement(Badge, {
    className: `${module.completion >= 90 ? 'bg-green-500/20 text-green-400' : module.completion >= 70 ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`
  }, module.completion >= 90 ? 'Excellent' : module.completion >= 70 ? 'Good' : 'Needs Focus')))))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'total-students',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Total Students Overview"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete breakdown of students across all your classes")), /*#__PURE__*/React.createElement(ScrollArea, {
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
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, totalStudents), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Total in System")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, myClassStudents), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "In My Classes")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-purple-400"
  }, classProgressData.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "My Classes")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, Math.round(myClassStudents / classProgressData.length)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg per Class"))), classProgressData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
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
  }, cls.students, " students")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Progress"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-green-400"
  }, cls.avgProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Completed"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-purple-400"
  }, cls.completed)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Struggling"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-red-400"
  }, cls.struggling))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'average-progress',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Average Progress Analysis"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed breakdown of class progress levels")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
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
  }, avgClassProgress, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Average Progress")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Class-wise Progress"), classProgressData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
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
  }, cls.avgProgress, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: cls.avgProgress,
    className: "h-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-2 text-xs text-dark-secondary"
  }, /*#__PURE__*/React.createElement("span", null, "Completed: ", cls.completed, "/", cls.students), /*#__PURE__*/React.createElement(Badge, {
    className: `${cls.avgProgress >= 85 ? 'bg-green-500/20 text-green-400' : cls.avgProgress >= 75 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`
  }, cls.avgProgress >= 85 ? 'Excellent' : cls.avgProgress >= 75 ? 'Good' : 'Needs Improvement')))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'completed-courses',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "Completed Courses Statistics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Students who have successfully completed courses")), /*#__PURE__*/React.createElement(motion.div, {
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
  }, totalCompleted), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Total Completed")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.round(totalCompleted / totalStudents * 100), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Completion Rate")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, totalStudents - totalCompleted), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "In Progress"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, classProgressData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-purple-500/20 text-purple-400"
  }, cls.completed, "/", cls.students, " completed")), /*#__PURE__*/React.createElement(Progress, {
    value: cls.completed / cls.students * 100,
    className: "h-2"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'need-attention',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-6 h-6 mr-2 text-red-400"
  }), "Students Needing Attention"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed view of students who need additional support")), /*#__PURE__*/React.createElement(ScrollArea, {
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
    className: "p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-red-400"
  }, totalStruggling), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Students Need Attention")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, classProgressData.map((cls, clsIndex) => cls.struggling > 0 && /*#__PURE__*/React.createElement(motion.div, {
    key: clsIndex,
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
      delay: clsIndex * 0.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, cls.class), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-red-500/20 text-red-400"
  }, cls.struggling, " struggling")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, (cls.struggling / cls.students * 100).toFixed(1), "% of students need support")))), strugglingStudents.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 mt-6"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, "Individual Students"), strugglingStudents.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-red-500/10 border border-red-500/20 rounded-lg",
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
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, student.rollNo, " \u2022 ", student.subject)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-red-500/20 text-red-400"
  }, student.currentGrade)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, student.issues.map((issue, issueIndex) => /*#__PURE__*/React.createElement(Badge, {
    key: issueIndex,
    className: "bg-orange-500/20 text-orange-400 text-xs"
  }, issue)))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'class-progress-chart',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-4xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Class Progress Overview - Detailed View"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive progress metrics for all classes")), /*#__PURE__*/React.createElement(ScrollArea, {
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
    data: classProgressData
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
    dataKey: "avgProgress",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, classProgressData.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
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
    className: "grid grid-cols-2 md:grid-cols-4 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Total Students"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-blue-400"
  }, cls.students)), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Avg Progress"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-green-400"
  }, cls.avgProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Completed"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-purple-400"
  }, cls.completed)), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Struggling"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-red-400"
  }, cls.struggling)))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'performance-distribution-chart',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Performance Distribution - Detailed Analytics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete breakdown of student performance levels")), /*#__PURE__*/React.createElement(ScrollArea, {
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
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: studentPerformanceDistribution,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    label: ({
      name,
      value
    }) => `${name}: ${value}%`,
    outerRadius: 100,
    fill: "#8884d8",
    dataKey: "value"
  }, studentPerformanceDistribution.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, studentPerformanceDistribution.map((dist, index) => /*#__PURE__*/React.createElement(motion.div, {
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 rounded-full",
    style: {
      backgroundColor: dist.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, dist.name)), /*#__PURE__*/React.createElement(Badge, {
    style: {
      backgroundColor: `${dist.color}20`,
      color: dist.color,
      borderColor: `${dist.color}50`
    }
  }, dist.value, "%")), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary"
  }, "Approximately ", Math.round(dist.value / 100 * totalStudents), " students")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'weekly-progress-chart',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-4xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Weekly Progress Trends - Detailed View"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Track progress, assignments, and attendance over time")), /*#__PURE__*/React.createElement(ScrollArea, {
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
    height: 400
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: weeklyProgressTrend
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "week",
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
    dataKey: "avgProgress",
    stroke: "#3B82F6",
    strokeWidth: 3,
    name: "Average Progress"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "assignments",
    stroke: "#10B981",
    strokeWidth: 3,
    name: "Assignment Completion"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "attendance",
    stroke: "#F59E0B",
    strokeWidth: 3,
    name: "Attendance Rate"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, Math.round(weeklyProgressTrend.reduce((sum, w) => sum + w.avgProgress, 0) / weeklyProgressTrend.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg Progress")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, Math.round(weeklyProgressTrend.reduce((sum, w) => sum + w.assignments, 0) / weeklyProgressTrend.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg Assignments")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-orange-400"
  }, Math.round(weeklyProgressTrend.reduce((sum, w) => sum + w.attendance, 0) / weeklyProgressTrend.length), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg Attendance"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, weeklyProgressTrend.map((week, index) => /*#__PURE__*/React.createElement(motion.div, {
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
  }, week.week), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Progress"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-blue-400"
  }, week.avgProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Assignments"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-green-400"
  }, week.assignments, "%")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-orange-400"
  }, week.attendance, "%")))))))))));
}