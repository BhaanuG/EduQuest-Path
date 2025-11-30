import { TrendingUp, Target, BookOpen, Award, Calendar, Star, ArrowUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import * as React from "react";
import { useState } from "react";
// Function to generate personalized course progress based on student's department and CGPA
function getPersonalizedCourseProgress(user) {
  const performanceMultiplier = user.cgpa / 10; // Normalize CGPA to a 0-1 scale

  const departmentCourses = {
    "Computer Science": [{
      course: "Data Structures",
      completion: Math.min(100, Math.round(80 + performanceMultiplier * 20)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 4
    }, {
      course: "Database Systems",
      completion: Math.min(100, Math.round(85 + performanceMultiplier * 15)),
      grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+",
      credits: 4
    }, {
      course: "Computer Networks",
      completion: Math.min(100, Math.round(75 + performanceMultiplier * 25)),
      grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 4
    }, {
      course: "Software Engineering",
      completion: Math.min(100, Math.round(88 + performanceMultiplier * 12)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-",
      credits: 3
    }, {
      course: "Operating Systems",
      completion: Math.min(100, Math.round(78 + performanceMultiplier * 22)),
      grade: user.cgpa >= 8.7 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 3
    }],
    "Electronics": [{
      course: "Digital Signal Processing",
      completion: Math.min(100, Math.round(78 + performanceMultiplier * 22)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 4
    }, {
      course: "VLSI Design",
      completion: Math.min(100, Math.round(82 + performanceMultiplier * 18)),
      grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+",
      credits: 4
    }, {
      course: "Communication Systems",
      completion: Math.min(100, Math.round(85 + performanceMultiplier * 15)),
      grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 4
    }, {
      course: "Microprocessors",
      completion: Math.min(100, Math.round(80 + performanceMultiplier * 20)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-",
      credits: 3
    }, {
      course: "Analog Electronics",
      completion: Math.min(100, Math.round(76 + performanceMultiplier * 24)),
      grade: user.cgpa >= 8.6 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 3
    }],
    "Mechanical": [{
      course: "Thermodynamics",
      completion: Math.min(100, Math.round(76 + performanceMultiplier * 24)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 4
    }, {
      course: "Fluid Mechanics",
      completion: Math.min(100, Math.round(79 + performanceMultiplier * 21)),
      grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+",
      credits: 4
    }, {
      course: "Machine Design",
      completion: Math.min(100, Math.round(83 + performanceMultiplier * 17)),
      grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 4
    }, {
      course: "Manufacturing Processes",
      completion: Math.min(100, Math.round(81 + performanceMultiplier * 19)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-",
      credits: 3
    }, {
      course: "Heat Transfer",
      completion: Math.min(100, Math.round(74 + performanceMultiplier * 26)),
      grade: user.cgpa >= 8.4 ? "A" : user.cgpa >= 7.8 ? "B+" : "B",
      credits: 3
    }],
    "Information Technology": [{
      course: "Web Development",
      completion: Math.min(100, Math.round(87 + performanceMultiplier * 13)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 4
    }, {
      course: "Database Systems",
      completion: Math.min(100, Math.round(84 + performanceMultiplier * 16)),
      grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+",
      credits: 4
    }, {
      course: "Cybersecurity",
      completion: Math.min(100, Math.round(80 + performanceMultiplier * 20)),
      grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 4
    }, {
      course: "Cloud Computing",
      completion: Math.min(100, Math.round(86 + performanceMultiplier * 14)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-",
      credits: 3
    }, {
      course: "Mobile App Development",
      completion: Math.min(100, Math.round(82 + performanceMultiplier * 18)),
      grade: user.cgpa >= 8.7 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 3
    }],
    "Civil": [{
      course: "Structural Engineering",
      completion: Math.min(100, Math.round(77 + performanceMultiplier * 23)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "A-" : "B+",
      credits: 4
    }, {
      course: "Environmental Engineering",
      completion: Math.min(100, Math.round(74 + performanceMultiplier * 26)),
      grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+",
      credits: 4
    }, {
      course: "Geotechnical Engineering",
      completion: Math.min(100, Math.round(82 + performanceMultiplier * 18)),
      grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 4
    }, {
      course: "Construction Management",
      completion: Math.min(100, Math.round(79 + performanceMultiplier * 21)),
      grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-",
      credits: 3
    }, {
      course: "Transportation Engineering",
      completion: Math.min(100, Math.round(75 + performanceMultiplier * 25)),
      grade: user.cgpa >= 8.6 ? "A" : user.cgpa >= 8.0 ? "B+" : "B",
      credits: 3
    }]
  };
  return departmentCourses[user.department] || [];
}

// Function to generate personalized skill progress based on department and performance
function getPersonalizedSkillProgress(user) {
  const performanceBonus = Math.round((user.cgpa - 7.0) * 5); // Bonus based on CGPA above 7.0

  const departmentSkills = {
    "Computer Science": [{
      skill: "Programming",
      level: Math.min(100, 70 + performanceBonus + Math.random() * 10),
      category: "Technical"
    }, {
      skill: "Algorithm Design",
      level: Math.min(100, 65 + performanceBonus + Math.random() * 12),
      category: "Technical"
    }, {
      skill: "Problem Solving",
      level: Math.min(100, 72 + performanceBonus + Math.random() * 8),
      category: "Analytical"
    }, {
      skill: "Database Design",
      level: Math.min(100, 68 + performanceBonus + Math.random() * 15),
      category: "Technical"
    }, {
      skill: "Software Architecture",
      level: Math.min(100, 60 + performanceBonus + Math.random() * 18),
      category: "Technical"
    }, {
      skill: "Communication",
      level: Math.min(100, 65 + Math.random() * 15),
      category: "Soft Skills"
    }],
    "Electronics": [{
      skill: "Circuit Design",
      level: Math.min(100, 72 + performanceBonus + Math.random() * 10),
      category: "Technical"
    }, {
      skill: "Signal Processing",
      level: Math.min(100, 68 + performanceBonus + Math.random() * 12),
      category: "Technical"
    }, {
      skill: "System Analysis",
      level: Math.min(100, 70 + performanceBonus + Math.random() * 8),
      category: "Analytical"
    }, {
      skill: "Hardware Design",
      level: Math.min(100, 66 + performanceBonus + Math.random() * 15),
      category: "Technical"
    }, {
      skill: "Testing & Debugging",
      level: Math.min(100, 64 + performanceBonus + Math.random() * 16),
      category: "Technical"
    }, {
      skill: "Teamwork",
      level: Math.min(100, 70 + Math.random() * 15),
      category: "Soft Skills"
    }],
    "Mechanical": [{
      skill: "CAD Design",
      level: Math.min(100, 74 + performanceBonus + Math.random() * 10),
      category: "Technical"
    }, {
      skill: "Thermal Analysis",
      level: Math.min(100, 69 + performanceBonus + Math.random() * 12),
      category: "Technical"
    }, {
      skill: "Material Science",
      level: Math.min(100, 71 + performanceBonus + Math.random() * 8),
      category: "Analytical"
    }, {
      skill: "Manufacturing",
      level: Math.min(100, 67 + performanceBonus + Math.random() * 15),
      category: "Technical"
    }, {
      skill: "Project Management",
      level: Math.min(100, 63 + performanceBonus + Math.random() * 17),
      category: "Management"
    }, {
      skill: "Problem Solving",
      level: Math.min(100, 72 + Math.random() * 13),
      category: "Analytical"
    }],
    "Information Technology": [{
      skill: "Web Development",
      level: Math.min(100, 76 + performanceBonus + Math.random() * 10),
      category: "Technical"
    }, {
      skill: "Database Management",
      level: Math.min(100, 73 + performanceBonus + Math.random() * 12),
      category: "Technical"
    }, {
      skill: "Network Security",
      level: Math.min(100, 69 + performanceBonus + Math.random() * 8),
      category: "Technical"
    }, {
      skill: "Cloud Technologies",
      level: Math.min(100, 71 + performanceBonus + Math.random() * 15),
      category: "Technical"
    }, {
      skill: "System Administration",
      level: Math.min(100, 65 + performanceBonus + Math.random() * 16),
      category: "Technical"
    }, {
      skill: "Communication",
      level: Math.min(100, 68 + Math.random() * 15),
      category: "Soft Skills"
    }],
    "Civil": [{
      skill: "Structural Analysis",
      level: Math.min(100, 71 + performanceBonus + Math.random() * 10),
      category: "Technical"
    }, {
      skill: "Construction Planning",
      level: Math.min(100, 68 + performanceBonus + Math.random() * 12),
      category: "Technical"
    }, {
      skill: "Environmental Assessment",
      level: Math.min(100, 66 + performanceBonus + Math.random() * 8),
      category: "Analytical"
    }, {
      skill: "Project Management",
      level: Math.min(100, 64 + performanceBonus + Math.random() * 15),
      category: "Management"
    }, {
      skill: "Site Planning",
      level: Math.min(100, 69 + performanceBonus + Math.random() * 16),
      category: "Technical"
    }, {
      skill: "Leadership",
      level: Math.min(100, 62 + Math.random() * 18),
      category: "Soft Skills"
    }]
  };
  return departmentSkills[user.department] || [];
}
export function StudentProgressPage({
  user
}) {
  const [selectedDialog, setSelectedDialog] = useState(null);

  // Get personalized data for this student
  const courseProgress = getPersonalizedCourseProgress(user);
  const skillProgress = getPersonalizedSkillProgress(user);

  // Generate realistic semester progression based on current CGPA
  const generateSemesterProgress = (currentCgpa, currentSem) => {
    const progress = [];
    const variation = 0.3; // CGPA can vary by ±0.3 points

    for (let i = 1; i <= Math.max(6, currentSem); i++) {
      if (i < currentSem) {
        // Past semesters - generate realistic progression leading to current CGPA
        const variance = (Math.random() - 0.5) * variation;
        const semCgpa = Math.max(7.0, Math.min(10.0, currentCgpa + variance));
        progress.push({
          semester: `Sem ${i}`,
          cgpa: Math.round(semCgpa * 10) / 10,
          completed: true
        });
      } else if (i === currentSem) {
        // Current semester
        progress.push({
          semester: `Sem ${i}`,
          cgpa: currentCgpa,
          completed: false
        });
      } else {
        // Future semesters (if showing projections)
        progress.push({
          semester: `Sem ${i}`,
          cgpa: 0,
          completed: false
        });
      }
    }
    return progress;
  };
  const semesterProgress = generateSemesterProgress(user.cgpa, user.semester);

  // Personalized learning goals based on student performance
  const learningGoals = [{
    goal: user.cgpa >= 8.5 ? "Maintain CGPA above 9.0" : "Achieve CGPA above 8.5",
    current: user.cgpa,
    target: user.cgpa >= 8.5 ? 9.0 : 8.5,
    progress: user.cgpa >= 8.5 ? user.cgpa / 9.0 * 100 : user.cgpa / 8.5 * 100
  }, {
    goal: "Complete all assignments on time",
    current: user.cgpa >= 9.0 ? 98 : user.cgpa >= 8.5 ? 95 : user.cgpa >= 8.0 ? 92 : 88,
    target: 100,
    progress: user.cgpa >= 9.0 ? 98 : user.cgpa >= 8.5 ? 95 : user.cgpa >= 8.0 ? 92 : 88
  }, {
    goal: "Attend 90% of classes",
    current: user.cgpa >= 9.0 ? 96 : user.cgpa >= 8.5 ? 94 : user.cgpa >= 8.0 ? 91 : 88,
    target: 90,
    progress: Math.min(100, (user.cgpa >= 9.0 ? 96 : user.cgpa >= 8.5 ? 94 : user.cgpa >= 8.0 ? 91 : 88) / 90 * 100)
  }, {
    goal: `Complete ${user.semester >= 4 ? 3 : 2} projects this semester`,
    current: user.cgpa >= 8.5 ? user.semester >= 4 ? 2 : 1 : user.semester >= 4 ? 1 : 0,
    target: user.semester >= 4 ? 3 : 2,
    progress: user.cgpa >= 8.5 ? user.semester >= 4 ? 67 : 50 : user.semester >= 4 ? 33 : 0
  }];
  const overallProgress = courseProgress.length > 0 ? Math.round(courseProgress.reduce((sum, course) => sum + course.completion, 0) / courseProgress.length) : 0;
  const totalCredits = courseProgress.reduce((sum, course) => sum + course.credits, 0);
  const completedCredits = courseProgress.filter(course => course.completion === 100).reduce((sum, course) => sum + course.credits, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-dark-bg border-b border-dark-color px-8 py-8 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-slide-in-left"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-dark-primary"
  }, "Academic Progress"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary mt-2"
  }, "Track your learning journey and achievements")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 animate-scale-in"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 mr-2"
  }), overallProgress, "% Complete"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in",
    onClick: () => setSelectedDialog('current-cgpa')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Current CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-green-400"
  }, user.cgpa)), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 text-green-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Click for details \u2192")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in",
    style: {
      animationDelay: '0.1s'
    },
    onClick: () => setSelectedDialog('credits-completed')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Credits Completed"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-blue-400"
  }, completedCredits, "/", totalCredits)), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-6 h-6 text-blue-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Click for details \u2192")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in",
    style: {
      animationDelay: '0.2s'
    },
    onClick: () => setSelectedDialog('semester-progress')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Semester Progress"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-purple-400"
  }, overallProgress, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-6 h-6 text-purple-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Click for details \u2192")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in",
    style: {
      animationDelay: '0.3s'
    },
    onClick: () => setSelectedDialog('current-semester')
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mb-1"
  }, "Current Semester"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-orange-400"
  }, user.semester)), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-6 h-6 text-orange-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Click for details \u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color animate-slide-in-left hover-lift transition-all duration-300"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "CGPA Progression"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your academic performance over semesters")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: semesterProgress
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "semester",
    stroke: "#94A3B8"
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [7, 10],
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
    dataKey: "cgpa",
    stroke: "#3B82F6",
    strokeWidth: 3,
    dot: {
      fill: '#3B82F6',
      r: 6
    }
  }))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color animate-slide-in-right hover-lift transition-all duration-300"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary"
  }, "Current Courses"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Progress in ongoing courses")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, courseProgress.map((course, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "space-y-2 group/course animate-fade-in",
    style: {
      animationDelay: `${0.4 + index * 0.1}s`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-dark-primary group-hover/course:text-blue-400 transition-colors"
  }, course.course), /*#__PURE__*/React.createElement(Badge, {
    className: `text-xs ${course.grade.startsWith('A') ? 'bg-green-500/20 text-green-400' : course.grade.startsWith('B') ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`
  }, course.grade)), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-dark-secondary"
  }, course.completion, "%")), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Progress, {
    value: course.completion,
    className: "h-2 group-hover/course:h-3 transition-all"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs text-dark-secondary"
  }, /*#__PURE__*/React.createElement("span", null, course.credits, " credits"), /*#__PURE__*/React.createElement("span", {
    className: course.completion === 100 ? "text-green-400" : "text-orange-400"
  }, course.completion === 100 ? "Completed" : "In Progress"))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color animate-scale-in hover-lift transition-all duration-300"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-5 h-5 mr-2"
  }), "Learning Goals Progress"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Track your academic objectives")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, learningGoals.map((goal, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-4 bg-dark-hover rounded-lg space-y-3 hover:bg-dark-table-hover transition-all cursor-pointer hover-lift animate-slide-up",
    style: {
      animationDelay: `${0.6 + index * 0.1}s`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-medium text-dark-primary"
  }, goal.goal), /*#__PURE__*/React.createElement(Badge, {
    className: `${goal.progress >= 100 ? 'bg-green-500/20 text-green-400' : goal.progress >= 75 ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`
  }, Math.round(goal.progress), "%")), /*#__PURE__*/React.createElement(Progress, {
    value: goal.progress,
    className: "h-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm text-dark-secondary"
  }, /*#__PURE__*/React.createElement("span", null, "Current: ", goal.current), /*#__PURE__*/React.createElement("span", null, "Target: ", goal.target))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-dark-card border-dark-color animate-slide-up hover-lift transition-all duration-300"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-dark-primary flex items-center"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-5 h-5 mr-2"
  }), "Skills Development"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-dark-secondary"
  }, "Your skill progression across different areas")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, skillProgress.map((skill, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "space-y-3 group/skill animate-fade-in",
    style: {
      animationDelay: `${0.8 + index * 0.05}s`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-dark-primary group-hover/skill:text-purple-400 transition-colors"
  }, skill.skill), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, skill.category)), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-dark-primary"
  }, Math.round(skill.level), "%")), /*#__PURE__*/React.createElement(Progress, {
    value: skill.level,
    className: "h-2 group-hover/skill:h-3 transition-all"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary"
  }, skill.level >= 85 ? "Expert" : skill.level >= 70 ? "Proficient" : skill.level >= 50 ? "Intermediate" : "Beginner"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'current-cgpa',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl animate-scale-in"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-5 h-5 text-green-400"
  }), "Current CGPA Performance"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed breakdown of your academic performance")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "max-h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg text-center border border-green-500/20 hover-lift"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-dark-primary animate-bounce-in"
  }, user.cgpa), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Current Cumulative GPA"), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-3 bg-green-500/20 text-green-400"
  }, user.cgpa >= 9.0 ? 'Outstanding Performance' : user.cgpa >= 8.5 ? 'Excellent Performance' : user.cgpa >= 8.0 ? 'Very Good Performance' : 'Good Performance')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform"
  }, Math.max(...semesterProgress.filter(s => s.completed).map(s => s.cgpa)).toFixed(1)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Highest CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-400 mt-2"
  }, "Best semester")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform"
  }, user.cgpa), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Current CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-400 mt-2"
  }, "Overall average")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform"
  }, user.cgpa >= 9.5 ? '10.0' : user.cgpa >= 9.0 ? '9.5' : user.cgpa >= 8.5 ? '9.0' : '8.5'), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Target CGPA"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-purple-400 mt-2"
  }, "Next goal"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Semester-wise Performance"), semesterProgress.filter(s => s.completed).map((sem, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary group-hover:text-green-400 transition-colors"
  }, sem.semester), /*#__PURE__*/React.createElement(Badge, {
    className: sem.cgpa >= 9.0 ? 'bg-green-500/20 text-green-400' : sem.cgpa >= 8.5 ? 'bg-blue-500/20 text-blue-400' : sem.cgpa >= 8.0 ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-400'
  }, sem.cgpa, " CGPA")), /*#__PURE__*/React.createElement(Progress, {
    value: sem.cgpa / 10 * 100,
    className: "h-1 group-hover:h-2 transition-all"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Academic Standing"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Class Rank:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, "Top ", Math.round((10 - user.cgpa) * 10), "%")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Department:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, user.department)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Academic Status:"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-medium"
  }, "Good Standing")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'credits-completed',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl animate-scale-in"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-5 h-5 text-blue-400"
  }), "Credits Breakdown"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Detailed analysis of your credit completion")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "max-h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg text-center border border-blue-500/20 hover-lift"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-dark-primary animate-bounce-in"
  }, completedCredits), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Credits Completed out of ", totalCredits), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-3 bg-blue-500/20 text-blue-400"
  }, /*#__PURE__*/React.createElement(ArrowUp, {
    className: "w-3 h-3 mr-1"
  }), Math.round(completedCredits / totalCredits * 100), "% Progress")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-blue-400 group-hover:scale-110 transition-transform"
  }, completedCredits), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Completed Credits"), /*#__PURE__*/React.createElement(Progress, {
    value: completedCredits / totalCredits * 100,
    className: "h-1 mt-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-orange-400 group-hover:scale-110 transition-transform"
  }, totalCredits - completedCredits), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Remaining Credits"), /*#__PURE__*/React.createElement(Progress, {
    value: (totalCredits - completedCredits) / totalCredits * 100,
    className: "h-1 mt-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Course-wise Credits"), courseProgress.map((course, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium group-hover:text-blue-400 transition-colors"
  }, course.course), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, "Grade: ", course.grade)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-500/20 text-blue-400"
  }, course.credits, " credits"), course.completion === 100 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-400 mt-1 flex items-center gap-1 justify-end"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-3 h-3"
  }), "Completed"))), /*#__PURE__*/React.createElement(Progress, {
    value: course.completion,
    className: "h-1 group-hover:h-2 transition-all"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Credit Summary"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Total Credits This Semester:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, totalCredits)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Completed Credits:"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-medium"
  }, completedCredits)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "In Progress:"), /*#__PURE__*/React.createElement("span", {
    className: "text-orange-400 font-medium"
  }, totalCredits - completedCredits)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between pt-2 border-t border-dark-border"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Completion Rate:"), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 font-medium"
  }, Math.round(completedCredits / totalCredits * 100), "%")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'semester-progress',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl animate-scale-in"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-5 h-5 text-purple-400"
  }), "Semester Progress Analysis"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Overall progress tracking for current semester")), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "max-h-[500px] pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg text-center border border-purple-500/20 hover-lift"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-dark-primary animate-bounce-in"
  }, overallProgress, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary mt-2"
  }, "Overall Semester Progress"), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-3 bg-purple-500/20 text-purple-400"
  }, overallProgress >= 90 ? 'Excellent Progress' : overallProgress >= 75 ? 'Good Progress' : overallProgress >= 60 ? 'Moderate Progress' : 'Needs Attention')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform"
  }, Math.max(...courseProgress.map(c => c.completion)), "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Highest Progress")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform"
  }, overallProgress, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Average Progress")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform"
  }, Math.min(...courseProgress.map(c => c.completion)), "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Lowest Progress"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Course-wise Progress"), courseProgress.sort((a, b) => b.completion - a.completion).map((course, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium group-hover:text-purple-400 transition-colors"
  }, course.course), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, course.credits, " credits \u2022 ", course.grade)), /*#__PURE__*/React.createElement(Badge, {
    className: course.completion >= 90 ? 'bg-green-500/20 text-green-400' : course.completion >= 75 ? 'bg-blue-500/20 text-blue-400' : course.completion >= 60 ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
  }, course.completion, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: course.completion,
    className: "h-1 group-hover:h-2 transition-all"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Progress Milestones"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-5 h-5 text-green-400"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Courses Enrolled"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, courseProgress.length, " courses"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: `w-5 h-5 ${completedCredits > 0 ? 'text-green-400' : 'text-gray-400'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Credits Completed"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, completedCredits, " out of ", totalCredits))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: `w-5 h-5 ${overallProgress >= 50 ? 'text-green-400' : 'text-gray-400'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Midpoint Progress"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-dark-secondary"
  }, overallProgress >= 50 ? 'Achieved' : 'In progress'))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: selectedDialog === 'current-semester',
    onOpenChange: open => !open && setSelectedDialog(null)
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "bg-dark-card border-dark-color max-w-2xl animate-scale-in"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-dark-primary flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-orange-400"
  }), "Current Semester Details"), /*#__PURE__*/React.createElement(DialogDescription, {
    className: "text-dark-secondary"
  }, "Information about your current academic semester")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg text-center border border-orange-500/20 hover-lift"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-dark-primary animate-bounce-in"
  }, "Semester ", user.semester), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-dark-secondary mt-2"
  }, user.department), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-3 bg-orange-500/20 text-orange-400"
  }, user.semester <= 2 ? 'Foundation Year' : user.semester <= 4 ? 'Intermediate Level' : 'Advanced Level')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-orange-400 group-hover:scale-110 transition-transform"
  }, courseProgress.length), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Total Courses"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-400 mt-2"
  }, "This semester")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-blue-400 group-hover:scale-110 transition-transform"
  }, totalCredits), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-dark-secondary mt-1"
  }, "Total Credits"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-400 mt-2"
  }, "Academic load"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Semester Information"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Current Semester:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, "Semester ", user.semester)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Department:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, user.department)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Academic Year:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, "2024-2025")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Enrolled Courses:"), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-primary font-medium"
  }, courseProgress.length)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary"
  }, "Current CGPA:"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-medium"
  }, user.cgpa)))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-dark-hover rounded-lg"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-primary font-semibold mb-3"
  }, "Semester Timeline"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-green-400"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Started: August 2024"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-orange-400"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Current Progress: ", overallProgress, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-blue-400"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-primary"
  }, "Expected End: December 2024")))))))));
}