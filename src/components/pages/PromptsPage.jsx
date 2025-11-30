import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { Plus, Search, Filter, MoreVertical, Play, Pause } from "lucide-react";
import { Input } from "../ui/input";
const promptsData = [{
  id: 1,
  text: "What are the best project management tools for remote teams in 2024?",
  status: true,
  visibility: 94,
  presence: 82,
  runCount: 1247,
  lastRun: "2 hours ago"
}, {
  id: 2,
  text: "How to implement AI chatbots for customer service automation?",
  status: true,
  visibility: 89,
  presence: 76,
  runCount: 892,
  lastRun: "4 hours ago"
}, {
  id: 3,
  text: "Best practices for digital marketing automation in 2024",
  status: false,
  visibility: 85,
  presence: 71,
  runCount: 756,
  lastRun: "1 day ago"
}, {
  id: 4,
  text: "Software development lifecycle management tools comparison",
  status: true,
  visibility: 82,
  presence: 68,
  runCount: 634,
  lastRun: "6 hours ago"
}, {
  id: 5,
  text: "Cloud infrastructure security best practices and tools",
  status: true,
  visibility: 78,
  presence: 64,
  runCount: 523,
  lastRun: "3 hours ago"
}, {
  id: 6,
  text: "Enterprise data analytics platforms for business intelligence",
  status: false,
  visibility: 74,
  presence: 59,
  runCount: 445,
  lastRun: "2 days ago"
}, {
  id: 7,
  text: "Mobile app development frameworks comparison 2024",
  status: true,
  visibility: 71,
  presence: 56,
  runCount: 387,
  lastRun: "8 hours ago"
}];
export function PromptsPage() {
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSelectAll = () => {
    if (selectedPrompts.length === promptsData.length) {
      setSelectedPrompts([]);
    } else {
      setSelectedPrompts(promptsData.map(p => p.id));
    }
  };
  const handleSelectPrompt = id => {
    setSelectedPrompts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };
  const filteredPrompts = promptsData.filter(prompt => prompt.text.toLowerCase().includes(searchQuery.toLowerCase()));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-white border-b border-gray-200 px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Prompts"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Manage and monitor your AI prompt performance")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "gap-2 bg-mint-600 hover:bg-mint-700"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4"
  }), "Add New Prompt"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-80"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search prompts...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4"
  }), "Filters")), selectedPrompts.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, selectedPrompts.length, " selected"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Bulk Enable"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Bulk Disable"))), /*#__PURE__*/React.createElement(Card, {
    className: "rounded-xl border-0 shadow-sm bg-white"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, "Active Prompts"), /*#__PURE__*/React.createElement(CardDescription, null, "Monitor performance and manage your prompt portfolio")), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "font-medium"
  }, filteredPrompts.length, " prompts"))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, {
    className: "border-gray-200"
  }, /*#__PURE__*/React.createElement(TableHead, {
    className: "w-12"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: selectedPrompts.length === promptsData.length,
    onCheckedChange: handleSelectAll
  })), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700"
  }, "Prompt Text"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 w-20"
  }, "Status"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 w-32"
  }, "Visibility"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 w-24"
  }, "Presence %"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 w-24"
  }, "Run Count"), /*#__PURE__*/React.createElement(TableHead, {
    className: "font-semibold text-gray-700 w-28"
  }, "Last Run"), /*#__PURE__*/React.createElement(TableHead, {
    className: "w-12"
  }))), /*#__PURE__*/React.createElement(TableBody, null, filteredPrompts.map(prompt => /*#__PURE__*/React.createElement(TableRow, {
    key: prompt.id,
    className: "border-gray-100 hover:bg-gray-50/50 transition-colors"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Checkbox, {
    checked: selectedPrompts.includes(prompt.id),
    onCheckedChange: () => handleSelectPrompt(prompt.id)
  })), /*#__PURE__*/React.createElement(TableCell, {
    className: "max-w-md"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-900 leading-relaxed"
  }, prompt.text)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: prompt.status,
    size: "sm"
  }), prompt.status ? /*#__PURE__*/React.createElement(Play, {
    className: "w-4 h-4 text-green-600"
  }) : /*#__PURE__*/React.createElement(Pause, {
    className: "w-4 h-4 text-gray-400"
  }))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Score"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, prompt.visibility, "/100")), /*#__PURE__*/React.createElement(Progress, {
    value: prompt.visibility,
    className: "h-2"
  }))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium text-gray-900"
  }, prompt.presence, "%")), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "font-medium"
  }, prompt.runCount.toLocaleString())), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-500"
  }, prompt.lastRun)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(MoreVertical, {
    className: "w-4 h-4"
  }))))))))))));
}