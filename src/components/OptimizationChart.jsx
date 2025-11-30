import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
export function OptimizationChart() {
  const score = 74;
  const issues = [{
    type: "Critical",
    count: 2,
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: XCircle
  }, {
    type: "Warnings",
    count: 5,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    icon: AlertTriangle
  }, {
    type: "Passing",
    count: 23,
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: CheckCircle
  }];
  return /*#__PURE__*/React.createElement(Card, {
    className: "border-0 shadow-sm"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Site Optimization Score"), /*#__PURE__*/React.createElement(CardDescription, null, "LLM visibility optimization status")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-32 h-32"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-32 h-32 transform -rotate-90"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "64",
    r: "56",
    stroke: "#e5e7eb",
    strokeWidth: "8",
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "64",
    r: "56",
    stroke: "#3b82f6",
    strokeWidth: "8",
    fill: "transparent",
    strokeDasharray: `${2 * Math.PI * 56}`,
    strokeDashoffset: `${2 * Math.PI * 56 * (1 - score / 100)}`,
    strokeLinecap: "round",
    className: "transition-all duration-1000 ease-out"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-bold text-gray-900"
  }, score, "%")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, issues.map(issue => {
    const Icon = issue.icon;
    return /*#__PURE__*/React.createElement("div", {
      key: issue.type,
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-8 h-8 rounded-lg ${issue.bgColor} flex items-center justify-center`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-4 h-4 ${issue.color}`
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium text-gray-700"
    }, issue.type)), /*#__PURE__*/React.createElement(Badge, {
      variant: "secondary",
      className: "text-xs"
    }, issue.count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-medium text-gray-900"
  }, "Highest Priority Action"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Optimize heading structure & main content tags")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "w-full"
  }, "View Actions", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-4 h-4 ml-2"
  }))))));
}