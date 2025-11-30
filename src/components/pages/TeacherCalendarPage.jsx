import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, FileText, Award, AlertCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
// Function to generate important dates for teachers
function getTeacherImportantDates(user) {
  if (!user || !user.id) return [];
  const teacherIdSeed = parseInt(user.id.slice(-2));
  const baseDate = new Date();
  const subject = user.specialization || user.department;
  return [{
    id: teacherIdSeed + 1,
    title: `${subject} - Midterm Examination`,
    date: new Date(baseDate.getTime() + (7 + teacherIdSeed % 4) * 24 * 60 * 60 * 1000),
    time: "10:00 AM - 1:00 PM",
    location: "Examination Hall",
    type: "exam",
    description: "Conduct midterm examination for all sections",
    attendees: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : 40
  }, {
    id: teacherIdSeed + 2,
    title: "Faculty Meeting - Department Review",
    date: new Date(baseDate.getTime() + (3 + teacherIdSeed % 2) * 24 * 60 * 60 * 1000),
    time: "2:00 PM - 4:00 PM",
    location: "Conference Room",
    type: "meeting",
    description: "Monthly department review meeting",
    attendees: 10
  }, {
    id: teacherIdSeed + 3,
    title: "Project Presentation Evaluations",
    date: new Date(baseDate.getTime() + (10 + teacherIdSeed % 5) * 24 * 60 * 60 * 1000),
    time: "9:00 AM - 5:00 PM",
    location: "Seminar Hall",
    type: "evaluation",
    description: "Student project presentations and grading",
    attendees: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : 40
  }, {
    id: teacherIdSeed + 4,
    title: `${subject} Assignment Deadline`,
    date: new Date(baseDate.getTime() + (5 + teacherIdSeed % 3) * 24 * 60 * 60 * 1000),
    time: "11:59 PM",
    location: "Online Portal",
    type: "deadline",
    description: "Lab assignment submission deadline",
    attendees: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : 40
  }, {
    id: teacherIdSeed + 5,
    title: "Guest Lecture Coordination",
    date: new Date(baseDate.getTime() + (12 + teacherIdSeed % 6) * 24 * 60 * 60 * 1000),
    time: "11:00 AM - 12:30 PM",
    location: "Auditorium",
    type: "lecture",
    description: "Industry expert guest lecture session",
    attendees: 80
  }, {
    id: teacherIdSeed + 6,
    title: "Curriculum Planning Workshop",
    date: new Date(baseDate.getTime() + (15 + teacherIdSeed % 7) * 24 * 60 * 60 * 1000),
    time: "10:00 AM - 4:00 PM",
    location: "Training Center",
    type: "workshop",
    description: "Annual curriculum review and planning",
    attendees: 15
  }, {
    id: teacherIdSeed + 7,
    title: "Lab Equipment Maintenance",
    date: new Date(baseDate.getTime() + (4 + teacherIdSeed % 2) * 24 * 60 * 60 * 1000),
    time: "2:00 PM - 5:00 PM",
    location: `${subject} Lab`,
    type: "maintenance",
    description: "Scheduled equipment maintenance and calibration",
    attendees: 3
  }, {
    id: teacherIdSeed + 8,
    title: "Student Mentoring Sessions",
    date: new Date(baseDate.getTime() + (2 + teacherIdSeed % 2) * 24 * 60 * 60 * 1000),
    time: "3:00 PM - 5:00 PM",
    location: "Faculty Office",
    type: "mentoring",
    description: "One-on-one student counseling sessions",
    attendees: 8
  }, {
    id: teacherIdSeed + 9,
    title: "Research Paper Review Meeting",
    date: new Date(baseDate.getTime() + (18 + teacherIdSeed % 8) * 24 * 60 * 60 * 1000),
    time: "11:00 AM - 1:00 PM",
    location: "Research Lab",
    type: "meeting",
    description: "Review student research proposals",
    attendees: 12
  }, {
    id: teacherIdSeed + 10,
    title: "Final Examination",
    date: new Date(baseDate.getTime() + (25 + teacherIdSeed % 10) * 24 * 60 * 60 * 1000),
    time: "9:00 AM - 12:00 PM",
    location: "Examination Hall",
    type: "exam",
    description: "End semester final examination",
    attendees: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : 40
  }].sort((a, b) => a.date.getTime() - b.date.getTime());
}
export function TeacherCalendarPage({
  user
}) {
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get important dates for this teacher
  const importantDates = getTeacherImportantDates(user);

  // Get events for selected date
  const getEventsForDate = selectedDate => {
    if (!selectedDate) return [];
    return importantDates.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };
  const eventsOnSelectedDate = getEventsForDate(date);

  // Check if a date has events
  const hasEvents = checkDate => {
    return importantDates.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === checkDate.toDateString();
    });
  };
  const getEventTypeColor = type => {
    switch (type) {
      case 'exam':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'deadline':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'evaluation':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'lecture':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'meeting':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'workshop':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'maintenance':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'mentoring':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  const getEventIcon = type => {
    switch (type) {
      case 'exam':
        return FileText;
      case 'deadline':
        return AlertCircle;
      case 'evaluation':
        return Award;
      case 'lecture':
        return BookOpen;
      case 'meeting':
        return Users;
      case 'workshop':
        return BookOpen;
      case 'maintenance':
        return AlertCircle;
      case 'mentoring':
        return Users;
      default:
        return CalendarIcon;
    }
  };
  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getDaysUntil = eventDate => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
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
  }, "Academic Calendar"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Your teaching schedule and important dates - ", user.subject)), /*#__PURE__*/React.createElement(motion.div, {
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
      duration: 0.5,
      delay: 0.2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2"
  }, /*#__PURE__*/React.createElement(CalendarIcon, {
    className: "w-4 h-4 mr-2"
  }), importantDates.filter(d => d.date > new Date()).length, " Upcoming")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1"
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
      delay: 0.3
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Calendar"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Select a date to view events")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Calendar, {
    mode: "single",
    selected: date,
    onSelect: setDate,
    className: "rounded-md border border-dark-color",
    modifiers: {
      hasEvent: day => hasEvents(day)
    },
    modifiersClassNames: {
      hasEvent: "bg-blue-500/20 text-blue-400 font-bold rounded-full"
    }
  }), /*#__PURE__*/React.createElement(AnimatePresence, null, eventsOnSelectedDate.length > 0 && /*#__PURE__*/React.createElement(motion.div, {
    className: "mt-4 p-3 bg-dark-hover rounded-lg border border-dark-cta",
    initial: {
      opacity: 0,
      height: 0
    },
    animate: {
      opacity: 1,
      height: 'auto'
    },
    exit: {
      opacity: 0,
      height: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-dark-primary mb-2"
  }, eventsOnSelectedDate.length, " event", eventsOnSelectedDate.length > 1 ? 's' : '', " on ", date?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })), eventsOnSelectedDate.map(event => /*#__PURE__*/React.createElement("div", {
    key: event.id,
    className: "text-xs text-dark-secondary mt-1"
  }, "\u2022 ", event.title))))))), /*#__PURE__*/React.createElement(motion.div, {
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
      delay: 0.4
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color mt-6"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Event Summary")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 text-red-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Exams")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-red-500/20 text-red-400 border-red-500/30"
  }, importantDates.filter(d => d.type === 'exam').length)), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Meetings")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  }, importantDates.filter(d => d.type === 'meeting').length)), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4 text-purple-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Evaluations")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  }, importantDates.filter(d => d.type === 'evaluation').length)), /*#__PURE__*/React.createElement(motion.div, {
    className: "flex items-center justify-between",
    whileHover: {
      x: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-blue-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Lectures")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }, importantDates.filter(d => d.type === 'lecture' || d.type === 'workshop').length)))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-6"
  }, /*#__PURE__*/React.createElement(motion.div, {
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
      delay: 0.3
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Upcoming Events"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your scheduled activities and important dates")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, importantDates.map((event, index) => {
    const Icon = getEventIcon(event.type);
    const isUpcoming = event.date > new Date();
    return /*#__PURE__*/React.createElement(motion.div, {
      key: event.id,
      onClick: () => setSelectedEvent(event),
      className: `p-6 rounded-lg border transition-all cursor-pointer ${selectedEvent?.id === event.id ? 'bg-dark-hover border-dark-cta' : isUpcoming ? 'bg-dark-hover border-dark-color hover:border-dark-cta/50' : 'bg-dark-card border-dark-color opacity-60'}`,
      variants: itemVariants,
      whileHover: {
        scale: 1.02,
        x: 5
      },
      whileTap: {
        scale: 0.98
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start space-x-3 flex-1"
    }, /*#__PURE__*/React.createElement(motion.div, {
      className: `w-10 h-10 rounded-lg ${getEventTypeColor(event.type).replace('text-', 'bg-').replace('/20', '/10')} flex items-center justify-center flex-shrink-0`,
      whileHover: {
        rotate: 360
      },
      transition: {
        duration: 0.5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-5 h-5 ${getEventTypeColor(event.type).split(' ')[1]}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-semibold text-dark-primary mb-1"
    }, event.title), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-dark-secondary mb-2"
    }, event.description), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center gap-4 text-sm text-dark-secondary"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(CalendarIcon, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, formatDate(event.date))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(Clock, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, event.time)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(MapPin, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, event.location)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(Users, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, event.attendees, " attendees"))))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-end space-y-2"
    }, /*#__PURE__*/React.createElement(Badge, {
      className: getEventTypeColor(event.type)
    }, event.type.charAt(0).toUpperCase() + event.type.slice(1)), /*#__PURE__*/React.createElement(Badge, {
      className: `${getDaysUntil(event.date) === 'Today' || getDaysUntil(event.date) === 'Tomorrow' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`
    }, getDaysUntil(event.date)))), /*#__PURE__*/React.createElement(AnimatePresence, null, selectedEvent?.id === event.id && /*#__PURE__*/React.createElement(motion.div, {
      className: "mt-4 pt-4 border-t border-dark-color flex space-x-2",
      initial: {
        opacity: 0,
        height: 0
      },
      animate: {
        opacity: 1,
        height: 'auto'
      },
      exit: {
        opacity: 0,
        height: 0
      }
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
    }, "View Details")), /*#__PURE__*/React.createElement(motion.div, {
      whileHover: {
        scale: 1.05
      },
      whileTap: {
        scale: 0.95
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      className: "border-dark-color text-dark-secondary hover:bg-dark-hover"
    }, "Set Reminder")))));
  })))))))));
}