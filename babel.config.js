module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            ui: './ui',
            core: './core',
            assets: './assets',
            screens: './screens',
            navigation: './navigation',
            '@models': './stokks-models/index',
          },
        },
      ],
    ],
  };
};
