import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import { PortalSelection } from "./components/PortalSelection";
import { StudentLogin } from "./components/StudentLogin.jsx";
import { TeacherLogin } from "./components/TeacherLogin.jsx";
import { StudentDashboard } from "./components/StudentDashboard.jsx";
import { TeacherDashboard } from "./components/TeacherDashboard.jsx";
import { findStudentByRollNo } from "./components/StudentData";
import { findTeacherById } from "./components/TeacherData.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleStudentLogin = (student) => {
    setCurrentUser(student);
  };

  const handleTeacherLogin = (teacher) => {
    setCurrentUser(teacher);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  function PageRoute({ onLogout }) {
    const { id, page } = useParams();
    // Try student and teacher (pure lookup, no state changes)
    const student = findStudentByRollNo(id);
    const teacher = findTeacherById(id);

    // Intentionally do not modify App state here to avoid setState-in-render warnings.
    // Enforce a simple route guard: only allow access if the currentUser matches the id.
    if (student) {
      if (!currentUser || currentUser.rollNo !== student.rollNo) {
        // Not signed in as this student → redirect to student login (remember requested URL)
        const intended = `/${id}${page ? '/' + page : ''}`;
        return /*#__PURE__*/React.createElement(Navigate, { to: "/student-login", state: { from: intended } });
      }
    }
    if (teacher) {
      if (!currentUser || currentUser.id !== teacher.id) {
        // Not signed in as this teacher → redirect to teacher login (remember requested URL)
        const intended = `/${id}${page ? '/' + page : ''}`;
        return /*#__PURE__*/React.createElement(Navigate, { to: "/teacher-login", state: { from: intended } });
      }
    }

    if (student) {
      return /*#__PURE__*/React.createElement(StudentDashboard, {
        user: student,
        onLogout,
        initialPage: page || "dashboard"
      });
    }

    if (teacher) {
      return /*#__PURE__*/React.createElement(TeacherDashboard, {
        user: teacher,
        onLogout,
        initialPage: page || "dashboard"
      });
    }

    // If not found, redirect to portal selection using declarative navigation
    return /*#__PURE__*/React.createElement(Navigate, { to: "/" });
  }

  return /*#__PURE__*/React.createElement(Routes, null,
    /*#__PURE__*/React.createElement(Route, { path: "/", element: /*#__PURE__*/React.createElement(PortalSelection, { onPortalSelect: (portal) => {
          if (portal === "student") navigate('/student-login'); else navigate('/teacher-login');
        } }) }),
    /*#__PURE__*/React.createElement(Route, { path: "/student-login", element: /*#__PURE__*/React.createElement(StudentLogin, { onLogin: (s) => { handleStudentLogin(s); }, onBack: () => navigate('/') }) }),
    /*#__PURE__*/React.createElement(Route, { path: "/teacher-login", element: /*#__PURE__*/React.createElement(TeacherLogin, { onLogin: (t) => { handleTeacherLogin(t); }, onBack: () => navigate('/') }) }),
    /*#__PURE__*/React.createElement(Route, { path: "/:id", element: /*#__PURE__*/React.createElement(PageRoute, { onLogout: handleLogout }) }),
    /*#__PURE__*/React.createElement(Route, { path: "/:id/:page", element: /*#__PURE__*/React.createElement(PageRoute, { onLogout: handleLogout }) })
  );
}