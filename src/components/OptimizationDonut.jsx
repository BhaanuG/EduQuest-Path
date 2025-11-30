import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const data = [{
  name: 'Passing',
  value: 23,
  color: '#10B981'
}, {
  name: 'Warnings',
  value: 5,
  color: '#F59E0B'
}, {
  name: 'Critical',
  value: 2,
  color: '#EF4444'
}];
const issues = [{
  type: "Critical",
  count: 2,
  color: "text-ai8-error",
  bgColor: "bg-ai8-error/10",
  icon: XCircle
}, {
  type: "Warnings",
  count: 5,
  color: "text-ai8-warning",
  bgColor: "bg-ai8-warning/10",
  icon: AlertTriangle
}, {
  type: "Passing",
  count: 23,
  color: "text-ai8-success",
  bgColor: "bg-ai8-success/10",
  icon: CheckCircle
}];
export function OptimizationDonut() {
  const score = 74;
  return /*#__PURE__*/React.createElement(Card, {
    className: "ai8-card border-0"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl font-bold text-ai8-navy"
  }, "Site Optimization Score"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-ai8-gray font-medium"
  }, "LLM visibility optimization status")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-48"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: data,
    cx: "50%",
    cy: "50%",
    innerRadius: 70,
    outerRadius: 95,
    paddingAngle: 3,
    dataKey: "value"
  }, data.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.08) 0px 8px 24px",
      fontWeight: 500
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-ai8-navy mb-1"
  }, score, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium text-ai8-gray"
  }, "Overall Score")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, issues.map(issue => {
    const Icon = issue.icon;
    return /*#__PURE__*/React.createElement("div", {
      key: issue.type,
      className: "flex items-center justify-between p-4 rounded-xl bg-ai8-light border border-gray-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-12 h-12 rounded-xl ${issue.bgColor} flex items-center justify-center`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-6 h-6 ${issue.color}`
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-semibold text-ai8-navy"
    }, issue.type)), /*#__PURE__*/React.createElement(Badge, {
      className: "bg-ai8-white text-ai8-navy border-gray-200 font-bold px-3 py-1"
    }, issue.count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-6 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-ai8-navy mb-2"
  }, "Highest Priority Action"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-ai8-gray font-medium"
  }, "Optimize heading structure & main content tags for better AI parsing")), /*#__PURE__*/React.createElement("button", {
    className: "ai8-button-secondary w-full gap-2 group"
  }, "View All Actions", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-4 h-4 group-hover:translate-x-1 transition-transform"
  }))))));
}