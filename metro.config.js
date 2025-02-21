const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add enhanceMiddleware to allow HTTP requests
config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
      return middleware(req, res, next);
    };
  },
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
