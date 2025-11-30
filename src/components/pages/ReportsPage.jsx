import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Download, Eye, Calendar, Filter } from "lucide-react";
const reportData = [{
  date: "2024-01-24",
  visibility: 84,
  presence: 74,
  mentions: 298,
  rank: 2.1
}, {
  date: "2024-01-23",
  visibility: 86,
  presence: 72,
  mentions: 312,
  rank: 2.3
}, {
  date: "2024-01-22",
  visibility: 81,
  presence: 76,
  mentions: 289,
  rank: 2.0
}, {
  date: "2024-01-21",
  visibility: 78,
  presence: 73,
  mentions: 234,
  rank: 2.4
}, {
  date: "2024-01-20",
  visibility: 75,
  presence: 69,
  mentions: 178,
  rank: 2.7
}, {
  date: "2024-01-19",
  visibility: 72,
  presence: 71,
  mentions: 203,
  rank: 2.5
}, {
  date: "2024-01-18",
  visibility: 68,
  presence: 68,
  mentions: 156,
  rank: 2.9
}];
export function ReportsPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Export and analyze your LLM visibility data")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4"
  }), "Filters"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "gap-2 bg-mint-600 hover:bg-mint-700"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4"
  }), "Export Report")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-gray-900 mb-1"
  }, "7"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Days Analyzed"))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-mint-600 mb-1"
  }, "1,970"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Total Mentions"))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-blue-600 mb-1"
  }, "77%"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Avg Visibility"))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-purple-600 mb-1"
  }, "71%"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, "Avg Presence")))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Daily Performance Report"), /*#__PURE__*/React.createElement(CardDescription, null, "Detailed daily metrics for LLM visibility and presence tracking")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Date"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Visibility %"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Presence %"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Mentions"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Avg Rank"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Action"))), /*#__PURE__*/React.createElement(TableBody, null, reportData.map((row, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: row.date,
    className: "border-gray-100 hover:bg-gray-50/50 transition-colors"
  }, /*#__PURE__*/React.createElement(TableCell, {
    className: "font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-gray-400"
  }), /*#__PURE__*/React.createElement("span", null, new Date(row.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-2 bg-gray-200 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-blue-500 transition-all duration-300",
    style: {
      width: `${row.visibility}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, row.visibility, "%"))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-2 bg-gray-200 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-mint-500 transition-all duration-300",
    style: {
      width: `${row.presence}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, row.presence, "%"))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "font-medium"
  }, row.mentions)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("span", {
    className: `font-medium ${row.rank <= 2.5 ? 'text-green-600' : 'text-amber-600'}`
  }, row.rank)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-4 h-4"
  }), "View"))))))))));
}