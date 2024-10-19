//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    // Add a rule to handle .lottie files
    config.module.rules.push({
      test: /\.lottie$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // Use the original file name
            outputPath: 'static/', // Place the files in the static folder
            publicPath: '/_next/static/', // Make the files publicly accessible
          },
        },
      ],
    });

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
