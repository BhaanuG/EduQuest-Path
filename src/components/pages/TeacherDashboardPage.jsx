import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Users, BookOpen, TrendingUp, Award, Download, Calendar, GraduationCap, Plus, FileText, Mail, Bell, Clock, Send, Save } from "lucide-react";
import { getAllStudents } from "../StudentData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
// Get department-specific metrics - function to be used inside component
function getDepartmentMetrics(user, totalStudents, averageCGPA, highPerformers) {
  // Department-specific active courses
  const departmentCourses = {
    "Computer Science": ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Computer Networks"],
    "Electronics": ["Digital Signal Processing", "VLSI Design", "Communication Systems", "Microprocessors", "Control Systems"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Heat Transfer", "Machine Design", "Manufacturing"],
    "Information Technology": ["Database Systems", "Web Development", "Cybersecurity", "Network Administration", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Engineering", "Geotechnical", "Transportation", "Construction Management"]
  };
  const activeCourses = departmentCourses[user.department]?.length || 3;
  return [{
    title: "Department Students",
    value: totalStudents.toString(),
    change: "+5",
    icon: Users,
    iconColor: "text-blue-400",
    isPositive: true
  }, {
    title: "Active Courses",
    value: activeCourses.toString(),
    change: "+1",
    icon: BookOpen,
    iconColor: "text-green-400",
    isPositive: true
  }, {
    title: "Dept. Avg Performance",
    value: averageCGPA,
    change: "+0.2",
    icon: TrendingUp,
    iconColor: "text-orange-400",
    isPositive: true
  }, {
    title: "High Performers",
    value: highPerformers.toString(),
    change: "+3",
    icon: Award,
    iconColor: "text-purple-400",
    isPositive: true
  }];
}

// Department-specific activities function
function getDepartmentActivities(user) {
  const departmentActivities = {
    "Computer Science": [{
      title: "Assignment submitted by Aarav Sharma",
      subject: "Data Structures",
      time: "1 hour ago",
      type: "submission"
    }, {
      title: "New project proposal from Sneha Patel",
      subject: "Software Engineering",
      time: "3 hours ago",
      type: "discussion"
    }, {
      title: "Grade updated for Neha Gupta",
      subject: "Database Systems",
      time: "5 hours ago",
      type: "grade"
    }, {
      title: "Lab session scheduled",
      subject: "Computer Networks",
      time: "1 day ago",
      type: "schedule"
    }],
    "Electronics": [{
      title: "Circuit design submitted by Priya Reddy",
      subject: "VLSI Design",
      time: "2 hours ago",
      type: "submission"
    }, {
      title: "Lab report from Aditya Nair",
      subject: "Digital Signal Processing",
      time: "4 hours ago",
      type: "discussion"
    }, {
      title: "Quiz results updated",
      subject: "Communication Systems",
      time: "6 hours ago",
      type: "grade"
    }, {
      title: "Workshop scheduled",
      subject: "Microprocessors",
      time: "1 day ago",
      type: "schedule"
    }],
    "Mechanical": [{
      title: "CAD model submitted by Rohan Kumar",
      subject: "Machine Design",
      time: "1 hour ago",
      type: "submission"
    }, {
      title: "Thermodynamics query from Kiran Das",
      subject: "Thermal Engineering",
      time: "3 hours ago",
      type: "discussion"
    }, {
      title: "Practical marks updated",
      subject: "Fluid Mechanics",
      time: "4 hours ago",
      type: "grade"
    }, {
      title: "Industry visit planned",
      subject: "Manufacturing",
      time: "2 days ago",
      type: "schedule"
    }],
    "Information Technology": [{
      title: "Web project deployed by Kavya Iyer",
      subject: "Web Development",
      time: "30 mins ago",
      type: "submission"
    }, {
      title: "Security discussion by Meera Joshi",
      subject: "Cybersecurity",
      time: "2 hours ago",
      type: "discussion"
    }, {
      title: "Database assignment graded",
      subject: "Database Systems",
      time: "3 hours ago",
      type: "grade"
    }, {
      title: "Cloud workshop scheduled",
      subject: "Cloud Computing",
      time: "1 day ago",
      type: "schedule"
    }],
    "Civil": [{
      title: "Structural design by Arjun Verma",
      subject: "Structural Engineering",
      time: "2 hours ago",
      type: "submission"
    }, {
      title: "Environmental impact study",
      subject: "Environmental Engineering",
      time: "4 hours ago",
      type: "discussion"
    }, {
      title: "Survey results updated",
      subject: "Geotechnical Engineering",
      time: "5 hours ago",
      type: "grade"
    }, {
      title: "Site visit planned",
      subject: "Construction Management",
      time: "1 day ago",
      type: "schedule"
    }]
  };
  return departmentActivities[user.department] || [];
}

// Department-specific classes function - varies by teacher ID
function getDepartmentClasses(user) {
  const teacherSchedules = {
    "2001": [
    // Prof. Suresh Iyer - CS
    {
      course: "Data Structures & Algorithms",
      time: "10:00 AM - 11:30 AM",
      room: "Lab 204",
      students: 25
    }, {
      course: "Advanced Algorithms",
      time: "2:00 PM - 3:30 PM",
      room: "Room 301",
      students: 22
    }, {
      course: "Competitive Programming",
      time: "4:00 PM - 5:30 PM",
      room: "Lab 205",
      students: 18
    }],
    "2002": [
    // Dr. Anjali Reddy - Electronics
    {
      course: "Digital Signal Processing",
      time: "9:00 AM - 10:30 AM",
      room: "Lab 301",
      students: 18
    }, {
      course: "Signal Processing Lab",
      time: "11:00 AM - 12:30 PM",
      room: "Lab 302",
      students: 16
    }, {
      course: "Advanced DSP",
      time: "3:00 PM - 4:30 PM",
      room: "Room 401",
      students: 20
    }],
    "2003": [
    // Prof. Rajeev Menon - Mechanical
    {
      course: "Thermodynamics I",
      time: "10:00 AM - 11:30 AM",
      room: "Room 501",
      students: 24
    }, {
      course: "Thermodynamics II",
      time: "1:00 PM - 2:30 PM",
      room: "Room 502",
      students: 22
    }, {
      course: "Thermal Engineering Lab",
      time: "3:30 PM - 5:00 PM",
      room: "Lab 504",
      students: 20
    }],
    "2004": [
    // Dr. Kavita Sharma - IT
    {
      course: "Database Management Systems",
      time: "9:30 AM - 11:00 AM",
      room: "Lab 601",
      students: 20
    }, {
      course: "Advanced Database Systems",
      time: "2:00 PM - 3:30 PM",
      room: "Lab 602",
      students: 18
    }, {
      course: "NoSQL Databases",
      time: "4:00 PM - 5:30 PM",
      room: "Room 603",
      students: 16
    }],
    "2005": [
    // Prof. Manoj Gupta - Civil
    {
      course: "Structural Engineering I",
      time: "8:00 AM - 9:30 AM",
      room: "Room 701",
      students: 22
    }, {
      course: "Structural Engineering II",
      time: "11:00 AM - 12:30 PM",
      room: "Room 702",
      students: 20
    }, {
      course: "Structural Design Lab",
      time: "2:30 PM - 4:00 PM",
      room: "Lab 703",
      students: 18
    }],
    "2006": [
    // Dr. Shalini Nair - CS
    {
      course: "Machine Learning",
      time: "9:00 AM - 10:30 AM",
      room: "Lab 206",
      students: 24
    }, {
      course: "Deep Learning",
      time: "1:00 PM - 2:30 PM",
      room: "Lab 207",
      students: 21
    }, {
      course: "AI Project Lab",
      time: "3:00 PM - 4:30 PM",
      room: "Lab 208",
      students: 19
    }],
    "2007": [
    // Prof. Ramesh Babu - Electronics
    {
      course: "VLSI Design",
      time: "10:00 AM - 11:30 AM",
      room: "Lab 303",
      students: 17
    }, {
      course: "Chip Design Fundamentals",
      time: "12:00 PM - 1:30 PM",
      room: "Lab 304",
      students: 15
    }, {
      course: "Advanced VLSI",
      time: "3:00 PM - 4:30 PM",
      room: "Room 402",
      students: 19
    }],
    "2008": [
    // Dr. Neeta Verma - IT
    {
      course: "Cybersecurity Fundamentals",
      time: "9:00 AM - 10:30 AM",
      room: "Lab 604",
      students: 19
    }, {
      course: "Network Security",
      time: "1:00 PM - 2:30 PM",
      room: "Lab 605",
      students: 17
    }, {
      course: "Ethical Hacking Lab",
      time: "3:30 PM - 5:00 PM",
      room: "Lab 606",
      students: 18
    }],
    "2009": [
    // Prof. Arvind Rao - Mechanical
    {
      course: "Fluid Mechanics",
      time: "8:30 AM - 10:00 AM",
      room: "Room 503",
      students: 23
    }, {
      course: "Fluid Dynamics",
      time: "11:00 AM - 12:30 PM",
      room: "Lab 505",
      students: 21
    }, {
      course: "CFD Lab",
      time: "2:00 PM - 3:30 PM",
      room: "Lab 506",
      students: 19
    }],
    "2010": [
    // Dr. Meena Das - Civil
    {
      course: "Environmental Engineering",
      time: "9:00 AM - 10:30 AM",
      room: "Room 704",
      students: 21
    }, {
      course: "Water Resources Management",
      time: "12:00 PM - 1:30 PM",
      room: "Room 705",
      students: 19
    }, {
      course: "Environmental Lab",
      time: "3:00 PM - 4:30 PM",
      room: "Lab 706",
      students: 17
    }]
  };
  return teacherSchedules[user.id] || [{
    course: "General Course 1",
    time: "10:00 AM - 11:30 AM",
    room: "Room 101",
    students: 20
  }, {
    course: "General Course 2",
    time: "2:00 PM - 3:30 PM",
    room: "Room 102",
    students: 18
  }];
}

// Generate unique weekly schedule for each teacher
function getWeeklySchedule(user) {
  const todayClasses = getDepartmentClasses(user);
  const teacherWeeklySchedules = {
    "2001": {
      // Prof. Suresh Iyer
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Algorithm Design",
        time: "9:00 AM - 10:30 AM",
        room: "Room 302",
        students: 23
      }, {
        course: "Problem Solving Workshop",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 204",
        students: 20
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Data Structure Lab",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 206",
        students: 24
      }, {
        course: "Office Hours",
        time: "3:00 PM - 4:00 PM",
        room: "Faculty Room 12",
        students: 0
      }],
      "Friday": [{
        course: "Advanced Topics in CS",
        time: "11:00 AM - 12:30 PM",
        room: "Room 303",
        students: 21
      }, {
        course: "Research Mentoring",
        time: "2:00 PM - 3:30 PM",
        room: "Research Lab",
        students: 8
      }]
    },
    "2002": {
      // Dr. Anjali Reddy
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Analog Signal Processing",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 305",
        students: 17
      }, {
        course: "DSP Project Review",
        time: "2:00 PM - 3:30 PM",
        room: "Room 403",
        students: 19
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Signal Theory",
        time: "9:00 AM - 10:30 AM",
        room: "Room 404",
        students: 18
      }, {
        course: "Lab Session",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 306",
        students: 16
      }],
      "Friday": [{
        course: "Research Seminar",
        time: "11:00 AM - 12:30 PM",
        room: "Seminar Hall",
        students: 25
      }, {
        course: "Project Guidance",
        time: "3:00 PM - 4:30 PM",
        room: "Faculty Room 8",
        students: 10
      }]
    },
    "2003": {
      // Prof. Rajeev Menon
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Applied Thermodynamics",
        time: "9:00 AM - 10:30 AM",
        room: "Room 504",
        students: 23
      }, {
        course: "Heat Transfer",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 507",
        students: 21
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Energy Systems",
        time: "10:00 AM - 11:30 AM",
        room: "Room 505",
        students: 22
      }, {
        course: "Thermal Lab",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 508",
        students: 20
      }],
      "Friday": [{
        course: "Power Engineering",
        time: "9:00 AM - 10:30 AM",
        room: "Room 506",
        students: 24
      }, {
        course: "Consultation Hours",
        time: "3:00 PM - 4:00 PM",
        room: "Faculty Room 15",
        students: 0
      }]
    },
    "2004": {
      // Dr. Kavita Sharma
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Relational Database Design",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 607",
        students: 19
      }, {
        course: "SQL Workshop",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 608",
        students: 18
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Database Optimization",
        time: "9:00 AM - 10:30 AM",
        room: "Room 604",
        students: 17
      }, {
        course: "Big Data Systems",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 609",
        students: 16
      }],
      "Friday": [{
        course: "Data Warehousing",
        time: "11:00 AM - 12:30 PM",
        room: "Room 605",
        students: 20
      }, {
        course: "Project Mentoring",
        time: "3:00 PM - 4:30 PM",
        room: "Faculty Room 10",
        students: 12
      }]
    },
    "2005": {
      // Prof. Manoj Gupta
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Advanced Structural Analysis",
        time: "9:00 AM - 10:30 AM",
        room: "Room 707",
        students: 21
      }, {
        course: "Design of Structures",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 708",
        students: 19
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Earthquake Engineering",
        time: "10:00 AM - 11:30 AM",
        room: "Room 708",
        students: 20
      }, {
        course: "Structural Testing Lab",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 709",
        students: 18
      }],
      "Friday": [{
        course: "Bridge Design",
        time: "8:00 AM - 9:30 AM",
        room: "Room 709",
        students: 22
      }, {
        course: "Research Discussion",
        time: "3:00 PM - 4:30 PM",
        room: "Research Center",
        students: 8
      }]
    },
    "2006": {
      // Dr. Shalini Nair
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Neural Networks",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 209",
        students: 23
      }, {
        course: "Computer Vision",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 210",
        students: 20
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Natural Language Processing",
        time: "9:00 AM - 10:30 AM",
        room: "Room 304",
        students: 22
      }, {
        course: "ML Project Lab",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 211",
        students: 19
      }],
      "Friday": [{
        course: "AI Ethics",
        time: "11:00 AM - 12:30 PM",
        room: "Room 305",
        students: 24
      }, {
        course: "PhD Student Mentoring",
        time: "3:00 PM - 5:00 PM",
        room: "Research Lab",
        students: 6
      }]
    },
    "2007": {
      // Prof. Ramesh Babu
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Digital IC Design",
        time: "9:00 AM - 10:30 AM",
        room: "Lab 307",
        students: 16
      }, {
        course: "Chip Fabrication",
        time: "1:00 PM - 2:30 PM",
        room: "Room 405",
        students: 18
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "ASIC Design",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 308",
        students: 15
      }, {
        course: "System on Chip",
        time: "2:00 PM - 3:30 PM",
        room: "Room 406",
        students: 17
      }],
      "Friday": [{
        course: "VLSI Testing",
        time: "9:00 AM - 10:30 AM",
        room: "Lab 309",
        students: 19
      }, {
        course: "Consultation",
        time: "3:00 PM - 4:00 PM",
        room: "Faculty Room 9",
        students: 0
      }]
    },
    "2008": {
      // Dr. Neeta Verma
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Cryptography",
        time: "10:00 AM - 11:30 AM",
        room: "Room 606",
        students: 18
      }, {
        course: "Penetration Testing",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 610",
        students: 16
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Security Architecture",
        time: "9:00 AM - 10:30 AM",
        room: "Room 607",
        students: 17
      }, {
        course: "Cyber Defense Lab",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 611",
        students: 19
      }],
      "Friday": [{
        course: "Information Assurance",
        time: "11:00 AM - 12:30 PM",
        room: "Room 608",
        students: 18
      }, {
        course: "Security Research",
        time: "3:00 PM - 4:30 PM",
        room: "Security Lab",
        students: 9
      }]
    },
    "2009": {
      // Prof. Arvind Rao
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Advanced Fluid Mechanics",
        time: "9:00 AM - 10:30 AM",
        room: "Room 507",
        students: 22
      }, {
        course: "Turbomachinery",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 509",
        students: 20
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Hydraulic Systems",
        time: "10:00 AM - 11:30 AM",
        room: "Room 508",
        students: 21
      }, {
        course: "Flow Measurement Lab",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 510",
        students: 19
      }],
      "Friday": [{
        course: "Aerodynamics",
        time: "8:30 AM - 10:00 AM",
        room: "Room 509",
        students: 23
      }, {
        course: "Project Reviews",
        time: "3:00 PM - 4:30 PM",
        room: "Faculty Room 14",
        students: 11
      }]
    },
    "2010": {
      // Dr. Meena Das
      "Monday": todayClasses,
      "Tuesday": [{
        course: "Pollution Control",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 707",
        students: 20
      }, {
        course: "Waste Management",
        time: "2:00 PM - 3:30 PM",
        room: "Room 710",
        students: 18
      }],
      "Wednesday": todayClasses,
      "Thursday": [{
        course: "Green Engineering",
        time: "9:00 AM - 10:30 AM",
        room: "Room 711",
        students: 19
      }, {
        course: "Environmental Impact Assessment",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 710",
        students: 17
      }],
      "Friday": [{
        course: "Sustainable Development",
        time: "11:00 AM - 12:30 PM",
        room: "Room 712",
        students: 21
      }, {
        course: "Field Work Planning",
        time: "3:00 PM - 4:30 PM",
        room: "Faculty Room 16",
        students: 10
      }]
    }
  };
  const defaultSchedule = {
    "Monday": todayClasses,
    "Tuesday": todayClasses,
    "Wednesday": todayClasses,
    "Thursday": todayClasses,
    "Friday": todayClasses
  };
  return teacherWeeklySchedules[user.id] || defaultSchedule;
}
export function TeacherDashboardPage({
  user
}) {
  // Defensive: compute a safe display name to avoid runtime errors
  // if user.name is missing or doesn't have expected parts.
  const nameParts = user && user.name ? user.name.split(' ') : [];
  const welcomeName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : (user && user.name ? user.name : '');
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [quickActionDialog, setQuickActionDialog] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    course: "",
    dueDate: "",
    description: ""
  });
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    message: "",
    priority: "normal"
  });
  const [scheduleData, setScheduleData] = useState({
    course: "",
    date: "",
    time: "",
    room: ""
  });

  // Get students from the teacher's department only (includes custom, excludes deleted, applies edits)
  const allStudents = getAllStudents();
  const departmentStudents = allStudents.filter(student => student.department === user.department);
  const totalStudents = departmentStudents.length;
  const averageCGPA = totalStudents > 0 ? (departmentStudents.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(1) : "N/A";
  const highPerformers = departmentStudents.filter(student => student.cgpa >= 8.5).length;
  const highPerformersList = departmentStudents.filter(student => student.cgpa >= 8.5);

  // Get department-specific data
  const teacherMetrics = getDepartmentMetrics(user, totalStudents, averageCGPA, highPerformers);
  const recentActivities = getDepartmentActivities(user);
  const upcomingClasses = getDepartmentClasses(user);
  const weeklySchedule = getWeeklySchedule(user);

  // Get active courses list
  const departmentCoursesList = {
    "Computer Science": [{
      name: "Data Structures & Algorithms",
      code: "CS301",
      students: 25,
      status: "Active"
    }, {
      name: "Database Management Systems",
      code: "CS401",
      students: 22,
      status: "Active"
    }, {
      name: "Software Engineering",
      code: "CS303",
      students: 20,
      status: "Active"
    }, {
      name: "Computer Networks",
      code: "CS402",
      students: 23,
      status: "Active"
    }, {
      name: "Operating Systems",
      code: "CS304",
      students: 21,
      status: "Active"
    }],
    "Electronics": [{
      name: "Digital Signal Processing",
      code: "EC301",
      students: 18,
      status: "Active"
    }, {
      name: "VLSI Design",
      code: "EC401",
      students: 16,
      status: "Active"
    }, {
      name: "Communication Systems",
      code: "EC302",
      students: 20,
      status: "Active"
    }, {
      name: "Microprocessors",
      code: "EC303",
      students: 19,
      status: "Active"
    }],
    "Mechanical": [{
      name: "Thermodynamics",
      code: "ME301",
      students: 24,
      status: "Active"
    }, {
      name: "Fluid Mechanics",
      code: "ME302",
      students: 22,
      status: "Active"
    }, {
      name: "Machine Design",
      code: "ME401",
      students: 18,
      status: "Active"
    }, {
      name: "Heat Transfer",
      code: "ME303",
      students: 20,
      status: "Active"
    }],
    "Information Technology": [{
      name: "Web Development",
      code: "IT301",
      students: 20,
      status: "Active"
    }, {
      name: "Database Systems",
      code: "IT302",
      students: 18,
      status: "Active"
    }, {
      name: "Cybersecurity",
      code: "IT401",
      students: 16,
      status: "Active"
    }, {
      name: "Cloud Computing",
      code: "IT303",
      students: 19,
      status: "Active"
    }],
    "Civil": [{
      name: "Structural Engineering",
      code: "CE301",
      students: 22,
      status: "Active"
    }, {
      name: "Environmental Engineering",
      code: "CE302",
      students: 20,
      status: "Active"
    }, {
      name: "Construction Management",
      code: "CE401",
      students: 18,
      status: "Active"
    }, {
      name: "Geotechnical Engineering",
      code: "CE303",
      students: 19,
      status: "Active"
    }]
  };
  const activeCoursesList = departmentCoursesList[user.department] || [];
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
  const handleCreateAssignment = () => {
    console.log("Creating assignment:", assignmentData);
    setQuickActionDialog(null);
    setAssignmentData({
      title: "",
      course: "",
      dueDate: "",
      description: ""
    });
  };
  const handleSendAnnouncement = () => {
    console.log("Sending announcement:", announcementData);
    setQuickActionDialog(null);
    setAnnouncementData({
      title: "",
      message: "",
      priority: "normal"
    });
  };
  const handleScheduleClass = () => {
    console.log("Scheduling class:", scheduleData);
    setQuickActionDialog(null);
    setScheduleData({
      course: "",
      date: "",
      time: "",
      room: ""
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
  }, "Welcome back, ", welcomeName), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Here's your teaching dashboard overview")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "w-4 h-4 mr-2"
  }), user.department, " Department"), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Export Reports"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, teacherMetrics.map((metric, index) => {
    const Icon = metric.icon;
    const displayValue = metric.value;
    const dialogKey = metric.title.toLowerCase().replace(/\s+/g, '-');
    return /*#__PURE__*/React.createElement(motion.div, {
      key: index,
      variants: itemVariants,
      whileHover: {
        scale: 1.05,
        y: -5
      },
      whileTap: {
        scale: 0.98
      }
    }, /*#__PURE__*/React.createElement(Card, {
      className: "bg-dark-card border-dark-color cursor-pointer hover:border-dark-cta transition-all duration-200",
      onClick: () => setSelectedDialog(dialogKey)
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary"
    }, metric.title), /*#__PURE__*/React.createElement(motion.p, {
      className: "text-3xl font-bold text-dark-primary",
      initial: {
        scale: 0
      },
      animate: {
        scale: 1
      },
      transition: {
        duration: 0.5,
        delay: 0.3 + index * 0.1
      }
    }, displayValue), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement(TrendingUp, {
      className: `w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-sm font-medium ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }, metric.change), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-dark-secondary"
    }, "this month"))), /*#__PURE__*/React.createElement(motion.div, {
      className: `w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center`,
      whileHover: {
        rotate: 360
      },
      transition: {
        duration: 0.6
      }
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
      duration: 0.5,
      delay: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 mr-2"
  }), "Today's Schedule"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your classes for today")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, upcomingClasses.map((class_info, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5,
      scale: 1.02
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, class_info.course), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, class_info.time), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, class_info.room)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, class_info.students, " students"))))), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full dark-button-secondary mt-4",
    onClick: () => setSelectedDialog('full-schedule')
  }, "View Full Schedule"))))), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Recent Activities"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Latest updates from your classes")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, recentActivities.map((activity, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-start space-x-4 p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: `w-2 h-2 rounded-full mt-2 ${activity.type === 'submission' ? 'bg-green-400' : activity.type === 'discussion' ? 'bg-blue-400' : activity.type === 'grade' ? 'bg-orange-400' : 'bg-purple-400'}`,
    animate: {
      scale: [1, 1.5, 1]
    },
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-medium text-dark-primary"
  }, activity.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, activity.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, activity.time))))), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full dark-button-secondary mt-4",
    onClick: () => setSelectedDialog('full-activities')
  }, "View All Activities")))))), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Quick Actions"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Frequently used actions for teaching")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
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
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary h-auto py-4 flex-col items-start space-y-2 w-full",
    onClick: () => setQuickActionDialog('create-assignment')
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "Create Assignment"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs opacity-70"
  }, "Add new task for students")))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary h-auto py-4 flex-col items-start space-y-2 w-full",
    onClick: () => setQuickActionDialog('grade-submissions')
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "Grade Submissions"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs opacity-70"
  }, "Review pending work")))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary h-auto py-4 flex-col items-start space-y-2 w-full",
    onClick: () => setQuickActionDialog('send-announcement')
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "Send Announcement"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs opacity-70"
  }, "Notify all students")))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary h-auto py-4 flex-col items-start space-y-2 w-full",
    onClick: () => setQuickActionDialog('schedule-class')
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "Schedule Class"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs opacity-70"
  }, "Plan upcoming session")))))))), /*#__PURE__*/React.createElement(motion.div, {
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
    },
    whileHover: {
      scale: 1.02
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center",
    animate: {
      rotate: 360
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-8 h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary"
  }, "Excellent Department Performance!"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-1"
  }, "Your ", user.department, " department maintains an average CGPA of ", averageCGPA, " with ", highPerformers, " high-performing students.")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2"
  }, "Top Department")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'department-students',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Department Students"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "All students in ", user.department, " department")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-3",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, departmentStudents.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: student.rollNo,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Roll No: ", student.rollNo), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Semester: ", student.semester)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: student.cgpa >= 8.5 ? "bg-green-500/20 text-green-400" : student.cgpa >= 7.0 ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
  }, "CGPA: ", student.cgpa)))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'active-courses',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Active Courses"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "All courses in ", user.department, " department")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-3",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, activeCoursesList.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, course.name), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400"
  }, course.status)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Course Code: ", course.code), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, course.students, " enrolled students")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'dept.-avg-performance',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Department Average Performance"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Performance metrics for ", user.department, " department")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "p-6 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "text-5xl font-bold text-dark-primary",
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5
    }
  }, averageCGPA), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Average CGPA")), /*#__PURE__*/React.createElement(Progress, {
    value: parseFloat(averageCGPA) * 10,
    className: "h-3"
  })), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-3 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg text-center",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-green-400"
  }, highPerformers), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "High Performers"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary"
  }, "(CGPA \u2265 8.5)")), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg text-center",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-blue-400"
  }, departmentStudents.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.5).length), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Average Performers"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary"
  }, "(7.0 \u2264 CGPA < 8.5)")), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg text-center",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-orange-400"
  }, departmentStudents.filter(s => s.cgpa < 7.0).length), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Need Support"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary"
  }, "(CGPA < 7.0)")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'high-performers',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "High Performers"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Students with CGPA \u2265 8.5 in ", user.department, " department")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-3",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, highPerformersList.length > 0 ? highPerformersList.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: student.rollNo,
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5,
      scale: 1.02
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, "#", index + 1)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Roll No: ", student.rollNo))), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, "CGPA: ", student.cgpa)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Semester: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, student.semester)), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-dark-bg rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Email: "), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, student.email))))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center text-dark-secondary py-8"
  }, "No high performers found"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'full-schedule',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-4xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "Full Weekly Schedule"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "All your classes for this week - ", user.name)), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, Object.entries(weeklySchedule).map(([day, classes], dayIndex) => /*#__PURE__*/React.createElement(motion.div, {
    key: day,
    className: "space-y-2",
    variants: itemVariants
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 mr-2"
  }), day), classes.map((class_info, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg ml-6",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-medium text-dark-primary"
  }, class_info.course), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 mt-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary flex items-center"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 mr-1"
  }), class_info.time), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, class_info.room))), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, class_info.students > 0 ? `${class_info.students} students` : 'Office Hours'))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'full-activities',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary"
  }, "All Recent Activities"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Complete activity log from all your classes")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-3",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, [...recentActivities, ...recentActivities].map((activity, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-start space-x-4 p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${activity.type === 'submission' ? 'bg-green-400' : activity.type === 'discussion' ? 'bg-blue-400' : activity.type === 'grade' ? 'bg-orange-400' : 'bg-purple-400'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, activity.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, activity.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary mt-1"
  }, activity.time)), /*#__PURE__*/React.createElement(Badge, {
    className: activity.type === 'submission' ? 'bg-green-500/20 text-green-400' : activity.type === 'discussion' ? 'bg-blue-500/20 text-blue-400' : activity.type === 'grade' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'
  }, activity.type))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: quickActionDialog === 'create-assignment',
    onOpenChange: open => !open && setQuickActionDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-5 h-5 mr-2"
  }), "Create New Assignment"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Add a new assignment for your students")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "assignment-title",
    className: "text-dark-primary"
  }, "Assignment Title"), /*#__PURE__*/React.createElement(Input, {
    id: "assignment-title",
    value: assignmentData.title,
    onChange: e => setAssignmentData({
      ...assignmentData,
      title: e.target.value
    }),
    placeholder: "e.g., Data Structures Lab Assignment 3",
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "assignment-course",
    className: "text-dark-primary"
  }, "Course"), /*#__PURE__*/React.createElement(Input, {
    id: "assignment-course",
    value: assignmentData.course,
    onChange: e => setAssignmentData({
      ...assignmentData,
      course: e.target.value
    }),
    placeholder: "e.g., CS301 - Data Structures",
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "assignment-due",
    className: "text-dark-primary"
  }, "Due Date"), /*#__PURE__*/React.createElement(Input, {
    id: "assignment-due",
    type: "date",
    value: assignmentData.dueDate,
    onChange: e => setAssignmentData({
      ...assignmentData,
      dueDate: e.target.value
    }),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "assignment-description",
    className: "text-dark-primary"
  }, "Description"), /*#__PURE__*/React.createElement(Textarea, {
    id: "assignment-description",
    value: assignmentData.description,
    onChange: e => setAssignmentData({
      ...assignmentData,
      description: e.target.value
    }),
    placeholder: "Describe the assignment details...",
    className: "bg-dark-bg border-dark-color text-dark-primary min-h-[100px]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-4"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1",
    onClick: handleCreateAssignment
  }, /*#__PURE__*/React.createElement(Save, {
    className: "w-4 h-4 mr-2"
  }), "Create Assignment"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary",
    onClick: () => setQuickActionDialog(null)
  }, "Cancel"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: quickActionDialog === 'grade-submissions',
    onOpenChange: open => !open && setQuickActionDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-3xl max-h-[80vh]"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-5 h-5 mr-2"
  }), "Pending Submissions"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Review and grade student submissions")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-[400px] pr-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-3",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  }, departmentStudents.slice(0, 5).map((student, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Assignment 3 - Data Structures")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-orange-500/20 text-orange-400"
  }, "Pending")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-primary"
  }, "Grade Now"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary"
  }, "View Submission")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: quickActionDialog === 'send-announcement',
    onOpenChange: open => !open && setQuickActionDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 mr-2"
  }), "Send Announcement"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Notify all students in your department")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "announcement-title",
    className: "text-dark-primary"
  }, "Title"), /*#__PURE__*/React.createElement(Input, {
    id: "announcement-title",
    value: announcementData.title,
    onChange: e => setAnnouncementData({
      ...announcementData,
      title: e.target.value
    }),
    placeholder: "e.g., Important: Class Rescheduled",
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "announcement-message",
    className: "text-dark-primary"
  }, "Message"), /*#__PURE__*/React.createElement(Textarea, {
    id: "announcement-message",
    value: announcementData.message,
    onChange: e => setAnnouncementData({
      ...announcementData,
      message: e.target.value
    }),
    placeholder: "Type your announcement message...",
    className: "bg-dark-bg border-dark-color text-dark-primary min-h-[150px]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-4"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1",
    onClick: handleSendAnnouncement
  }, /*#__PURE__*/React.createElement(Send, {
    className: "w-4 h-4 mr-2"
  }), "Send Announcement"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary",
    onClick: () => setQuickActionDialog(null)
  }, "Cancel"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: quickActionDialog === 'schedule-class',
    onOpenChange: open => !open && setQuickActionDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-5 h-5 mr-2"
  }), "Schedule New Class"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Plan an upcoming class session")), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "schedule-course",
    className: "text-dark-primary"
  }, "Course"), /*#__PURE__*/React.createElement(Input, {
    id: "schedule-course",
    value: scheduleData.course,
    onChange: e => setScheduleData({
      ...scheduleData,
      course: e.target.value
    }),
    placeholder: "e.g., Data Structures & Algorithms",
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "schedule-date",
    className: "text-dark-primary"
  }, "Date"), /*#__PURE__*/React.createElement(Input, {
    id: "schedule-date",
    type: "date",
    value: scheduleData.date,
    onChange: e => setScheduleData({
      ...scheduleData,
      date: e.target.value
    }),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "schedule-time",
    className: "text-dark-primary"
  }, "Time"), /*#__PURE__*/React.createElement(Input, {
    id: "schedule-time",
    type: "time",
    value: scheduleData.time,
    onChange: e => setScheduleData({
      ...scheduleData,
      time: e.target.value
    }),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "schedule-room",
    className: "text-dark-primary"
  }, "Room"), /*#__PURE__*/React.createElement(Input, {
    id: "schedule-room",
    value: scheduleData.room,
    onChange: e => setScheduleData({
      ...scheduleData,
      room: e.target.value
    }),
    placeholder: "e.g., Lab 204",
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-4"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary flex-1",
    onClick: handleScheduleClass
  }, /*#__PURE__*/React.createElement(Save, {
    className: "w-4 h-4 mr-2"
  }), "Schedule Class"), /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary",
    onClick: () => setQuickActionDialog(null)
  }, "Cancel"))))));
}