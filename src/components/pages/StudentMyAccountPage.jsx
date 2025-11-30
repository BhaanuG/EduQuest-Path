import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { User, Calendar, Edit, Shield, Bell, Download, Eye, EyeOff, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const notificationSettings = [{
  id: "assignments",
  label: "Assignment Reminders",
  description: "Get notified about upcoming assignments",
  enabled: true
}, {
  id: "grades",
  label: "Grade Updates",
  description: "Receive notifications when grades are posted",
  enabled: true
}, {
  id: "announcements",
  label: "Class Announcements",
  description: "Important updates from your instructors",
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
  description: "Allow other students to see your profile",
  enabled: true
}, {
  id: "activity",
  label: "Activity Status",
  description: "Show when you're online to classmates",
  enabled: false
}, {
  id: "progress",
  label: "Progress Sharing",
  description: "Allow sharing of academic progress",
  enabled: true
}];
const recentActivity = [{
  action: "Logged in from Mobile App",
  timestamp: "2024-01-15 08:30 AM",
  location: "Mobile Device"
}, {
  action: "Downloaded course material",
  timestamp: "2024-01-14 03:45 PM",
  location: "Web Browser"
}, {
  action: "Submitted assignment",
  timestamp: "2024-01-14 11:20 AM",
  location: "Web Browser"
}, {
  action: "Updated profile information",
  timestamp: "2024-01-13 02:15 PM",
  location: "Web Browser"
}];
export function StudentMyAccountPage({
  user
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [privacy, setPrivacy] = useState(privacySettings);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 98765 43210",
    address: "123 Student Hostel, Campus Area",
    emergencyContact: "+91 98765 43211",
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
    // Save logic here
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
  }, "Manage your profile and account settings")), /*#__PURE__*/React.createElement(motion.div, {
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
    className: "bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(User, {
    className: "w-4 h-4 mr-2"
  }), "Active Student")))), /*#__PURE__*/React.createElement("main", {
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
    value: "profile",
    className: "data-[state=active]:bg-dark-hover"
  }, "Profile Information"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "security",
    className: "data-[state=active]:bg-dark-hover"
  }, "Security & Privacy"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "notifications",
    className: "data-[state=active]:bg-dark-hover"
  }, "Notifications"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "activity",
    className: "data-[state=active]:bg-dark-hover"
  }, "Account Activity"))), /*#__PURE__*/React.createElement(TabsContent, {
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
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Personal Information"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Update your personal details and contact information")), /*#__PURE__*/React.createElement(motion.div, {
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
    onClick: () => isEditing ? handleSaveProfile() : setIsEditing(true),
    className: "dark-button-primary"
  }, isEditing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Save, {
    className: "w-4 h-4 mr-2"
  }), "Save Changes") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Edit, {
    className: "w-4 h-4 mr-2"
  }), "Edit Profile"))))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-start space-x-6",
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
      delay: 0.3
    }
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center",
    whileHover: {
      scale: 1.1,
      rotate: 5
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-2xl"
  }, user.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1 space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "name",
    className: "text-dark-primary"
  }, "Full Name"), /*#__PURE__*/React.createElement(Input, {
    id: "name",
    value: formData.name,
    onChange: e => handleInputChange('name', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "rollNo",
    className: "text-dark-primary"
  }, "Roll Number"), /*#__PURE__*/React.createElement(Input, {
    id: "rollNo",
    value: user.rollNo,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "department",
    className: "text-dark-primary"
  }, "Department"), /*#__PURE__*/React.createElement(Input, {
    id: "department",
    value: user.department,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "semester",
    className: "text-dark-primary"
  }, "Current Semester"), /*#__PURE__*/React.createElement(Input, {
    id: "semester",
    value: user.semester,
    disabled: true,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))))), /*#__PURE__*/React.createElement(motion.div, {
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
      duration: 0.5,
      delay: 0.5
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Contact Information"), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email",
    className: "text-dark-primary"
  }, "Email Address"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    value: formData.email,
    onChange: e => handleInputChange('email', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "phone",
    className: "text-dark-primary"
  }, "Phone Number"), /*#__PURE__*/React.createElement(Input, {
    id: "phone",
    value: formData.phone,
    onChange: e => handleInputChange('phone', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "address",
    className: "text-dark-primary"
  }, "Address"), /*#__PURE__*/React.createElement(Input, {
    id: "address",
    value: formData.address,
    onChange: e => handleInputChange('address', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "emergency",
    className: "text-dark-primary"
  }, "Emergency Contact"), /*#__PURE__*/React.createElement(Input, {
    id: "emergency",
    value: formData.emergencyContact,
    onChange: e => handleInputChange('emergencyContact', e.target.value),
    disabled: !isEditing,
    className: "bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement(motion.div, {
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
      duration: 0.5,
      delay: 0.6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary"
  }, "Academic Information"), /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Current CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, user.cgpa)), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Semester"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-dark-primary"
  }, user.semester)), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-4 bg-dark-hover rounded-lg",
    variants: itemVariants,
    whileHover: {
      scale: 1.05,
      y: -5
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Department"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-dark-primary"
  }, user.department)))))))), /*#__PURE__*/React.createElement(TabsContent, {
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
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(motion.div, {
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
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-5 h-5 mr-2"
  }), "Password & Security"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Manage your password and security settings"))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
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
  }, /*#__PURE__*/React.createElement(motion.div, {
    animate: {
      rotate: showPassword ? 180 : 0
    },
    transition: {
      duration: 0.3
    }
  }, showPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    className: "h-4 w-4 text-dark-secondary"
  }) : /*#__PURE__*/React.createElement(Eye, {
    className: "h-4 w-4 text-dark-secondary"
  }))))), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "newPassword",
    className: "text-dark-primary"
  }, "New Password"), /*#__PURE__*/React.createElement(Input, {
    id: "newPassword",
    type: "password",
    value: formData.newPassword,
    onChange: e => handleInputChange('newPassword', e.target.value),
    className: "bg-dark-bg border-dark-color text-dark-primary"
  })), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants
  }, /*#__PURE__*/React.createElement(Label, {
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
  }, "Update Password"))))), /*#__PURE__*/React.createElement(motion.div, {
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
  }, "Privacy Settings"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Control what information others can see")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, privacy.map((setting, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: setting.id,
    variants: itemVariants,
    whileHover: {
      x: 5
    },
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, setting.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, setting.description)), /*#__PURE__*/React.createElement(motion.div, {
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: setting.enabled,
    onCheckedChange: () => togglePrivacy(setting.id)
  }))))))))), /*#__PURE__*/React.createElement(TabsContent, {
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
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(motion.div, {
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
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-5 h-5 mr-2"
  }), "Notification Preferences"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Choose what notifications you want to receive"))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, notifications.map((setting, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: setting.id,
    variants: itemVariants,
    whileHover: {
      x: 5
    },
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, setting.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, setting.description)), /*#__PURE__*/React.createElement(motion.div, {
    whileTap: {
      scale: 0.95
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: setting.enabled,
    onCheckedChange: () => toggleNotification(setting.id)
  }))))))))), /*#__PURE__*/React.createElement(TabsContent, {
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
  }, "Recent Activity"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your recent account activity and login history")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "space-y-4",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, recentActivity.map((activity, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    variants: itemVariants,
    whileHover: {
      x: 5,
      scale: 1.02
    },
    className: "flex items-center justify-between p-4 bg-dark-hover rounded-lg"
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
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-blue-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary"
  }, activity.action), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, activity.timestamp))), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, activity.location))))))), /*#__PURE__*/React.createElement(motion.div, {
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
  }, "Data Export"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Download your account data and academic records")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
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
    className: "dark-button-secondary w-full"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download Profile Data")), /*#__PURE__*/React.createElement(motion.div, {
    variants: itemVariants,
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
  }), "Download Academic Records")))))))))));
}