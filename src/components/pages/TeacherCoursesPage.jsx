import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, FileText, Settings, Plus, Clock, Award, TrendingUp, Edit, Save, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// Department-specific course data
const getDepartmentCourses = department => {
  const allCourses = {
    "Computer Science": [{
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS301",
      semester: "6th Semester",
      students: 25,
      credits: 4,
      schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 2:00-3:30"],
      room: "Lab 204",
      avgAttendance: 92,
      avgPerformance: 87,
      assignments: 8,
      completedLectures: 24,
      totalLectures: 30,
      status: "Active"
    }, {
      id: 2,
      name: "Database Management Systems",
      code: "CS401",
      semester: "8th Semester",
      students: 22,
      credits: 4,
      schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      room: "Room 301",
      avgAttendance: 89,
      avgPerformance: 92,
      assignments: 6,
      completedLectures: 22,
      totalLectures: 28,
      status: "Active"
    }, {
      id: 3,
      name: "Software Engineering",
      code: "CS303",
      semester: "6th Semester",
      students: 20,
      credits: 3,
      schedule: ["Mon 2:00-3:30", "Wed 11:00-12:30"],
      room: "Room 205",
      avgAttendance: 85,
      avgPerformance: 78,
      assignments: 5,
      completedLectures: 18,
      totalLectures: 24,
      status: "Active"
    }],
    "Electronics": [{
      id: 4,
      name: "Digital Signal Processing",
      code: "EC301",
      semester: "6th Semester",
      students: 18,
      credits: 4,
      schedule: ["Mon 9:00-10:30", "Wed 9:00-10:30", "Fri 11:00-12:30"],
      room: "Lab 301",
      avgAttendance: 90,
      avgPerformance: 85,
      assignments: 7,
      completedLectures: 20,
      totalLectures: 26,
      status: "Active"
    }, {
      id: 5,
      name: "VLSI Design",
      code: "EC401",
      semester: "8th Semester",
      students: 16,
      credits: 4,
      schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      room: "Lab 302",
      avgAttendance: 87,
      avgPerformance: 89,
      assignments: 6,
      completedLectures: 18,
      totalLectures: 24,
      status: "Active"
    }, {
      id: 6,
      name: "Communication Systems",
      code: "EC302",
      semester: "6th Semester",
      students: 20,
      credits: 3,
      schedule: ["Mon 3:00-4:30", "Wed 3:00-4:30"],
      room: "Room 401",
      avgAttendance: 88,
      avgPerformance: 82,
      assignments: 5,
      completedLectures: 16,
      totalLectures: 22,
      status: "Active"
    }],
    "Mechanical": [{
      id: 7,
      name: "Thermodynamics",
      code: "ME301",
      semester: "6th Semester",
      students: 24,
      credits: 4,
      schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 1:00-2:30"],
      room: "Room 501",
      avgAttendance: 91,
      avgPerformance: 84,
      assignments: 7,
      completedLectures: 22,
      totalLectures: 28,
      status: "Active"
    }, {
      id: 8,
      name: "Fluid Mechanics",
      code: "ME401",
      semester: "8th Semester",
      students: 22,
      credits: 4,
      schedule: ["Tue 1:00-2:30", "Thu 1:00-2:30"],
      room: "Lab 504",
      avgAttendance: 86,
      avgPerformance: 87,
      assignments: 6,
      completedLectures: 19,
      totalLectures: 25,
      status: "Active"
    }, {
      id: 9,
      name: "Machine Design",
      code: "ME302",
      semester: "6th Semester",
      students: 18,
      credits: 3,
      schedule: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      room: "Room 502",
      avgAttendance: 89,
      avgPerformance: 81,
      assignments: 5,
      completedLectures: 17,
      totalLectures: 23,
      status: "Active"
    }],
    "Information Technology": [{
      id: 10,
      name: "Web Development",
      code: "IT301",
      semester: "6th Semester",
      students: 20,
      credits: 4,
      schedule: ["Mon 9:30-11:00", "Wed 9:30-11:00", "Fri 2:00-3:30"],
      room: "Lab 601",
      avgAttendance: 93,
      avgPerformance: 90,
      assignments: 8,
      completedLectures: 25,
      totalLectures: 30,
      status: "Active"
    }, {
      id: 11,
      name: "Database Systems",
      code: "IT401",
      semester: "8th Semester",
      students: 18,
      credits: 4,
      schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      room: "Lab 602",
      avgAttendance: 88,
      avgPerformance: 86,
      assignments: 6,
      completedLectures: 21,
      totalLectures: 27,
      status: "Active"
    }, {
      id: 12,
      name: "Cybersecurity",
      code: "IT302",
      semester: "6th Semester",
      students: 16,
      credits: 3,
      schedule: ["Mon 4:00-5:30", "Wed 4:00-5:30"],
      room: "Room 603",
      avgAttendance: 85,
      avgPerformance: 83,
      assignments: 5,
      completedLectures: 16,
      totalLectures: 22,
      status: "Active"
    }],
    "Civil": [{
      id: 13,
      name: "Structural Engineering",
      code: "CE301",
      semester: "6th Semester",
      students: 22,
      credits: 4,
      schedule: ["Mon 8:00-9:30", "Wed 8:00-9:30", "Fri 10:00-11:30"],
      room: "Room 701",
      avgAttendance: 90,
      avgPerformance: 85,
      assignments: 7,
      completedLectures: 23,
      totalLectures: 29,
      status: "Active"
    }, {
      id: 14,
      name: "Environmental Engineering",
      code: "CE401",
      semester: "8th Semester",
      students: 20,
      credits: 4,
      schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      room: "Lab 702",
      avgAttendance: 87,
      avgPerformance: 88,
      assignments: 6,
      completedLectures: 20,
      totalLectures: 26,
      status: "Active"
    }, {
      id: 15,
      name: "Construction Management",
      code: "CE302",
      semester: "6th Semester",
      students: 18,
      credits: 3,
      schedule: ["Mon 2:30-4:00", "Wed 2:30-4:00"],
      room: "Room 703",
      avgAttendance: 89,
      avgPerformance: 82,
      assignments: 5,
      completedLectures: 18,
      totalLectures: 24,
      status: "Active"
    }]
  };
  return allCourses[department] || [];
};

// Get department-specific upcoming classes
const getDepartmentUpcomingClasses = department => {
  const allUpcomingClasses = {
    "Computer Science": [{
      course: "Data Structures & Algorithms",
      time: "Today, 10:00 AM",
      room: "Lab 204",
      topic: "Binary Search Trees",
      duration: "90 min"
    }, {
      course: "Database Management Systems",
      time: "Today, 2:00 PM",
      room: "Room 301",
      topic: "Query Optimization",
      duration: "90 min"
    }, {
      course: "Software Engineering",
      time: "Tomorrow, 2:00 PM",
      room: "Room 205",
      topic: "Design Patterns",
      duration: "90 min"
    }],
    "Electronics": [{
      course: "Digital Signal Processing",
      time: "Today, 9:00 AM",
      room: "Lab 301",
      topic: "FFT Algorithms",
      duration: "90 min"
    }, {
      course: "VLSI Design",
      time: "Today, 11:00 AM",
      room: "Lab 302",
      topic: "Layout Verification",
      duration: "90 min"
    }, {
      course: "Communication Systems",
      time: "Tomorrow, 3:00 PM",
      room: "Room 401",
      topic: "Modulation Techniques",
      duration: "90 min"
    }],
    "Mechanical": [{
      course: "Thermodynamics",
      time: "Today, 10:00 AM",
      room: "Room 501",
      topic: "Heat Engines",
      duration: "90 min"
    }, {
      course: "Fluid Mechanics",
      time: "Today, 1:00 PM",
      room: "Lab 504",
      topic: "Boundary Layer Theory",
      duration: "90 min"
    }, {
      course: "Machine Design",
      time: "Tomorrow, 3:30 PM",
      room: "Room 502",
      topic: "Gear Design",
      duration: "90 min"
    }],
    "Information Technology": [{
      course: "Web Development",
      time: "Today, 9:30 AM",
      room: "Lab 601",
      topic: "React Components",
      duration: "90 min"
    }, {
      course: "Database Systems",
      time: "Today, 2:00 PM",
      room: "Lab 602",
      topic: "Index Optimization",
      duration: "90 min"
    }, {
      course: "Cybersecurity",
      time: "Tomorrow, 4:00 PM",
      room: "Room 603",
      topic: "Network Security",
      duration: "90 min"
    }],
    "Civil": [{
      course: "Structural Engineering",
      time: "Today, 8:00 AM",
      room: "Room 701",
      topic: "Steel Design",
      duration: "90 min"
    }, {
      course: "Environmental Engineering",
      time: "Today, 11:00 AM",
      room: "Lab 702",
      topic: "Water Treatment",
      duration: "90 min"
    }, {
      course: "Construction Management",
      time: "Tomorrow, 2:30 PM",
      room: "Room 703",
      topic: "Project Planning",
      duration: "90 min"
    }]
  };
  return allUpcomingClasses[department] || [];
};
export function TeacherCoursesPage({
  user
}) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showManageCourse, setShowManageCourse] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const teachingCourses = getDepartmentCourses(user.department);
  const upcomingClasses = getDepartmentUpcomingClasses(user.department);
  const totalStudents = teachingCourses.reduce((sum, course) => sum + course.students, 0);
  const avgAttendance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgAttendance, 0) / teachingCourses.length) : 0;
  const avgPerformance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgPerformance, 0) / teachingCourses.length) : 0;
  const totalCredits = teachingCourses.reduce((sum, course) => sum + course.credits, 0);
  const recentActivities = [{
    action: `Updated course material for ${teachingCourses[0]?.name || 'course'}`,
    time: "2 hours ago",
    type: "content"
  }, {
    action: `Graded assignments for ${teachingCourses[1]?.name || 'course'}`,
    time: "5 hours ago",
    type: "grading"
  }, {
    action: `Posted announcement in ${teachingCourses[2]?.name || 'course'}`,
    time: "1 day ago",
    type: "announcement"
  }, {
    action: `Scheduled exam for ${teachingCourses[0]?.name || 'course'}`,
    time: "2 days ago",
    type: "exam"
  }];
  const handleManageCourse = course => {
    setSelectedCourse(course);
    setShowManageCourse(true);
  };
  const handleCourseSettings = course => {
    setSelectedCourse(course);
    setShowSettings(true);
  };
  const handleViewClassDetails = classInfo => {
    setSelectedClass(classInfo);
    setShowClassDetails(true);
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
  }, "Registered Courses"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Manage your ", user.department, " department courses")), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center space-x-4",
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
      delay: 0.2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 mr-2"
  }), teachingCourses.length, " Active Courses"), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Add Course"))))), /*#__PURE__*/React.createElement("main", {
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
    onClick: () => setSelectedDialog('avg-attendance')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Avg Attendance"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, avgAttendance, "%")), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
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
    onClick: () => setSelectedDialog('avg-performance')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Avg Performance"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, avgPerformance, "%")), /*#__PURE__*/React.createElement(motion.div, {
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
    onClick: () => setSelectedDialog('teaching-credits')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Teaching Credits"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, totalCredits)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 text-orange-400"
  }))))))), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, teachingCourses.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: course.id,
    variants: itemVariants,
    whileHover: {
      scale: 1.02,
      y: -5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color hover:border-dark-cta transition-colors"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, course.name), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary mt-1"
  }, course.code, " \u2022 ", course.semester, " \u2022 ", course.credits, " Credits")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, course.status))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, "Course Progress"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-primary"
  }, course.completedLectures, "/", course.totalLectures, " lectures")), /*#__PURE__*/React.createElement(Progress, {
    value: course.completedLectures / course.totalLectures * 100,
    className: "h-2"
  })), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-3 gap-4 text-center",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    className: "p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-dark-primary"
  }, course.students), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Students")), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    className: "p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-dark-primary"
  }, course.avgAttendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Attendance")), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    className: "p-3 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-dark-primary"
  }, course.avgPerformance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Performance"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, "Schedule"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, course.schedule.map((time, idx) => /*#__PURE__*/React.createElement(motion.div, {
    key: idx,
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
      delay: idx * 0.05
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
  }, time)))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Room: ", course.room)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 pt-4 border-t border-dark-color"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full dark-button-primary",
    onClick: () => handleManageCourse(course)
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 mr-2"
  }), "Manage Course")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary",
    onClick: () => handleCourseSettings(course)
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-4 h-4"
  }))))))))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-5 h-5 mr-2"
  }), "Upcoming Classes"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your next scheduled classes")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, upcomingClasses.map((cls, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 text-blue-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, cls.course), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, cls.time, " \u2022 ", cls.room), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-400"
  }, "Topic: ", cls.topic))), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary",
    onClick: () => handleViewClassDetails(cls)
  }, "View Details")))))))), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "text-dark-primary"
  }, "Recent Activities"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your latest course-related actions")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, recentActivities.map((activity, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center space-x-4 p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: `w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'grading' ? 'bg-green-500/20' : activity.type === 'content' ? 'bg-blue-500/20' : activity.type === 'announcement' ? 'bg-purple-500/20' : 'bg-orange-500/20'}`,
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    className: `w-4 h-4 ${activity.type === 'grading' ? 'text-green-400' : activity.type === 'content' ? 'text-blue-400' : activity.type === 'announcement' ? 'text-purple-400' : 'text-orange-400'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, activity.action), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, activity.time))))))))), /*#__PURE__*/React.createElement(motion.div, {
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
    },
    whileHover: {
      scale: 1.01
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-dark-primary"
  }, "Quick Actions"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Frequently used course management tools for ", user.department, " department"), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-center space-x-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
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
  }), "Create Assignment")), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 mr-2"
  }), "Schedule Exam")), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 mr-2"
  }), "View Students")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'total-students',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-3xl max-h-[80vh] bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Total Students Breakdown"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Student distribution across all your courses")), /*#__PURE__*/React.createElement(ScrollArea, {
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
    className: "text-3xl font-bold text-blue-400"
  }, totalStudents), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Total Students")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-green-400"
  }, teachingCourses.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Active Courses")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-purple-400"
  }, Math.round(totalStudents / teachingCourses.length)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Avg per Course"))), teachingCourses.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: course.id,
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
  }, course.name), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400"
  }, course.students, " students")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, course.code, " \u2022 ", course.semester), /*#__PURE__*/React.createElement(Progress, {
    value: course.students / Math.max(...teachingCourses.map(c => c.students)) * 100,
    className: "h-2 mt-2"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'avg-attendance',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl max-h-[80vh] bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "Average Attendance Analytics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Attendance metrics across all your courses")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[600px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
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
  }, avgAttendance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Average Attendance")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-4"
  }, "Course-wise Attendance"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: teachingCourses
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "code",
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
    dataKey: "avgAttendance",
    fill: "#10B981",
    radius: [4, 4, 0, 0]
  })))), teachingCourses.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: course.id,
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
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, course.name), /*#__PURE__*/React.createElement(Badge, {
    className: `${course.avgAttendance >= 90 ? 'bg-green-500/20 text-green-400' : course.avgAttendance >= 85 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`
  }, course.avgAttendance, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: course.avgAttendance,
    className: "h-2"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'avg-performance',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl max-h-[80vh] bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "Average Performance Metrics"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Student performance across all your courses")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[600px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-6",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
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
  }, avgPerformance, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Average Performance")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-4"
  }, "Course-wise Performance"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: teachingCourses
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "code",
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
    dataKey: "avgPerformance",
    fill: "#8B5CF6",
    radius: [4, 4, 0, 0]
  })))), teachingCourses.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: course.id,
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
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-dark-primary"
  }, course.name), /*#__PURE__*/React.createElement(Badge, {
    className: `${course.avgPerformance >= 90 ? 'bg-green-500/20 text-green-400' : course.avgPerformance >= 80 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`
  }, course.avgPerformance, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: course.avgPerformance,
    className: "h-2"
  }))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'teaching-credits',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 mr-2 text-orange-400"
  }), "Teaching Credits Breakdown"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Credit distribution across all courses")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "text-5xl font-bold text-orange-400",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5
    }
  }, totalCredits), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Total Teaching Credits")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, teachingCourses.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: course.id,
    className: "flex items-center justify-between p-3 bg-dark-hover rounded-lg",
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, course.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, course.code)), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-orange-500/20 text-orange-400"
  }, course.credits, " credits"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showClassDetails,
    onOpenChange: setShowClassDetails
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), "Class Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive information about the upcoming class")), selectedClass && /*#__PURE__*/React.createElement(motion.div, {
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
    className: "p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary"
  }, selectedClass.course), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Topic: ", selectedClass.topic)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 text-blue-400"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Time")), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedClass.time)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-green-400"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Duration")), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedClass.duration)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-2"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 text-purple-400"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Room")), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, selectedClass.room)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-2"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 text-green-400"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Status")), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-green-400"
  }, "Scheduled"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Class Objectives"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1 text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Introduce core concepts of ", selectedClass.topic), /*#__PURE__*/React.createElement("li", null, "\u2022 Provide practical examples and demonstrations"), /*#__PURE__*/React.createElement("li", null, "\u2022 Q&A session with students"), /*#__PURE__*/React.createElement("li", null, "\u2022 Assign homework for next class"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-4 h-4 mr-2"
  }), "Mark as Completed"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary flex-1"
  }, /*#__PURE__*/React.createElement(Edit, {
    className: "w-4 h-4 mr-2"
  }), "Edit Class"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showManageCourse,
    onOpenChange: setShowManageCourse
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary text-2xl"
  }, "Manage Course: ", selectedCourse?.name), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Comprehensive course management and content organization")), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "overview",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "bg-dark-hover border border-dark-color"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "overview",
    className: "data-[state=active]:bg-dark-card"
  }, "Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "content",
    className: "data-[state=active]:bg-dark-card"
  }, "Content"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "assignments",
    className: "data-[state=active]:bg-dark-card"
  }, "Assignments"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "students",
    className: "data-[state=active]:bg-dark-card"
  }, "Students")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "overview",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Course Information"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Code: ", /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, selectedCourse?.code)), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Credits: ", /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, selectedCourse?.credits)), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Room: ", /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, selectedCourse?.room)), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Students: ", /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, selectedCourse?.students))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-2"
  }, "Performance Metrics"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Attendance: ", /*#__PURE__*/React.createElement("span", {
    className: "text-green-400"
  }, selectedCourse?.avgAttendance, "%")), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Performance: ", /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400"
  }, selectedCourse?.avgPerformance, "%")), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Assignments: ", /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary"
  }, selectedCourse?.assignments)), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Progress: ", /*#__PURE__*/React.createElement("span", {
    className: "text-purple-400"
  }, selectedCourse?.completedLectures, "/", selectedCourse?.totalLectures))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "content",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Course Materials"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Add Material")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3"
  }, [1, 2, 3].map(item => /*#__PURE__*/React.createElement(Card, {
    key: item,
    className: "bg-dark-hover border-dark-color p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, "Lecture ", item, ": Introduction to Topic"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Added 2 days ago")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Edit, {
    className: "w-3 h-3"
  })))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "assignments",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Assignments & Exams"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Create Assignment")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3"
  }, [1, 2, 3].map(item => /*#__PURE__*/React.createElement(Card, {
    key: item,
    className: "bg-dark-hover border-dark-color p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, "Assignment ", item), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Due: Next week \u2022 ", Math.floor(Math.random() * 30) + 10, " submissions")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, "Active"))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "students",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Enrolled Students"), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3"
  }, [1, 2, 3, 4].map(item => /*#__PURE__*/React.createElement(Card, {
    key: item,
    className: "bg-dark-hover border-dark-color p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, "Student Name ", item), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Roll: CS202100", item, " \u2022 CGPA: ", (8.0 + Math.random()).toFixed(1))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, 85 + Math.floor(Math.random() * 15), "%"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary"
  }, "View Profile"))))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showSettings,
    onOpenChange: setShowSettings
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Course Settings: ", selectedCourse?.name), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Configure course preferences and settings")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "courseName",
    className: "text-dark-primary"
  }, "Course Name"), /*#__PURE__*/React.createElement(Input, {
    id: "courseName",
    defaultValue: selectedCourse?.name,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "courseCode",
    className: "text-dark-primary"
  }, "Course Code"), /*#__PURE__*/React.createElement(Input, {
    id: "courseCode",
    defaultValue: selectedCourse?.code,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "credits",
    className: "text-dark-primary"
  }, "Credits"), /*#__PURE__*/React.createElement(Input, {
    id: "credits",
    type: "number",
    defaultValue: selectedCourse?.credits,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "room",
    className: "text-dark-primary"
  }, "Room"), /*#__PURE__*/React.createElement(Input, {
    id: "room",
    defaultValue: selectedCourse?.room,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "semester",
    className: "text-dark-primary"
  }, "Semester"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: selectedCourse?.semester
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "6th Semester"
  }, "6th Semester"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "7th Semester"
  }, "7th Semester"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "8th Semester"
  }, "8th Semester"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "description",
    className: "text-dark-primary"
  }, "Course Description"), /*#__PURE__*/React.createElement(Textarea, {
    id: "description",
    placeholder: "Enter course description...",
    className: "bg-dark-bg border-dark-color text-dark-primary",
    rows: 4
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 pt-4 border-t border-dark-color"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1"
  }, /*#__PURE__*/React.createElement(Save, {
    className: "w-4 h-4 mr-2"
  }), "Save Settings"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary",
    onClick: () => setShowSettings(false)
  }, "Cancel"))))));
}