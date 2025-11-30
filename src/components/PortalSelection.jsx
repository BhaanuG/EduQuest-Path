import React from "react";
import { GraduationCap, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
export function PortalSelection({
  onPortalSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex items-center justify-center p-6 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 relative overflow-hidden animate-bounce-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-4xl relative z-10"
  }, "EQ"))), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold text-white mb-4 animate-slide-up"
  }, "EduQuest Path"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-slate-300 animate-slide-up",
    style: {
      animationDelay: '0.2s'
    }
  }, "Learning Management Platform")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer group",
    onClick: () => onPortalSelect("student")
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "text-center p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "w-10 h-10 text-white"
  })), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl text-white"
  }, "Student Portal"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-slate-300 mt-2"
  }, "Access your courses, assignments, grades, and connect with classmates")), /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8 pt-0"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
  }, "Continue as Student"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group hover-lift animate-slide-in-right",
    onClick: () => onPortalSelect("teacher")
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "text-center p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-10 h-10 text-white"
  })), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl text-white"
  }, "Teacher Portal"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-slate-300 mt-2"
  }, "Manage students, track progress, create assignments, and view analytics")), /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8 pt-0"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
  }, "Continue as Teacher")))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400"
  }, "Need help? Contact support at", " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:support@eduquestpath.com",
    className: "text-cyan-400 hover:text-cyan-300 hover:underline"
  }, "support@eduquestpath.com")))));
}