import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
const models = [{
  name: "OpenAI",
  logo: "🤖",
  visibility: 8.7,
  presence: 82,
  change: 12.5,
  trend: "up"
}, {
  name: "Claude",
  logo: "🔮",
  visibility: 7.2,
  presence: 68,
  change: 5.3,
  trend: "up"
}, {
  name: "Gemini",
  logo: "✨",
  visibility: 6.8,
  presence: 71,
  change: -2.1,
  trend: "down"
}, {
  name: "Meta AI",
  logo: "🌐",
  visibility: 5.9,
  presence: 64,
  change: 8.7,
  trend: "up"
}, {
  name: "Grok",
  logo: "⚡",
  visibility: 4.2,
  presence: 45,
  change: 0,
  trend: "neutral"
}, {
  name: "DeepSeek",
  logo: "🧠",
  visibility: 3.1,
  presence: 38,
  change: 15.2,
  trend: "up"
}];
export function ModelPerformanceGrid() {
  const getTrendIcon = trend => {
    switch (trend) {
      case "up":
        return /*#__PURE__*/React.createElement(TrendingUp, {
          className: "w-4 h-4 text-dark-positive"
        });
      case "down":
        return /*#__PURE__*/React.createElement(TrendingDown, {
          className: "w-4 h-4 text-dark-negative"
        });
      default:
        return /*#__PURE__*/React.createElement(Minus, {
          className: "w-4 h-4 text-dark-secondary"
        });
    }
  };
  const getTrendColor = (trend, change) => {
    if (trend === "up") return "text-dark-positive";
    if (trend === "down") return "text-dark-negative";
    return "text-dark-secondary";
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dark-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-between pb-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-dark-primary mb-2"
  }, "Model Performance"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark-secondary font-medium"
  }, "Your brand visibility across different AI language models")), /*#__PURE__*/React.createElement("button", {
    className: "dark-button-secondary gap-2 flex items-center"
  }, "View Details", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, models.map(model => /*#__PURE__*/React.createElement("div", {
    key: model.name,
    className: "p-6 rounded-xl border border-dark-color hover:dark-shadow-lg transition-all duration-300 hover:-translate-y-1 bg-dark-card group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 rounded-2xl bg-dark-tag flex items-center justify-center dark-shadow border border-dark-color"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, model.logo)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-dark-primary text-lg"
  }, model.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-1"
  }, getTrendIcon(model.trend), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-bold ${getTrendColor(model.trend, model.change)}`
  }, model.change > 0 ? "+" : "", model.change, "%"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-sm mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary font-medium"
  }, "Visibility"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-dark-primary"
  }, model.visibility, "/10")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-tag rounded-full h-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500",
    style: {
      width: `${model.visibility * 10}%`
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-sm mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-secondary font-medium"
  }, "Presence"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-dark-primary"
  }, model.presence, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-tag rounded-full h-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500",
    style: {
      width: `${model.presence}%`
    }
  })))))))));
}