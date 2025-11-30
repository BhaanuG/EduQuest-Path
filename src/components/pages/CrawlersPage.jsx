import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bot, Activity, Globe, Clock } from "lucide-react";
const crawlActivityData = [{
  date: "Jan 17",
  Bytespider: 145,
  ClaudeBot: 89,
  GPTBot: 234,
  Other: 67
}, {
  date: "Jan 18",
  Bytespider: 167,
  ClaudeBot: 123,
  GPTBot: 289,
  Other: 78
}, {
  date: "Jan 19",
  Bytespider: 134,
  ClaudeBot: 98,
  GPTBot: 256,
  Other: 56
}, {
  date: "Jan 20",
  Bytespider: 189,
  ClaudeBot: 145,
  GPTBot: 312,
  Other: 89
}, {
  date: "Jan 21",
  Bytespider: 156,
  ClaudeBot: 134,
  GPTBot: 287,
  Other: 72
}, {
  date: "Jan 22",
  Bytespider: 178,
  ClaudeBot: 167,
  GPTBot: 345,
  Other: 94
}, {
  date: "Jan 23",
  Bytespider: 198,
  ClaudeBot: 189,
  GPTBot: 378,
  Other: 102
}];
const mostCrawledPages = [{
  page: "/products/analytics-platform",
  crawls: 1247
}, {
  page: "/solutions/enterprise",
  crawls: 892
}, {
  page: "/blog/ai-analytics-guide",
  crawls: 756
}, {
  page: "/pricing",
  crawls: 634
}, {
  page: "/about",
  crawls: 523
}, {
  page: "/docs/api-reference",
  crawls: 445
}];
const recentCrawls = [{
  crawler: "GPTBot",
  path: "/products/analytics-platform",
  timestamp: "2 minutes ago"
}, {
  crawler: "ClaudeBot",
  path: "/blog/latest-features",
  timestamp: "5 minutes ago"
}, {
  crawler: "Bytespider",
  path: "/solutions/enterprise",
  timestamp: "8 minutes ago"
}, {
  crawler: "GPTBot",
  path: "/pricing",
  timestamp: "12 minutes ago"
}, {
  crawler: "ClaudeBot",
  path: "/docs/getting-started",
  timestamp: "15 minutes ago"
}, {
  crawler: "GoogleOther",
  path: "/about",
  timestamp: "18 minutes ago"
}];
const getCrawlerColor = crawler => {
  switch (crawler) {
    case "GPTBot":
      return "bg-green-100 text-green-700";
    case "ClaudeBot":
      return "bg-purple-100 text-purple-700";
    case "Bytespider":
      return "bg-blue-100 text-blue-700";
    case "GoogleOther":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
export function CrawlersPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Crawlers"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Monitor AI bot activity on your site")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Activity, {
    className: "w-4 h-4"
  }), "Real-time Monitor"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white mb-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Bot, {
    className: "w-5 h-5 text-blue-600"
  }), "Crawl Activity Over Time"), /*#__PURE__*/React.createElement(CardDescription, null, "AI bot activity on your site over the last 7 days")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "h-80"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: crawlActivityData,
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
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "GPTBot",
    stackId: "a",
    fill: "#10b981",
    name: "GPTBot"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "ClaudeBot",
    stackId: "a",
    fill: "#8b5cf6",
    name: "ClaudeBot"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "Bytespider",
    stackId: "a",
    fill: "#3b82f6",
    name: "Bytespider"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "Other",
    stackId: "a",
    fill: "#6b7280",
    name: "Other Bots"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Globe, {
    className: "w-5 h-5 text-green-600"
  }), "Most Crawled Pages"), /*#__PURE__*/React.createElement(CardDescription, null, "Pages with highest bot activity")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Page"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-right"
  }, "Crawls"))), /*#__PURE__*/React.createElement(TableBody, null, mostCrawledPages.map((page, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "border-gray-100 hover:bg-gray-50/50"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
  }, page.page)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "font-medium"
  }, page.crawls.toLocaleString())))))))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-5 h-5 text-purple-600"
  }), "Recent Crawls"), /*#__PURE__*/React.createElement(CardDescription, null, "Latest bot activity on your site")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Crawler"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Path"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Time"))), /*#__PURE__*/React.createElement(TableBody, null, recentCrawls.map((crawl, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "border-gray-100 hover:bg-gray-50/50"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    className: getCrawlerColor(crawl.crawler)
  }, crawl.crawler)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700 truncate block max-w-xs"
  }, crawl.path)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, crawl.timestamp))))))))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-gradient-to-r from-gray-50 to-gray-100"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Bot, {
    className: "w-6 h-6 text-blue-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-gray-900 mb-1"
  }, "See all the AI crawlers that are on your site right now"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "Get real-time monitoring, detailed bot analytics, and crawl pattern insights"))), /*#__PURE__*/React.createElement(Button, {
    className: "bg-mint-600 hover:bg-mint-700 px-8"
  }, "Upgrade"))))));
}