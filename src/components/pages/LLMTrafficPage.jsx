import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap, BarChart3, Globe, TrendingUp } from "lucide-react";
const llmTrafficData = [{
  date: "Jan 17",
  ChatGPT: 234,
  Claude: 89,
  Gemini: 145,
  Perplexity: 67,
  Other: 34
}, {
  date: "Jan 18",
  ChatGPT: 289,
  Claude: 123,
  Gemini: 167,
  Perplexity: 78,
  Other: 45
}, {
  date: "Jan 19",
  ChatGPT: 256,
  Claude: 98,
  Gemini: 134,
  Perplexity: 56,
  Other: 28
}, {
  date: "Jan 20",
  ChatGPT: 312,
  Claude: 145,
  Gemini: 189,
  Perplexity: 89,
  Other: 52
}, {
  date: "Jan 21",
  ChatGPT: 287,
  Claude: 134,
  Gemini: 156,
  Perplexity: 72,
  Other: 38
}, {
  date: "Jan 22",
  ChatGPT: 345,
  Claude: 167,
  Gemini: 178,
  Perplexity: 94,
  Other: 47
}, {
  date: "Jan 23",
  ChatGPT: 378,
  Claude: 189,
  Gemini: 198,
  Perplexity: 102,
  Other: 56
}];
const topLLMsData = [{
  llm: "ChatGPT",
  sessions: 2103,
  change: "+23%"
}, {
  llm: "Claude",
  sessions: 1245,
  change: "+18%"
}, {
  llm: "Gemini",
  sessions: 1167,
  change: "+15%"
}, {
  llm: "Perplexity",
  sessions: 558,
  change: "+12%"
}, {
  llm: "Other",
  sessions: 296,
  change: "+8%"
}];
const mostVisitedPages = [{
  page: "/products/analytics-platform",
  sessions: 892
}, {
  page: "/solutions/enterprise",
  sessions: 756
}, {
  page: "/blog/ai-analytics-guide",
  sessions: 634
}, {
  page: "/pricing",
  sessions: 523
}, {
  page: "/docs/api-reference",
  sessions: 445
}, {
  page: "/about",
  sessions: 298
}];
const getLLMColor = llm => {
  switch (llm) {
    case "ChatGPT":
      return "bg-green-100 text-green-700";
    case "Claude":
      return "bg-purple-100 text-purple-700";
    case "Gemini":
      return "bg-blue-100 text-blue-700";
    case "Perplexity":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
export function LLMTrafficPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "LLM Traffic"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Analyze traffic from AI language models")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-4 h-4"
  }), "Traffic Report"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white mb-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-5 h-5 text-purple-600"
  }), "LLM Traffic Over Time"), /*#__PURE__*/React.createElement(CardDescription, null, "Referral traffic from different AI language models")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: llmTrafficData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#f1f5f9"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: "#64748b",
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#64748b",
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    }
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "ChatGPT",
    stackId: "1",
    stroke: "#10b981",
    fill: "#10b981",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "Claude",
    stackId: "1",
    stroke: "#8b5cf6",
    fill: "#8b5cf6",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "Gemini",
    stackId: "1",
    stroke: "#3b82f6",
    fill: "#3b82f6",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "Perplexity",
    stackId: "1",
    stroke: "#f59e0b",
    fill: "#f59e0b",
    fillOpacity: 0.8
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "Other",
    stackId: "1",
    stroke: "#6b7280",
    fill: "#6b7280",
    fillOpacity: 0.8
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-5 h-5 text-blue-600"
  }), "Top LLMs"), /*#__PURE__*/React.createElement(CardDescription, null, "Leading AI models driving traffic")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "LLM"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-right"
  }, "Sessions"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-right"
  }, "Change"))), /*#__PURE__*/React.createElement(TableBody, null, topLLMsData.map((llm, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "border-gray-100 hover:bg-gray-50/50"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: getLLMColor(llm.llm)
  }, llm.llm))), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-900"
  }, llm.sessions.toLocaleString())), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "bg-green-50 text-green-700"
  }, llm.change)))))))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Globe, {
    className: "w-5 h-5 text-green-600"
  }), "Most Visited Pages"), /*#__PURE__*/React.createElement(CardDescription, null, "Pages with highest LLM traffic")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Page"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-right"
  }, "Sessions"))), /*#__PURE__*/React.createElement(TableBody, null, mostVisitedPages.map((page, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "border-gray-100 hover:bg-gray-50/50"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
  }, page.page)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "font-medium"
  }, page.sessions.toLocaleString()))))))))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-gradient-to-r from-mint-50 to-mint-100"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 text-mint-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-mint-900 mb-1"
  }, "AI is driving traffic to your site"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-mint-700"
  }, "Unlock detailed traffic attribution, conversion tracking, and AI referral insights"))), /*#__PURE__*/React.createElement(Button, {
    className: "bg-mint-600 hover:bg-mint-700 px-8"
  }, "Upgrade"))))));
}