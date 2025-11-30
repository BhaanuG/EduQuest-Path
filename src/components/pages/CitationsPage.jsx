import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, ExternalLink, Unlock } from "lucide-react";
const citationsData = [{
  dr: 87,
  domain: "techcrunch.com",
  pa: 92,
  url: "/article/ai-tools-comparison-2024",
  sentiment: 85,
  visibility: 94,
  firstSeen: "2024-01-20"
}, {
  dr: 78,
  domain: "forbes.com",
  pa: 89,
  url: "/digital-transformation-leaders",
  sentiment: 78,
  visibility: 87,
  firstSeen: "2024-01-18"
}, {
  dr: 65,
  domain: "medium.com",
  pa: 72,
  url: "/productivity-tools-review",
  sentiment: 92,
  visibility: 76,
  firstSeen: "2024-01-22"
}, {
  dr: 82,
  domain: "wired.com",
  pa: 85,
  url: "/ai-business-automation",
  sentiment: 68,
  visibility: 89,
  firstSeen: "2024-01-19"
}, {
  dr: 59,
  domain: "businessinsider.com",
  pa: 76,
  url: "/startup-tools-guide",
  sentiment: 88,
  visibility: 72,
  firstSeen: "2024-01-21"
}, {
  dr: 74,
  domain: "venturebeat.com",
  pa: 79,
  url: "/enterprise-software-trends",
  sentiment: 75,
  visibility: 83,
  firstSeen: "2024-01-17"
}];
const CircularIndicator = ({
  value,
  type
}) => {
  const getColor = (val, indicatorType) => {
    if (indicatorType === 'sentiment') {
      if (val >= 80) return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        ring: 'stroke-green-500'
      };
      if (val >= 60) return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        ring: 'stroke-yellow-500'
      };
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        ring: 'stroke-red-500'
      };
    } else {
      if (val >= 80) return {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        ring: 'stroke-blue-500'
      };
      if (val >= 60) return {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        ring: 'stroke-purple-500'
      };
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        ring: 'stroke-gray-500'
      };
    }
  };
  const colors = getColor(value, type);
  const circumference = 2 * Math.PI * 12;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - value / 100 * circumference;
  return /*#__PURE__*/React.createElement("div", {
    className: "relative w-10 h-10"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-10 h-10 transform -rotate-90",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12",
    stroke: "#e5e7eb",
    strokeWidth: "3",
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12",
    className: colors.ring,
    strokeWidth: "3",
    fill: "transparent",
    strokeDasharray: strokeDasharray,
    strokeDashoffset: strokeDashoffset,
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 flex items-center justify-center ${colors.bg} rounded-full`
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-semibold ${colors.text}`
  }, value)));
};
export function CitationsPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Citations"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Track how AI models cite your content")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4"
  }), "Export Citations"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-md"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search citations...",
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4"
  }), "Filters")), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white mb-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Citations Overview"), /*#__PURE__*/React.createElement(CardDescription, null, "Domains and pages where AI models reference your brand")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "DR"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Domain"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "PA"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "URL"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-center"
  }, "Sentiment"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 text-center"
  }, "Visibility"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "First Seen"))), /*#__PURE__*/React.createElement(TableBody, null, citationsData.map((citation, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "border-gray-100 hover:bg-gray-50/50 transition-colors"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: `font-medium ${citation.dr >= 80 ? 'bg-green-100 text-green-700' : citation.dr >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`
  }, citation.dr)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium text-gray-600"
  }, citation.domain.charAt(0).toUpperCase())), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-900"
  }, citation.domain))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, citation.pa)), /*#__PURE__*/React.createElement(TableCell, {
    className: "max-w-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-blue-600 hover:text-blue-800 cursor-pointer truncate block"
  }, citation.url)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement(CircularIndicator, {
    value: citation.sentiment,
    type: "sentiment"
  }))), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement(CircularIndicator, {
    value: citation.visibility,
    type: "visibility"
  }))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, new Date(citation.firstSeen).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })))))))))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-gradient-to-r from-gray-50 to-gray-100"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Unlock, {
    className: "w-6 h-6 text-gray-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-gray-900 mb-1"
  }, "See all the citations that AI is using to speak about you"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "Get complete citation analytics, source tracking, and competitive intelligence"))), /*#__PURE__*/React.createElement(Button, {
    className: "bg-mint-600 hover:bg-mint-700 px-8"
  }, "Upgrade"))))));
}