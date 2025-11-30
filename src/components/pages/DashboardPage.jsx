import { Eye, Target, Trophy, MessageSquare, Download, TrendingUp } from "lucide-react";
import { MetricsChart } from "../MetricsChart";
import { OptimizationDonut } from "../OptimizationDonut";
import { ModelPerformanceGrid } from "../ModelPerformanceGrid";
import { TopPerformingPrompts } from "../TopPerformingPrompts";
import { CompetitorRanking } from "../CompetitorRanking";
const metrics = [{
  title: "Visibility Score",
  value: "8.4",
  change: "+12.5%",
  icon: Eye,
  iconColor: "text-blue-400",
  isPositive: true
}, {
  title: "Presence Score",
  value: "74%",
  change: "+8.2%",
  icon: Target,
  iconColor: "text-green-400",
  isPositive: true
}, {
  title: "Average Rank",
  value: "2.3",
  change: "-0.4",
  icon: Trophy,
  iconColor: "text-orange-400",
  isPositive: false
}, {
  title: "Mentions",
  value: "1,247",
  change: "+23.1%",
  icon: MessageSquare,
  iconColor: "text-purple-400",
  isPositive: true
}];
export function DashboardPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "bg-dark-bg border-b border-dark-color px-8 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-dark-primary mb-2"
  }, "Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Monitor your brand's visibility across AI models")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dark-tag"
  }, "Live Data"), /*#__PURE__*/React.createElement("button", {
    className: "dark-button-primary gap-2 flex items-center"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4"
  }), "Export Report")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto p-8 bg-dark-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
  }, metrics.map(metric => {
    const Icon = metric.icon;
    return /*#__PURE__*/React.createElement("div", {
      key: metric.title,
      className: "dark-card hover:dark-shadow-lg transition-all duration-300 hover:-translate-y-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-14 h-14 rounded-2xl bg-dark-tag flex items-center justify-center`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-7 h-7 ${metric.iconColor}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1"
    }, /*#__PURE__*/React.createElement(TrendingUp, {
      className: `w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-sm font-bold ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`
    }, metric.change))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-4xl font-bold text-dark-primary mb-2"
    }, metric.value), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium text-dark-secondary"
    }, metric.title)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement(MetricsChart, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OptimizationDonut, null))), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement(ModelPerformanceGrid, null)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8"
  }, /*#__PURE__*/React.createElement(TopPerformingPrompts, null), /*#__PURE__*/React.createElement(CompetitorRanking, null))));
}