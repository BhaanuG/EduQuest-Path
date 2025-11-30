import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Heart, TrendingUp, Star, AlertCircle } from "lucide-react";
const sentimentOverTimeData = [{
  date: "Jun 17",
  positive: 68,
  neutral: 25,
  negative: 7
}, {
  date: "Jun 18",
  positive: 72,
  neutral: 22,
  negative: 6
}, {
  date: "Jun 19",
  positive: 75,
  neutral: 20,
  negative: 5
}, {
  date: "Jun 20",
  positive: 78,
  neutral: 18,
  negative: 4
}, {
  date: "Jun 21",
  positive: 74,
  neutral: 21,
  negative: 5
}, {
  date: "Jun 22",
  positive: 79,
  neutral: 17,
  negative: 4
}, {
  date: "Jun 23",
  positive: 82,
  neutral: 15,
  negative: 3
}];
const sentimentByCategoryData = [{
  category: "Trust",
  score: 85
}, {
  category: "Innovation",
  score: 92
}, {
  category: "Value",
  score: 78
}, {
  category: "Quality",
  score: 88
}, {
  category: "Support",
  score: 76
}, {
  category: "Reliability",
  score: 90
}];
const topSentiments = ["Transparency", "Problem resolution", "Innovation leadership", "Customer support", "Product quality", "Market expertise"];
const lowestSentiments = ["Overall quality", "Super shoe range", "Pricing concerns", "Documentation gaps"];
export function SentimentPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-dark-bg border-b border-dark-color px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-dark-primary"
  }, "Sentiment"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary mt-1"
  }, "Monitor brand sentiment across AI responses")), /*#__PURE__*/React.createElement("button", {
    className: "dark-button-secondary gap-2 flex items-center"
  }, /*#__PURE__*/React.createElement(Heart, {
    className: "w-4 h-4"
  }), "Download Report"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 bg-dark-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2"
  }, "Sentiment Over Time"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Nike brand sentiment June 17-23")), /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: sentimentOverTimeData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: "#94A3B8",
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#94A3B8",
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "#1E293B",
      border: "1px solid #374151",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
      color: "#FFFFFF"
    }
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "positive",
    stackId: "1",
    stroke: "#22C55E",
    fill: "#22C55E",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "neutral",
    stackId: "1",
    stroke: "#F59E0B",
    fill: "#F59E0B",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "negative",
    stackId: "1",
    stroke: "#EF4444",
    fill: "#EF4444",
    fillOpacity: 0.8
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2"
  }, "Sentiment by Category"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Performance across different brand attributes")), /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(RadarChart, {
    data: sentimentByCategoryData
  }, /*#__PURE__*/React.createElement(PolarGrid, {
    stroke: "#374151"
  }), /*#__PURE__*/React.createElement(PolarAngleAxis, {
    dataKey: "category",
    tick: {
      fontSize: 12,
      fill: '#94A3B8'
    },
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(PolarRadiusAxis, {
    angle: 90,
    domain: [0, 100],
    tick: {
      fontSize: 10,
      fill: '#94A3B8'
    },
    tickCount: 6
  }), /*#__PURE__*/React.createElement(Radar, {
    name: "Sentiment Score",
    dataKey: "score",
    stroke: "#3B82F6",
    fill: "#3B82F6",
    fillOpacity: 0.2,
    strokeWidth: 2,
    dot: {
      r: 4,
      fill: "#3B82F6"
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-5 h-5 text-green-400"
  }), "Top Sentiments"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Most positive mentions and associations")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, topSentiments.map((sentiment, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-500 transition-colors"
  }, sentiment)))), /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 text-red-400"
  }), "Lowest Sentiments"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Areas needing attention and improvement")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, lowestSentiments.map((sentiment, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "px-4 py-2 rounded-full text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors"
  }, sentiment))))), /*#__PURE__*/React.createElement("div", {
    className: "dark-card bg-gradient-to-r from-dark-card to-dark-tag"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-dark-cta flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-dark-primary mb-1"
  }, "Unlock Advanced Sentiment Analytics"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-dark-secondary"
  }, "Get detailed sentiment breakdown, competitor comparisons, and actionable insights"))), /*#__PURE__*/React.createElement("button", {
    className: "dark-button-primary px-8"
  }, "Upgrade"))))));
}