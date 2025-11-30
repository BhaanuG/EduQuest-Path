import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
const visibilityData = [{
  date: "Jan 18",
  visibility: 6.8,
  presence: 68
}, {
  date: "Jan 19",
  visibility: 7.2,
  presence: 71
}, {
  date: "Jan 20",
  visibility: 6.9,
  presence: 69
}, {
  date: "Jan 21",
  visibility: 7.8,
  presence: 73
}, {
  date: "Jan 22",
  visibility: 8.1,
  presence: 76
}, {
  date: "Jan 23",
  visibility: 8.4,
  presence: 74
}, {
  date: "Jan 24",
  visibility: 8.4,
  presence: 74
}];
const mentionsData = [{
  date: "Jan 18",
  mentions: 156,
  citations: 89
}, {
  date: "Jan 19",
  mentions: 203,
  citations: 112
}, {
  date: "Jan 20",
  mentions: 178,
  citations: 95
}, {
  date: "Jan 21",
  mentions: 234,
  citations: 134
}, {
  date: "Jan 22",
  mentions: 289,
  citations: 167
}, {
  date: "Jan 23",
  mentions: 312,
  citations: 189
}, {
  date: "Jan 24",
  mentions: 298,
  citations: 172
}];
export function MetricsChart() {
  return /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2"
  }, "Visibility & Presence Trends"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Track your brand's performance across AI models over the last 7 days")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "visibility",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-2 mb-8 bg-dark-tag border border-dark"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "visibility",
    className: "text-sm font-semibold data-[state=active]:bg-dark-cta data-[state=active]:text-white text-dark-secondary"
  }, "Visibility & Presence"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "mentions",
    className: "text-sm font-semibold data-[state=active]:bg-dark-cta data-[state=active]:text-white text-dark-secondary"
  }, "Mentions & Citations")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "visibility",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: visibilityData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 20
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: "#94A3B8",
    fontSize: 12,
    fontWeight: 500,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    fontSize: 12,
    fontWeight: 500,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "#1E293B",
      border: "1px solid #374151",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
      fontWeight: 500,
      color: "#FFFFFF"
    }
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "visibility",
    stroke: "#3B82F6",
    strokeWidth: 3,
    dot: {
      fill: "#3B82F6",
      strokeWidth: 0,
      r: 5
    },
    activeDot: {
      r: 7,
      stroke: "#3B82F6",
      strokeWidth: 2,
      fill: "#1E293B"
    },
    name: "Visibility Score"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "presence",
    stroke: "#22C55E",
    strokeWidth: 3,
    dot: {
      fill: "#22C55E",
      strokeWidth: 0,
      r: 5
    },
    activeDot: {
      r: 7,
      stroke: "#22C55E",
      strokeWidth: 2,
      fill: "#1E293B"
    },
    name: "Presence %"
  }))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "mentions",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: mentionsData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 20
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: "#94A3B8",
    fontSize: 12,
    fontWeight: 500,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    fontSize: 12,
    fontWeight: 500,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "#1E293B",
      border: "1px solid #374151",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
      fontWeight: 500,
      color: "#FFFFFF"
    }
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "mentions",
    stroke: "#3B82F6",
    strokeWidth: 3,
    dot: {
      fill: "#3B82F6",
      strokeWidth: 0,
      r: 5
    },
    activeDot: {
      r: 7,
      stroke: "#3B82F6",
      strokeWidth: 2,
      fill: "#1E293B"
    },
    name: "Total Mentions"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "citations",
    stroke: "#22C55E",
    strokeWidth: 3,
    dot: {
      fill: "#22C55E",
      strokeWidth: 0,
      r: 5
    },
    activeDot: {
      r: 7,
      stroke: "#22C55E",
      strokeWidth: 2,
      fill: "#1E293B"
    },
    name: "Citations"
  }))))))));
}