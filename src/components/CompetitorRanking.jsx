import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpRight, TrendingUp, TrendingDown, Crown } from "lucide-react";
const competitors = [{
  rank: 1,
  name: "AI8 Digital",
  logo: "A8",
  score: 8.4,
  change: "+0.3",
  trend: "up",
  isYou: true,
  gradient: "from-ai8-navy to-ai8-neon"
}, {
  rank: 2,
  name: "TechCorp Solutions",
  logo: "TC",
  score: 7.9,
  change: "-0.1",
  trend: "down",
  isYou: false,
  gradient: "from-blue-500 to-blue-600"
}, {
  rank: 3,
  name: "InnovateLabs",
  logo: "IL",
  score: 7.6,
  change: "+0.2",
  trend: "up",
  isYou: false,
  gradient: "from-purple-500 to-purple-600"
}, {
  rank: 4,
  name: "NextGen Analytics",
  logo: "NG",
  score: 7.2,
  change: "0.0",
  trend: "neutral",
  isYou: false,
  gradient: "from-orange-500 to-orange-600"
}, {
  rank: 5,
  name: "DataWise Pro",
  logo: "DW",
  score: 6.8,
  change: "-0.4",
  trend: "down",
  isYou: false,
  gradient: "from-red-500 to-red-600"
}];
export function CompetitorRanking() {
  const getTrendIcon = trend => {
    switch (trend) {
      case "up":
        return /*#__PURE__*/React.createElement(TrendingUp, {
          className: "w-4 h-4 text-ai8-success"
        });
      case "down":
        return /*#__PURE__*/React.createElement(TrendingDown, {
          className: "w-4 h-4 text-ai8-error"
        });
      default:
        return null;
    }
  };
  const getTrendColor = trend => {
    switch (trend) {
      case "up":
        return "text-ai8-success";
      case "down":
        return "text-ai8-error";
      default:
        return "text-ai8-gray";
    }
  };
  return /*#__PURE__*/React.createElement(Card, {
    className: "ai8-card border-0"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between pb-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl font-bold text-ai8-navy"
  }, "Competitor Ranking"), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-ai8-gray font-medium"
  }, "How you rank against key competitors in AI visibility")), /*#__PURE__*/React.createElement("button", {
    className: "ai8-button-secondary gap-2 flex items-center"
  }, "View Full Report", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, competitors.map(competitor => /*#__PURE__*/React.createElement("div", {
    key: competitor.rank,
    className: `p-5 rounded-xl border transition-all duration-200 ${competitor.isYou ? "border-ai8-neon/30 bg-ai8-neon/5 ai8-shadow ai8-glow-neon-subtle" : "border-gray-100 bg-ai8-light/30 hover:ai8-shadow"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, competitor.rank === 1 && /*#__PURE__*/React.createElement(Crown, {
    className: "w-6 h-6 text-ai8-warning"
  }), /*#__PURE__*/React.createElement("div", {
    className: `
                    w-12 h-12 rounded-2xl bg-gradient-to-br ${competitor.gradient} 
                    flex items-center justify-center ai8-shadow
                  `
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-ai8-white font-bold text-sm"
  }, competitor.logo))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-ai8-navy text-lg"
  }, "#", competitor.rank, " ", competitor.name), competitor.isYou && /*#__PURE__*/React.createElement(Badge, {
    className: "bg-ai8-neon/20 text-ai8-neon border-ai8-neon/30 font-bold"
  }, "You")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-ai8-gray font-medium"
  }, "Score: "), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-ai8-navy"
  }, competitor.score), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1"
  }, getTrendIcon(competitor.trend), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-bold ${getTrendColor(competitor.trend)}`
  }, competitor.change))))))))));
}