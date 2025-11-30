import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { User, Edit, Shield, Bell, Download, Eye, EyeOff, Award, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const notificationSettings = [{
  id: "assignments",
  label: "Assignment Submissions",
  description: "Get notified when students submit assignments",
  enabled: true
}, {
  id: "attendance",
  label: "Attendance Alerts",
  description: "Receive notifications about student attendance",
  enabled: true
}, {
  id: "announcements",
  label: "Administrative Announcements",
  description: "Important updates from administration",
  enabled: true
}, {
  id: "schedule",
  label: "Schedule Changes",
  description: "Notifications about class schedule modifications",
  enabled: false
}, {
  id: "events",
  label: "Campus Events",
  description: "Information about college events and activities",
  enabled: false
}];
const privacySettings = [{
  id: "profile",
  label: "Profile Visibility",
  description: "Allow students to see your profile details",
  enabled: true
}, {
  id: "status",
  label: "Online Status",
  description: "Show when you're available to students",
  enabled: false
}, {
  id: "contact",
  label: "Contact Information",
  description: "Allow students to see your contact details",
  enabled: true
}];

// Department-specific teaching history function
function getDepartmentTeachingHistory(user) {
  const departmentHistory = {
    "Computer Science": [{
      subject: "Advanced Data Structures",
      semester: "Spring 2024",
      students: 32,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "Algorithm Design & Analysis",
      semester: "Fall 2023",
      students: 28,
      avgGrade: "B+",
      type: "Core"
    }, {
      subject: "Database Management Systems",
      semester: "Spring 2023",
      students: 35,
      avgGrade: "A",
      type: "Core"
    }, {
      subject: "Software Engineering Principles",
      semester: "Fall 2022",
      students: 30,
      avgGrade: "A-",
      type: "Elective"
    }],
    "Electronics": [{
      subject: "Digital Signal Processing",
      semester: "Spring 2024",
      students: 24,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "VLSI Circuit Design",
      semester: "Fall 2023",
      students: 20,
      avgGrade: "B+",
      type: "Core"
    }, {
      subject: "Advanced Communication Systems",
      semester: "Spring 2023",
      students: 22,
      avgGrade: "A",
      type: "Core"
    }, {
      subject: "Microprocessor Applications",
      semester: "Fall 2022",
      students: 26,
      avgGrade: "B+",
      type: "Elective"
    }],
    "Mechanical": [{
      subject: "Advanced Thermodynamics",
      semester: "Spring 2024",
      students: 28,
      avgGrade: "B+",
      type: "Core"
    }, {
      subject: "Computational Fluid Dynamics",
      semester: "Fall 2023",
      students: 24,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "Advanced Machine Design",
      semester: "Spring 2023",
      students: 26,
      avgGrade: "A",
      type: "Core"
    }, {
      subject: "Manufacturing Automation",
      semester: "Fall 2022",
      students: 22,
      avgGrade: "B+",
      type: "Elective"
    }],
    "Information Technology": [{
      subject: "Advanced Web Technologies",
      semester: "Spring 2024",
      students: 30,
      avgGrade: "A",
      type: "Core"
    }, {
      subject: "Cybersecurity & Cryptography",
      semester: "Fall 2023",
      students: 25,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "Cloud Computing Architecture",
      semester: "Spring 2023",
      students: 28,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "Network Security",
      semester: "Fall 2022",
      students: 24,
      avgGrade: "B+",
      type: "Elective"
    }],
    "Civil": [{
      subject: "Advanced Structural Analysis",
      semester: "Spring 2024",
      students: 26,
      avgGrade: "A-",
      type: "Core"
    }, {
      subject: "Environmental Engineering Design",
      semester: "Fall 2023",
      students: 22,
      avgGrade: "A",
      type: "Core"
    }, {
      subject: "Geotechnical Engineering",
      semester: "Spring 2023",
      students: 24,
      avgGrade: "B+",
      type: "Core"
    }, {
      subject: "Project Management in Construction",
      semester: "Fall 2022",
      students: 20,
      avgGrade: "A-",
      type: "Elective"
    }]
  };
  return departmentHistory[user.department] || [];
}

// Personal account activity
function getPersonalAccountActivity(user) {
  const accountActivities = [{
    action: "Profile information updated",
    timestamp: "2024-01-15 09:45 AM",
    type: "profile",
    icon: "User"
  }, {
    action: "Password changed successfully",
    timestamp: "2024-01-10 03:20 PM",
    type: "security",
    icon: "Shield"
  }, {
    action: "Notification preferences modified",
    timestamp: "2024-01-08 11:15 AM",
    type: "settings",
    icon: "Bell"
  }, {
    action: "Office hours schedule updated",
    timestamp: "2024-01-05 02:30 PM",
    type: "profile",
    icon: "Calendar"
  }, {
    action: "Contact information verified",
    timestamp: "2024-01-03 10:00 AM",
    type: "profile",
    icon: "Mail"
  }, {
    action: "Privacy settings adjusted",
    timestamp: "2023-12-28 04:45 PM",
    type: "privacy",
    icon: "Eye"
  }, {
    action: "Account security scan completed",
    timestamp: "2023-12-25 01:15 PM",
    type: "security",
    icon: "Shield"
  }];
  return accountActivities;
}
export function TeacherMyAccountPage({
  user
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [privacy, setPrivacy] = useState(privacySettings);
  const teachingHistory = getDepartmentTeachingHistory(user);
  const accountActivity = getPersonalAccountActivity(user);
  const departmentContacts = {
    "Computer Science": {
      phone: "+91 98765 11001",
      address: "CS Faculty Block, Room 201",
      officeHours: "Mon-Wed-Fri, 10:00 AM - 12:00 PM"
    },
    "Electronics": {
      phone: "+91 98765 22002",
      address: "ECE Faculty Block, Room 305",
      officeHours: "Tue-Thu-Sat, 2:00 PM - 4:00 PM"
    },
    "Mechanical": {
      phone: "+91 98765 33003",
      address: "ME Faculty Block, Room 102",
      officeHours: "Mon-Thu, 1:00 PM - 3:00 PM"
    },
    "Information Technology": {
      phone: "+91 98765 44004",
      address: "IT Faculty Block, Room 401",
      officeHours: "Tue-Fri, 11:00 AM - 1:00 PM"
    },
    "Civil": {
      phone: "+91 98765 55005",
      address: "Civil Faculty Block, Room 203",
      officeHours: "Mon-Wed-Fri, 3:00 PM - 5:00 PM"
    }
  };
  const deptContact = departmentContacts[user.department] || departmentContacts["Computer Science"];
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: deptContact.phone,
    address: deptContact.address,
    officeHours: deptContact.officeHours,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const toggleNotification = id => {
    setNotifications(notifications.map(setting => setting.id === id ? {
      ...setting,
      enabled: !setting.enabled
    } : setting));
  };
  const togglePrivacy = id => {
    setPrivacy(privacy.map(setting => setting.id === id ? {
      ...setting,
      enabled: !setting.enabled
    } : setting));
  };
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const handleSaveProfile = () => {
    setIsEditing(false);
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
  }, "My Account"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Manage your profile and teaching preferences")), /*#__PURE__*/React.createElement(motion.div, {
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
  }, /*#__PURE__*/React.createElement(User, {
    className: "w-4 h-4 mr-2"
  }), "Faculty Member")))), /*#__PURE__*/React.createElement("main", {
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
    defaultValue: "profile",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "bg-dark-card border border-dark-color"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "profile",
    className: "data-[state=active]:bg-dark-hover"
  }, "Profile Information"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "teaching",
    className: "data-[state=active]:bg-dark-hover"
  }, "Teaching Profile"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "security",
    className: "data-[state=active]:bg-dark-hover"
  }, "Security & Privacy"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "notifications",
    className: "data-[state=active]:bg-dark-hover"
  }, "Notifications"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "activity",
    className: "data-[state=active]:bg-dark-hover"
  }, "Account Activity")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "profile",
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
  }, "Personal Information"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Update your personal details and contact information")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => isEditing ? handleSaveProfile() : setIsEditing(true),
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Edit, {
    className: "w-4 h-4 mr-2"
  }), isEditing ? 'Save Changes' : 'Edit Profile')))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center",
    whileHover: {
      scale: 1.1,
      rotate: 5
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-2xl"
  }, user.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "name",
    className: "text-dark-primary"
  }, "Full Name"), /*#__PURE__*/React.createElement(Input, {
    id: "name",
    value: formData.name,
    onChange: e => handleInputChange('name', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "teacherId",
    className: "text-dark-primary"
  }, "Teacher ID"), /*#__PURE__*/React.createElement(Input, {
    id: "teacherId",
    value: user.id,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "department",
    className: "text-dark-primary"
  }, "Department"), /*#__PURE__*/React.createElement(Input, {
    id: "department",
    value: user.department,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "designation",
    className: "text-dark-primary"
  }, "Designation"), /*#__PURE__*/React.createElement(Input, {
    id: "designation",
    value: user.designation,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Contact Information"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email",
    className: "text-dark-primary"
  }, "Email Address"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    value: formData.email,
    onChange: e => handleInputChange('email', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "phone",
    className: "text-dark-primary"
  }, "Phone Number"), /*#__PURE__*/React.createElement(Input, {
    id: "phone",
    value: formData.phone,
    onChange: e => handleInputChange('phone', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "address",
    className: "text-dark-primary"
  }, "Office Address"), /*#__PURE__*/React.createElement(Input, {
    id: "address",
    value: formData.address,
    onChange: e => handleInputChange('address', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "officeHours",
    className: "text-dark-primary"
  }, "Office Hours"), /*#__PURE__*/React.createElement(Input, {
    id: "officeHours",
    value: formData.officeHours,
    onChange: e => handleInputChange('officeHours', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Professional Information"), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Experience"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, user.experience, " years")), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Specialization"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, user.specialization)), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Department"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, user.department)))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "teaching",
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
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-5 h-5 mr-2"
  }), "Teaching History"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your past and current teaching assignments in ", user.department)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, teachingHistory.map((course, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: `w-10 h-10 rounded-full flex items-center justify-center ${course.type === 'Core' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`,
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: `w-5 h-5 ${course.type === 'Core' ? 'text-blue-400' : 'text-purple-400'}`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, course.subject), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, course.semester), /*#__PURE__*/React.createElement(Badge, {
    className: `text-xs ${course.type === 'Core' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`
  }, course.type)))), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Students"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-dark-primary"
  }, course.students)), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Performance"), /*#__PURE__*/React.createElement(Badge, {
    className: `${course.avgGrade.startsWith('A') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`
  }, course.avgGrade))))))))), /*#__PURE__*/React.createElement(motion.div, {
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
      delay: 0.2
    },
    whileHover: {
      scale: 1.01
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "text-center",
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3",
    whileHover: {
      rotate: 360
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-8 h-8 text-blue-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, teachingHistory.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Courses Taught")), /*#__PURE__*/React.createElement(motion.div, {
    className: "text-center",
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-8 h-8 text-green-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, teachingHistory.reduce((sum, course) => sum + course.students, 0)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Total Students")), /*#__PURE__*/React.createElement(motion.div, {
    className: "text-center",
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3",
    whileHover: {
      scale: 1.2
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-8 h-8 text-purple-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, "A-"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Avg Performance")))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "security",
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
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-5 h-5 mr-2"
  }), "Password & Security"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Manage your password and security settings")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "currentPassword",
    className: "text-dark-primary"
  }, "Current Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "currentPassword",
    type: showPassword ? "text" : "password",
    value: formData.currentPassword,
    onChange: e => handleInputChange('currentPassword', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary pr-10"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "ghost",
    size: "sm",
    className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
    onClick: () => setShowPassword(!showPassword)
  }, showPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    className: "h-4 w-4 text-dark-secondary"
  }) : /*#__PURE__*/React.createElement(Eye, {
    className: "h-4 w-4 text-dark-secondary"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "newPassword",
    className: "text-dark-primary"
  }, "New Password"), /*#__PURE__*/React.createElement(Input, {
    id: "newPassword",
    type: "password",
    value: formData.newPassword,
    onChange: e => handleInputChange('newPassword', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "confirmPassword",
    className: "text-dark-primary"
  }, "Confirm Password"), /*#__PURE__*/React.createElement(Input, {
    id: "confirmPassword",
    type: "password",
    value: formData.confirmPassword,
    onChange: e => handleInputChange('confirmPassword', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, "Update Password")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Privacy Settings"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Control what information students and colleagues can see")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, privacy.map((setting, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: setting.id,
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
      duration: 0.3,
      delay: index * 0.1
    },
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, setting.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, setting.description)), /*#__PURE__*/React.createElement(Switch, {
    checked: setting.enabled,
    onCheckedChange: () => togglePrivacy(setting.id)
  }))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "notifications",
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
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-5 h-5 mr-2"
  }), "Notification Preferences"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Choose what notifications you want to receive")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, notifications.map((setting, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: setting.id,
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
      duration: 0.3,
      delay: index * 0.1
    },
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, setting.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, setting.description)), /*#__PURE__*/React.createElement(Switch, {
    checked: setting.enabled,
    onCheckedChange: () => toggleNotification(setting.id)
  }))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "activity",
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
  }, "Personal Account Activity"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your recent profile and account management activities")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, accountActivity.map((activity, index) => {
    const getActivityIcon = type => {
      switch (type) {
        case 'profile':
          return User;
        case 'security':
          return Shield;
        case 'settings':
          return Bell;
        case 'privacy':
          return Eye;
        default:
          return User;
      }
    };
    const getActivityColor = type => {
      switch (type) {
        case 'profile':
          return 'bg-blue-500/20 text-blue-400';
        case 'security':
          return 'bg-red-500/20 text-red-400';
        case 'settings':
          return 'bg-yellow-500/20 text-yellow-400';
        case 'privacy':
          return 'bg-green-500/20 text-green-400';
        default:
          return 'bg-purple-500/20 text-purple-400';
      }
    };
    const getBadgeColor = type => {
      switch (type) {
        case 'profile':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'security':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'settings':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'privacy':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        default:
          return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      }
    };
    const IconComponent = getActivityIcon(activity.type);
    return /*#__PURE__*/React.createElement(motion.div, {
      key: index,
      className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg",
      variants: itemVariants,
      whileHover: {
        x: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/React.createElement(motion.div, {
      className: `w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`,
      whileHover: {
        rotate: 360
      },
      transition: {
        duration: 0.5
      }
    }, /*#__PURE__*/React.createElement(IconComponent, {
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-medium text-dark-primary"
    }, activity.action), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary"
    }, activity.timestamp))), /*#__PURE__*/React.createElement(Badge, {
      className: getBadgeColor(activity.type)
    }, activity.type.charAt(0).toUpperCase() + activity.type.slice(1)));
  })))), /*#__PURE__*/React.createElement(motion.div, {
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
      delay: 0.2
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Personal Data Export"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Download your personal profile and account data")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary w-full"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download Profile Data")), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-secondary w-full"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download Account History"))))))))))));
}