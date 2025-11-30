import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { AlertTriangle, CheckCircle, XCircle, Wrench, TrendingUp, Eye, FileText, Shield, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const overallScore = 74;
const donutData = [{
  name: 'Passing',
  value: 23,
  color: '#10b981'
}, {
  name: 'Warnings',
  value: 5,
  color: '#f59e0b'
}, {
  name: 'Critical',
  value: 2,
  color: '#ef4444'
}];
const progressMetrics = [{
  name: "Content Quality",
  score: 85,
  color: "bg-mint-500"
}, {
  name: "Accessibility & Rendering",
  score: 72,
  color: "bg-blue-500"
}, {
  name: "Answer-friendly Formatting",
  score: 68,
  color: "bg-purple-500"
}, {
  name: "Structured Data & Semantics",
  score: 78,
  color: "bg-orange-500"
}, {
  name: "Discoverability & Crawlability",
  score: 82,
  color: "bg-green-500"
}];
const actionItems = [{
  id: 1,
  title: "Optimize heading structure for AI parsing",
  impact: "High",
  effort: "Medium",
  priority: 94,
  confidence: 89,
  affectedUrls: 23,
  tags: ["Technical SEO", "Content Structure"]
}, {
  id: 2,
  title: "Add schema markup for better content understanding",
  impact: "High",
  effort: "Low",
  priority: 87,
  confidence: 92,
  affectedUrls: 45,
  tags: ["Structured Data", "EEAT Signals"]
}, {
  id: 3,
  title: "Improve meta descriptions for AI snippet optimization",
  impact: "Medium",
  effort: "Low",
  priority: 76,
  confidence: 85,
  affectedUrls: 67,
  tags: ["Content Optimization"]
}, {
  id: 4,
  title: "Enhance internal linking structure",
  impact: "Medium",
  effort: "High",
  priority: 65,
  confidence: 78,
  affectedUrls: 89,
  tags: ["Technical SEO", "Navigation"]
}];
const technicalIssues = [{
  type: "Critical Issues",
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
export function OptimizePage() {
  const getImpactColor = impact => {
    switch (impact) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  const getEffortColor = effort => {
    switch (effort) {
      case "High":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Medium":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Low":
        return "bg-mint-50 text-mint-700 border-mint-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Optimize"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Improve your LLM visibility with actionable insights")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "gap-2 bg-mint-600 hover:bg-mint-700"
  }, /*#__PURE__*/React.createElement(Wrench, {
    className: "w-4 h-4"
  }), "Fix Issues"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "overview",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-3 mb-8 max-w-md"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "overview"
  }, "Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "actions"
  }, "Actions"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "technical"
  }, "Technical")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "overview",
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(CardTitle, null, "Overall Score"), /*#__PURE__*/React.createElement(CardDescription, null, "Current optimization status")), /*#__PURE__*/React.createElement(CardContent, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-48"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: donutData,
    cx: "50%",
    cy: "50%",
    innerRadius: 60,
    outerRadius: 90,
    paddingAngle: 2,
    dataKey: "value"
  }, donutData.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-gray-900"
  }, overallScore, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Score")))), /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-mint-600 hover:bg-mint-700"
  }, "Fix Issues"))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white h-full"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Optimization Areas"), /*#__PURE__*/React.createElement(CardDescription, null, "Performance breakdown by category")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, progressMetrics.map(metric => /*#__PURE__*/React.createElement("div", {
    key: metric.name,
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, metric.name), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, metric.score, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full ${metric.color} transition-all duration-300`,
    style: {
      width: `${metric.score}%`
    }
  }))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "actions",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6"
  }, actionItems.map(action => /*#__PURE__*/React.createElement(Card, {
    key: action.id,
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 mr-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-gray-900 mb-2"
  }, action.title), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: getImpactColor(action.impact)
  }, "Impact: ", action.impact), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: getEffortColor(action.effort)
  }, "Effort: ", action.effort))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, action.tags.map(tag => /*#__PURE__*/React.createElement(Badge, {
    key: tag,
    variant: "secondary",
    className: "text-xs"
  }, tag)))), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-gray-900 mb-1"
  }, action.priority), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500"
  }, "Priority Score"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center p-3 bg-gray-50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-semibold text-gray-900"
  }, action.confidence, "%"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500"
  }, "Confidence")), /*#__PURE__*/React.createElement("div", {
    className: "text-center p-3 bg-gray-50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-semibold text-gray-900"
  }, action.affectedUrls), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500"
  }, "Affected URLs")), /*#__PURE__*/React.createElement("div", {
    className: "text-center p-3 bg-gray-50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-semibold text-mint-600"
  }, "High"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500"
  }, "ROI Potential"))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full gap-2"
  }, "Show Implementation Details", /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4"
  }))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "technical",
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
  }, technicalIssues.map(issue => {
    const Icon = issue.icon;
    return /*#__PURE__*/React.createElement(Card, {
      key: issue.type,
      className: "rounded-xl border-0 shadow-sm bg-white"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "p-6 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-12 h-12 rounded-xl ${issue.bgColor} flex items-center justify-center mx-auto mb-3`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-6 h-6 ${issue.color}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-2xl font-bold text-gray-900 mb-1"
    }, issue.count), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500"
    }, issue.type)));
  }), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-2 border-dashed border-mint-200 bg-mint-50/30"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center mx-auto mb-3"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-6 h-6 text-mint-600"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-semibold text-mint-700 mb-1"
  }, "Unlock Full Insights"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-mint-600"
  }, "AI crawl insights")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Accordion, {
    type: "single",
    collapsible: true,
    className: "w-full space-y-4"
  }, /*#__PURE__*/React.createElement(AccordionItem, {
    value: "crawlability",
    className: "border rounded-xl bg-white shadow-sm px-6"
  }, /*#__PURE__*/React.createElement(AccordionTrigger, {
    className: "hover:no-underline py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Discoverability & Crawlability"), /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, "3 issues"))), /*#__PURE__*/React.createElement(AccordionContent, {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-red-50 rounded-lg border border-red-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement(XCircle, {
    className: "w-5 h-5 text-red-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-red-900"
  }, "Robots.txt blocking important pages"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-red-700 mt-1"
  }, "12 pages affected")))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 rounded-lg border border-yellow-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    className: "w-5 h-5 text-yellow-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-yellow-900"
  }, "Slow page load speeds"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-yellow-700 mt-1"
  }, "8 pages need optimization"))))))), /*#__PURE__*/React.createElement(AccordionItem, {
    value: "accessibility",
    className: "border rounded-xl bg-white shadow-sm px-6"
  }, /*#__PURE__*/React.createElement(AccordionTrigger, {
    className: "hover:no-underline py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Accessibility & Rendering"), /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, "1 issue"))), /*#__PURE__*/React.createElement(AccordionContent, {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 rounded-lg border border-yellow-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    className: "w-5 h-5 text-yellow-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-yellow-900"
  }, "Missing alt text on images"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-yellow-700 mt-1"
  }, "5 images need descriptions")))))), /*#__PURE__*/React.createElement(AccordionItem, {
    value: "content",
    className: "border rounded-xl bg-white shadow-sm px-6"
  }, /*#__PURE__*/React.createElement(AccordionTrigger, {
    className: "hover:no-underline py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-5 h-5 text-purple-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Content Quality"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "bg-green-50 text-green-700"
  }, "All Good"))), /*#__PURE__*/React.createElement(AccordionContent, {
    className: "pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-green-50 rounded-lg border border-green-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 text-green-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-green-900"
  }, "Content quality meets standards"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-green-700 mt-1"
  }, "All pages have good content structure"))))))))))));
}