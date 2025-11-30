import * as React from "react";
import { useState } from "react";
import { Plus, Users, Search, Hash, Lock, Send, Smile, Paperclip } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "motion/react";
// Function to generate department-specific chat groups
function getDepartmentGroups(user) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const departmentGroups = {
    "Computer Science": [{
      id: rollNoSeed + 1,
      name: "CS - Semester " + user.semester,
      members: 42,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 2,
      name: "Data Structures Study Group",
      members: 15,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 3,
      name: "Database Project Team",
      members: 5,
      icon: Lock,
      isPrivate: true
    }, {
      id: rollNoSeed + 4,
      name: "Algorithms Discussion",
      members: 28,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 5,
      name: "Placement Prep - CS",
      members: 38,
      icon: Hash,
      isPrivate: false
    }],
    "Electronics": [{
      id: rollNoSeed + 1,
      name: "ECE - Semester " + user.semester,
      members: 38,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 2,
      name: "DSP Lab Group",
      members: 12,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 3,
      name: "VLSI Project Team",
      members: 4,
      icon: Lock,
      isPrivate: true
    }, {
      id: rollNoSeed + 4,
      name: "Circuit Design Discussion",
      members: 25,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 5,
      name: "Electronics Club",
      members: 45,
      icon: Hash,
      isPrivate: false
    }],
    "Mechanical": [{
      id: rollNoSeed + 1,
      name: "Mech - Semester " + user.semester,
      members: 40,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 2,
      name: "Thermodynamics Study",
      members: 18,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 3,
      name: "Machine Design Project",
      members: 5,
      icon: Lock,
      isPrivate: true
    }, {
      id: rollNoSeed + 4,
      name: "CAD Software Help",
      members: 30,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 5,
      name: "Automotive Engineering",
      members: 22,
      icon: Hash,
      isPrivate: false
    }],
    "Information Technology": [{
      id: rollNoSeed + 1,
      name: "IT - Semester " + user.semester,
      members: 45,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 2,
      name: "Web Dev Study Group",
      members: 20,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 3,
      name: "Cybersecurity Team",
      members: 6,
      icon: Lock,
      isPrivate: true
    }, {
      id: rollNoSeed + 4,
      name: "Cloud Computing Forum",
      members: 32,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 5,
      name: "Full Stack Development",
      members: 28,
      icon: Hash,
      isPrivate: false
    }],
    "Civil": [{
      id: rollNoSeed + 1,
      name: "Civil - Semester " + user.semester,
      members: 36,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 2,
      name: "Structural Analysis Group",
      members: 16,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 3,
      name: "Construction Project Team",
      members: 5,
      icon: Lock,
      isPrivate: true
    }, {
      id: rollNoSeed + 4,
      name: "Surveying Practical",
      members: 24,
      icon: Hash,
      isPrivate: false
    }, {
      id: rollNoSeed + 5,
      name: "Civil Engineering Society",
      members: 40,
      icon: Hash,
      isPrivate: false
    }]
  };
  return departmentGroups[user.department] || [];
}
export function StudentGroupChatPage({
  user
}) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([{
    id: 1,
    sender: "Rajesh Kumar",
    message: "Hey everyone! Ready for tomorrow's presentation?",
    time: "10:30 AM",
    isCurrentUser: false
  }, {
    id: 2,
    sender: user.name,
    message: "Yes, I've finished my slides. Anyone need help?",
    time: "10:32 AM",
    isCurrentUser: true
  }, {
    id: 3,
    sender: "Priya Sharma",
    message: "Can someone share the project guidelines again?",
    time: "10:35 AM",
    isCurrentUser: false
  }]);

  // Get personalized groups for this student
  const chatGroups = getDepartmentGroups(user);
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      const newMsg = {
        id: messages.length + 1,
        sender: user.name,
        message: newMessage.trim(),
        time: currentTime,
        isCurrentUser: true
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };
  const filteredGroups = chatGroups.filter(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()));
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
  }, "Group Chat"), /*#__PURE__*/React.createElement(motion.p, {
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
  }, "Connect and collaborate with your classmates - ", user.department)), /*#__PURE__*/React.createElement(motion.div, {
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
  }, /*#__PURE__*/React.createElement(Button, {
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Create Group")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-hidden flex"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "w-80 bg-dark-card border-r border-dark-color flex flex-col",
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-dark-color"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search groups...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    className: "pl-10 bg-dark-bg border-dark-color text-dark-primary"
  }))), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-dark-secondary uppercase"
  }, "Your Groups")), filteredGroups.map((group, index) => {
    const Icon = group.icon;
    return /*#__PURE__*/React.createElement(motion.div, {
      key: group.id,
      initial: {
        opacity: 0,
        x: -20
      },
      animate: {
        opacity: 1,
        x: 0
      },
      transition: {
        delay: 0.6 + index * 0.05,
        duration: 0.4
      },
      whileHover: {
        scale: 1.02,
        x: 5
      },
      onClick: () => setSelectedGroup(group),
      className: `p-4 rounded-lg cursor-pointer transition-colors ${selectedGroup?.id === group.id ? 'bg-dark-hover border border-dark-cta' : 'hover:bg-dark-hover'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-5 h-5 text-white"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-medium text-dark-primary truncate"
    }, group.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-xs text-dark-secondary"
    }, /*#__PURE__*/React.createElement(Users, {
      className: "w-3 h-3"
    }), /*#__PURE__*/React.createElement("span", null, group.members, " members"), group.isPrivate && /*#__PURE__*/React.createElement(Badge, {
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs px-1"
    }, "Private")))));
  })))), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1 bg-dark-bg flex flex-col",
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.6,
      duration: 0.5
    }
  }, selectedGroup ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(motion.div, {
    className: "p-6 border-b border-dark-color bg-dark-card",
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
  }, selectedGroup.icon === Hash ? /*#__PURE__*/React.createElement(Hash, {
    className: "w-6 h-6 text-white"
  }) : /*#__PURE__*/React.createElement(Lock, {
    className: "w-6 h-6 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-dark-primary"
  }, selectedGroup.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, selectedGroup.members, " members \u2022 ", selectedGroup.isPrivate ? 'Private' : 'Public'))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "border-dark-color text-dark-secondary hover:bg-dark-hover"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 mr-2"
  }), "Members"))), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "flex-1 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, messages.map((msg, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: msg.id,
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: index * 0.05,
      duration: 0.3
    },
    className: `flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `max-w-[70%] ${msg.isCurrentUser ? 'order-2' : 'order-1'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center space-x-2 mb-1 ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-dark-secondary"
  }, msg.sender), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-dark-secondary"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-dark-secondary"
  }, msg.time)), /*#__PURE__*/React.createElement(motion.div, {
    whileHover: {
      scale: 1.02
    },
    className: `p-3 rounded-lg ${msg.isCurrentUser ? 'bg-blue-600 text-white' : 'bg-dark-card text-dark-primary'}`
  }, msg.message)))))), /*#__PURE__*/React.createElement(motion.div, {
    className: "p-6 border-t border-dark-color bg-dark-card",
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "border-dark-color text-dark-secondary hover:bg-dark-hover"
  }, /*#__PURE__*/React.createElement(Paperclip, {
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "border-dark-color text-dark-secondary hover:bg-dark-hover"
  }, /*#__PURE__*/React.createElement(Smile, {
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Type your message...",
    value: newMessage,
    onChange: e => setNewMessage(e.target.value),
    onKeyPress: e => e.key === 'Enter' && handleSendMessage(),
    className: "flex-1 bg-dark-bg border-dark-color text-dark-primary"
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSendMessage,
    className: "dark-button-primary"
  }, /*#__PURE__*/React.createElement(Send, {
    className: "w-4 h-4"
  }))))) : /*#__PURE__*/React.createElement(motion.div, {
    className: "flex-1 flex items-center justify-center",
    initial: {
      opacity: 0,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: 0.7,
      duration: 0.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 bg-dark-card rounded-2xl flex items-center justify-center mx-auto mb-6"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-10 h-10 text-dark-secondary"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-dark-primary mb-2"
  }, "Select a Group"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary max-w-sm"
  }, "Choose a group from the sidebar to start collaborating with your classmates"))))));
}