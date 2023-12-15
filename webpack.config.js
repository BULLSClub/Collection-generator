module.exports = {
  target: 'electron-renderer',
  resolve: {
    fallback: { "fs": false}
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
};