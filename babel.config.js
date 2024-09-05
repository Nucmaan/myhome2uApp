module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Remove 'expo-router/babel' from plugins
    plugins: [],
  };
};
