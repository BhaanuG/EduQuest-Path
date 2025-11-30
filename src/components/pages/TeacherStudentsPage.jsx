import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Search, Filter, Download, Users, Mail, GraduationCap, Award, X, Phone, Calendar, TrendingUp, BarChart3, Plus, Save, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { STUDENTS_DATA } from "../StudentData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
// Generate attendance percentage for each student
const generateAttendancePercentage = rollNo => {
  const seed = parseInt(rollNo.slice(-3));
  return Math.min(95, Math.max(75, 80 + seed % 16));
};

// Generate performance rating based on CGPA
const getPerformanceRating = cgpa => {
  if (cgpa >= 9.0) return "Outstanding";
  if (cgpa >= 8.5) return "Excellent";
  if (cgpa >= 8.0) return "Very Good";
  if (cgpa >= 7.5) return "Good";
  if (cgpa >= 7.0) return "Satisfactory";
  return "Needs Improvement";
};

// LocalStorage functions
const STORAGE_KEY = "eduquest_custom_students";
const DELETED_STUDENTS_KEY = "eduquest_deleted_students";
const EDITED_STUDENTS_KEY = "eduquest_edited_students";
const loadCustomStudents = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading custom students:", error);
    return [];
  }
};
const saveCustomStudents = students => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error saving custom students:", error);
  }
};
const loadDeletedStudents = () => {
  try {
    const stored = localStorage.getItem(DELETED_STUDENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading deleted students:", error);
    return [];
  }
};
const saveDeletedStudents = rollNos => {
  try {
    localStorage.setItem(DELETED_STUDENTS_KEY, JSON.stringify(rollNos));
  } catch (error) {
    console.error("Error saving deleted students:", error);
  }
};
const loadEditedStudents = () => {
  try {
    const stored = localStorage.getItem(EDITED_STUDENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading edited students:", error);
    return [];
  }
};
const saveEditedStudents = students => {
  try {
    localStorage.setItem(EDITED_STUDENTS_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error saving edited students:", error);
  }
};
export function TeacherStudentsPage({
  user
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHighPerformers, setShowHighPerformers] = useState(false);
  const [showCGPAGraph, setShowCGPAGraph] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [customStudents, setCustomStudents] = useState([]);
  const [deletedStudents, setDeletedStudents] = useState([]);
  const [editedStudents, setEditedStudents] = useState([]);
  const [originalRollNo, setOriginalRollNo] = useState("");
  const studentsListRef = useRef(null);

  // Load custom, deleted, and edited students on mount
  useEffect(() => {
    setCustomStudents(loadCustomStudents());
    setDeletedStudents(loadDeletedStudents());
    setEditedStudents(loadEditedStudents());
  }, []);

  // Form state for new student
  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    password: "",
    cgpa: 0,
    semester: 1,
    department: "",
    email: ""
  });

  // Combine default and custom students, applying edits and filtering deleted
  const allStudents = [
  // Original students (not deleted, and replace with edited version if exists)
  ...STUDENTS_DATA.filter(s => !deletedStudents.includes(s.rollNo)).map(s => {
    const editedVersion = editedStudents.find(es => es.rollNo === s.rollNo);
    return editedVersion || s;
  }),
  // Custom added students (not deleted)
  ...customStudents.filter(s => !deletedStudents.includes(s.rollNo))];
  const departments = Array.from(new Set(allStudents.map(student => student.department)));
  const semesters = Array.from(new Set(allStudents.map(student => student.semester))).sort();
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNo.includes(searchTerm);
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesSemester = selectedSemester === "all" || student.semester.toString() === selectedSemester;
    return matchesSearch && matchesDepartment && matchesSemester;
  });
  const totalStudents = allStudents.length;
  const highPerformers = allStudents.filter(student => student.cgpa >= 8.5).length;
  const highPerformersList = allStudents.filter(student => student.cgpa >= 8.5);
  const averageCGPA = (allStudents.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(2);
  const cgpaRanges = [{
    range: "9.0-10.0",
    count: allStudents.filter(s => s.cgpa >= 9.0).length,
    color: "#10B981"
  }, {
    range: "8.5-8.9",
    count: allStudents.filter(s => s.cgpa >= 8.5 && s.cgpa < 9.0).length,
    color: "#3B82F6"
  }, {
    range: "8.0-8.4",
    count: allStudents.filter(s => s.cgpa >= 8.0 && s.cgpa < 8.5).length,
    color: "#8B5CF6"
  }, {
    range: "7.5-7.9",
    count: allStudents.filter(s => s.cgpa >= 7.5 && s.cgpa < 8.0).length,
    color: "#F59E0B"
  }, {
    range: "7.0-7.4",
    count: allStudents.filter(s => s.cgpa >= 7.0 && s.cgpa < 7.5).length,
    color: "#EF4444"
  }, {
    range: "<7.0",
    count: allStudents.filter(s => s.cgpa < 7.0).length,
    color: "#DC2626"
  }];
  const handleViewProfile = student => {
    setSelectedStudent(student);
    setShowProfile(true);
  };
  const handleSendMail = student => {
    window.open(`mailto:${student.email}?subject=Regarding Academic Progress&body=Dear ${student.name},%0D%0A%0D%0ARegards,%0D%0A${user.name}`, '_blank');
  };
  const scrollToStudentsList = () => {
    studentsListRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const handleNewStudentChange = (field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const generatePassword = rollNo => {
    if (rollNo.length >= 3) {
      const lastThree = rollNo.slice(-3);
      return `Student@${lastThree}`;
    }
    return "";
  };
  const generateEmail = name => {
    if (name) {
      const emailName = name.toLowerCase().replace(/\s+/g, '.');
      return `${emailName}@eduquest.edu`;
    }
    return "";
  };
  const validateForm = () => {
    if (!newStudent.rollNo || newStudent.rollNo.length < 10) {
      toast.error("Please enter a valid roll number (minimum 10 characters)");
      return false;
    }

    // Check for duplicate roll number
    if (showEditStudent) {
      // When editing, check if new roll number conflicts with another student
      if (newStudent.rollNo !== originalRollNo && allStudents.some(s => s.rollNo === newStudent.rollNo)) {
        toast.error("A student with this roll number already exists!");
        return false;
      }
    } else {
      // When adding, just check if roll number exists
      if (allStudents.some(s => s.rollNo === newStudent.rollNo)) {
        toast.error("A student with this roll number already exists!");
        return false;
      }
    }
    if (!newStudent.name || newStudent.name.trim().length < 3) {
      toast.error("Please enter a valid name (minimum 3 characters)");
      return false;
    }
    if (!newStudent.department || newStudent.department === "") {
      toast.error("Please select a department");
      return false;
    }
    if (newStudent.semester < 1 || newStudent.semester > 8) {
      toast.error("Please enter a valid semester (1-8)");
      return false;
    }
    if (newStudent.cgpa < 0 || newStudent.cgpa > 10) {
      toast.error("Please enter a valid CGPA (0-10)");
      return false;
    }
    return true;
  };
  const handleAddStudent = () => {
    if (!validateForm()) return;
    const studentToAdd = {
      ...newStudent,
      password: newStudent.password || generatePassword(newStudent.rollNo),
      email: newStudent.email || generateEmail(newStudent.name)
    };
    const updatedCustomStudents = [...customStudents, studentToAdd];
    setCustomStudents(updatedCustomStudents);
    saveCustomStudents(updatedCustomStudents);
    toast.success(`Student ${studentToAdd.name} added successfully!`);
    setNewStudent({
      rollNo: "",
      name: "",
      password: "",
      cgpa: 0,
      semester: 1,
      department: "",
      email: ""
    });
    setShowAddStudent(false);
  };
  const handleEditClick = student => {
    setNewStudent(student);
    setOriginalRollNo(student.rollNo);
    setShowEditStudent(true);
  };
  const handleUpdateStudent = () => {
    if (!validateForm()) return;

    // Use originalRollNo to check which list the student belongs to
    const isOriginalStudent = STUDENTS_DATA.some(s => s.rollNo === originalRollNo);
    const isCustomStudent = customStudents.some(s => s.rollNo === originalRollNo);
    if (isOriginalStudent) {
      // Update edited students list (use originalRollNo for filtering, store new data)
      const updatedEditedStudents = editedStudents.filter(s => s.rollNo !== originalRollNo);
      updatedEditedStudents.push(newStudent);
      setEditedStudents(updatedEditedStudents);
      saveEditedStudents(updatedEditedStudents);
    } else if (isCustomStudent) {
      // Update custom students list (use originalRollNo for finding)
      const updatedCustomStudents = customStudents.map(s => s.rollNo === originalRollNo ? newStudent : s);
      setCustomStudents(updatedCustomStudents);
      saveCustomStudents(updatedCustomStudents);
    }
    toast.success(`Student ${newStudent.name} updated successfully!`);
    setNewStudent({
      rollNo: "",
      name: "",
      password: "",
      cgpa: 0,
      semester: 1,
      department: "",
      email: ""
    });
    setOriginalRollNo("");
    setShowEditStudent(false);
  };
  const handleDeleteClick = student => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };
  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;
    const isOriginalStudent = STUDENTS_DATA.some(s => s.rollNo === studentToDelete.rollNo);
    const isCustomStudent = customStudents.some(s => s.rollNo === studentToDelete.rollNo);
    if (isOriginalStudent) {
      // Add to deleted students list
      const updatedDeletedStudents = [...deletedStudents, studentToDelete.rollNo];
      setDeletedStudents(updatedDeletedStudents);
      saveDeletedStudents(updatedDeletedStudents);

      // Also remove from edited students if it exists there
      const updatedEditedStudents = editedStudents.filter(s => s.rollNo !== studentToDelete.rollNo);
      setEditedStudents(updatedEditedStudents);
      saveEditedStudents(updatedEditedStudents);
    } else if (isCustomStudent) {
      // Remove from custom students
      const updatedCustomStudents = customStudents.filter(s => s.rollNo !== studentToDelete.rollNo);
      setCustomStudents(updatedCustomStudents);
      saveCustomStudents(updatedCustomStudents);
    }
    toast.success(`Student ${studentToDelete.name} deleted successfully!`);
    setStudentToDelete(null);
    setShowDeleteConfirm(false);
  };
  const isCustomStudent = rollNo => {
    return customStudents.some(s => s.rollNo === rollNo);
  };
  const isEditedStudent = rollNo => {
    return editedStudents.some(s => s.rollNo === rollNo);
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
  }, "Student Management"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Manage and track student performance")), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center space-x-3",
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
  }, /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary",
    onClick: () => {
      setNewStudent({
        rollNo: "",
        name: "",
        password: "",
        cgpa: 0,
        semester: 1,
        department: "",
        email: ""
      });
      setShowAddStudent(true);
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Add Student")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Export Students"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
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
    onClick: scrollToStudentsList
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
  }, totalStudents), customStudents.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-400 mt-1"
  }, "+", customStudents.length, " custom added")), /*#__PURE__*/React.createElement(motion.div, {
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
    onClick: () => setShowHighPerformers(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "High Performers (8.5+ CGPA)"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, highPerformers)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Award, {
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
    onClick: () => setShowCGPAGraph(true)
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Average CGPA"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, averageCGPA)), /*#__PURE__*/React.createElement(motion.div, {
    className: "w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center",
    whileHover: {
      rotate: -360
    },
    transition: {
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement(GraduationCap, {
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
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Student Directory"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Search and filter students")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by name or roll number...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-10 bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Select, {
    value: selectedDepartment,
    onValueChange: setSelectedDepartment
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select Department"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Departments"), departments.map(dept => /*#__PURE__*/React.createElement(SelectItem, {
    key: dept,
    value: dept
  }, dept))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Select, {
    value: selectedSemester,
    onValueChange: setSelectedSemester
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select Semester"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Semesters"), semesters.map(sem => /*#__PURE__*/React.createElement(SelectItem, {
    key: sem,
    value: sem.toString()
  }, "Semester ", sem))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary w-full"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 mr-2"
  }), "Advanced Filters")))))), /*#__PURE__*/React.createElement(motion.div, {
    ref: studentsListRef,
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
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-dark-color hover:bg-dark-hover"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Roll Number"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Name"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Department"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Semester"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "CGPA"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Performance"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-dark-secondary"
  }, "Actions"))), /*#__PURE__*/React.createElement(TableBody, null, filteredStudents.map((student, index) => /*#__PURE__*/React.createElement(motion.tr, {
    key: student.rollNo,
    className: "border-dark-color hover:bg-dark-hover",
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
      delay: index * 0.05
    },
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement(TableCell, {
    className: "text-dark-primary font-medium"
  }, student.rollNo, isCustomStudent(student.rollNo) && /*#__PURE__*/React.createElement(Badge, {
    className: "ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs"
  }, "New"), isEditedStudent(student.rollNo) && /*#__PURE__*/React.createElement(Badge, {
    className: "ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
  }, "Edited")), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-dark-secondary"
  }, student.department), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-dark-secondary"
  }, student.semester), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-dark-primary font-semibold"
  }, student.cgpa), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    className: `${student.cgpa >= 9.0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : student.cgpa >= 8.0 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : student.cgpa >= 7.0 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`
  }, student.cgpa >= 9.0 ? 'Excellent' : student.cgpa >= 8.0 ? 'Good' : student.cgpa >= 7.0 ? 'Average' : 'Needs Attention')), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary",
    onClick: () => handleSendMail(student)
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-3 h-3"
  }))), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "dark-button-secondary",
    onClick: () => handleViewProfile(student)
  }, "View"))))))))), filteredStudents.length === 0 && /*#__PURE__*/React.createElement(motion.div, {
    className: "text-center py-12",
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    }
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-12 h-12 text-dark-secondary mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "No students found matching your criteria.")))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showAddStudent || showEditStudent,
    onOpenChange: open => {
      if (!open) {
        setShowAddStudent(false);
        setShowEditStudent(false);
      }
    }
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center"
  }, showEditStudent ? /*#__PURE__*/React.createElement(Edit2, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }) : /*#__PURE__*/React.createElement(Plus, {
    className: "w-6 h-6 mr-2 text-blue-400"
  }), showEditStudent ? 'Edit Student' : 'Add New Student'), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, showEditStudent ? 'Update student details below.' : 'Fill in the student details. Password and email will be auto-generated if not provided.')), /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "rollNo",
    className: "text-dark-primary"
  }, "Roll Number ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "*")), /*#__PURE__*/React.createElement(Input, {
    id: "rollNo",
    placeholder: "e.g., 1000030101",
    value: newStudent.rollNo,
    onChange: e => handleNewStudentChange('rollNo', e.target.value),
    disabled: showEditStudent,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "name",
    className: "text-dark-primary"
  }, "Full Name ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "*")), /*#__PURE__*/React.createElement(Input, {
    id: "name",
    placeholder: "e.g., John Doe",
    value: newStudent.name,
    onChange: e => handleNewStudentChange('name', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "department",
    className: "text-dark-primary"
  }, "Department ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "*")), /*#__PURE__*/React.createElement(Select, {
    value: newStudent.department,
    onValueChange: value => handleNewStudentChange('department', value)
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select Department"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(SelectItem, {
    value: "Computer Science"
  }, "Computer Science"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Electronics"
  }, "Electronics"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Mechanical"
  }, "Mechanical"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Information Technology"
  }, "Information Technology"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Civil"
  }, "Civil")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "semester",
    className: "text-dark-primary"
  }, "Semester ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "*")), /*#__PURE__*/React.createElement(Input, {
    id: "semester",
    type: "number",
    min: "1",
    max: "8",
    placeholder: "1-8",
    value: newStudent.semester || '',
    onChange: e => handleNewStudentChange('semester', parseInt(e.target.value) || 1),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "cgpa",
    className: "text-dark-primary"
  }, "CGPA ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "*")), /*#__PURE__*/React.createElement(Input, {
    id: "cgpa",
    type: "number",
    step: "0.1",
    min: "0",
    max: "10",
    placeholder: "0.0 - 10.0",
    value: newStudent.cgpa || '',
    onChange: e => handleNewStudentChange('cgpa', parseFloat(e.target.value) || 0),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "password",
    className: "text-dark-primary"
  }, "Password (Optional)"), /*#__PURE__*/React.createElement(Input, {
    id: "password",
    placeholder: "Auto-generated if empty",
    value: newStudent.password,
    onChange: e => handleNewStudentChange('password', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }), newStudent.rollNo && !newStudent.password && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Will be: ", generatePassword(newStudent.rollNo)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email",
    className: "text-dark-primary"
  }, "Email (Optional)"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    placeholder: "Auto-generated if empty",
    value: newStudent.email,
    onChange: e => handleNewStudentChange('email', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }), newStudent.name && !newStudent.email && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Will be: ", generateEmail(newStudent.name))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 pt-4 border-t border-dark-color"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: showEditStudent ? handleUpdateStudent : handleAddStudent,
    className: "dark-button-primary w-full"
  }, /*#__PURE__*/React.createElement(Save, {
    className: "w-4 h-4 mr-2"
  }), showEditStudent ? 'Update Student' : 'Add Student')), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setShowAddStudent(false);
      setShowEditStudent(false);
    },
    className: "dark-button-secondary w-full"
  }, "Cancel")))))), /*#__PURE__*/React.createElement(AlertDialog, {
    open: showDeleteConfirm,
    onOpenChange: setShowDeleteConfirm
  }, /*#__PURE__*/React.createElement(AlertDialogContent, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(AlertDialogHeader, null, /*#__PURE__*/React.createElement(AlertDialogTitle, {
    className: "text-dark-primary"
  }, "Are you sure?"), /*#__PURE__*/React.createElement(AlertDialogDescription, {
    className: "text-dark-secondary"
  }, "This will permanently delete the student ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-dark-primary"
  }, studentToDelete?.name), " (Roll No: ", studentToDelete?.rollNo, "). This action cannot be undone.")), /*#__PURE__*/React.createElement(AlertDialogFooter, null, /*#__PURE__*/React.createElement(AlertDialogCancel, {
    className: "dark-button-secondary"
  }, "Cancel"), /*#__PURE__*/React.createElement(AlertDialogAction, {
    onClick: handleDeleteConfirm,
    className: "bg-red-600 hover:bg-red-700 text-white"
  }, "Delete")))), /*#__PURE__*/React.createElement(Dialog, {
    open: showProfile,
    onOpenChange: setShowProfile
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary text-2xl"
  }, "Student Profile"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed information about the student")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setShowProfile(false),
    className: "text-dark-secondary hover:text-dark-primary"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-4 h-4"
  })))), selectedStudent && /*#__PURE__*/React.createElement(motion.div, {
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
    className: "flex items-center space-x-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center",
    whileHover: {
      scale: 1.1,
      rotate: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-2xl font-bold"
  }, selectedStudent.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary"
  }, selectedStudent.name), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary"
  }, "Roll No: ", selectedStudent.rollNo), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 mt-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, selectedStudent.department), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, "Semester ", selectedStudent.semester), isCustomStudent(selectedStudent.rollNo) && /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  }, "Custom Added"), isEditedStudent(selectedStudent.rollNo) && /*#__PURE__*/React.createElement(Badge, {
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  }, "Edited")))), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "w-5 h-5 text-purple-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Current CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, selectedStudent.cgpa)))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-5 h-5 text-green-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Performance"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, getPerformanceRating(selectedStudent.cgpa))))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-blue-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, generateAttendancePercentage(selectedStudent.rollNo), "%")))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-orange-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Email"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-dark-primary"
  }, selectedStudent.email))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 pt-4 border-t border-dark-color"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary w-full",
    onClick: () => handleSendMail(selectedStudent)
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-4 h-4 mr-2"
  }), "Send Email")), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary w-full"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-4 h-4 mr-2"
  }), "Contact Parent"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary w-full",
    onClick: () => {
      setNewStudent(selectedStudent);
      setOriginalRollNo(selectedStudent.rollNo);
      setShowProfile(false);
      setShowEditStudent(true);
    }
  }, /*#__PURE__*/React.createElement(Edit2, {
    className: "w-4 h-4 mr-2"
  }), "Edit Profile")), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1",
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full border-red-500/30 text-red-400 hover:bg-red-500/10",
    onClick: () => {
      setStudentToDelete(selectedStudent);
      setShowProfile(false);
      setShowDeleteConfirm(true);
    }
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 mr-2"
  }), "Delete Student"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showHighPerformers,
    onOpenChange: setShowHighPerformers
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary text-2xl flex items-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 mr-2 text-green-400"
  }), "High Performers (CGPA \u2265 8.5)"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Students with outstanding academic performance")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "max-h-[500px]"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, highPerformersList.map((student, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: student.rollNo,
    variants: itemVariants,
    whileHover: {
      scale: 1.02,
      x: 5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, student.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-dark-primary"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, student.rollNo), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-1"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
  }, student.department), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs"
  }, "Sem ", student.semester)))), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-green-400"
  }, student.cgpa), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "CGPA"), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-1 bg-green-500/20 text-green-400 border-green-500/30 text-xs"
  }, getPerformanceRating(student.cgpa)))))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: showCGPAGraph,
    onOpenChange: setShowCGPAGraph
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary text-2xl flex items-center"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-6 h-6 mr-2 text-purple-400"
  }), "CGPA Distribution"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Visual representation of student performance across CGPA ranges")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: cgpaRanges
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#334155"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "range",
    stroke: "#94A3B8",
    tick: {
      fill: '#94A3B8'
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    tick: {
      fill: '#94A3B8'
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '8px',
      color: '#FFFFFF'
    },
    labelStyle: {
      color: '#94A3B8'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "count",
    fill: "#3B82F6",
    radius: [8, 8, 0, 0]
  }, cgpaRanges.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-4"
  }, cgpaRanges.map((range, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: range.range,
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: index * 0.1
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-hover border-dark-color"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "CGPA ", range.range), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-dark-primary"
  }, range.count)), /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full",
    style: {
      backgroundColor: range.color + '40'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 rounded-full m-2",
    style: {
      backgroundColor: range.color
    }
  }))))))))))));
}