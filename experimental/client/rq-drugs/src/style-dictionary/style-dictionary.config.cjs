const yaml = require("yaml");

module.exports = {
  parsers: [
    {
      pattern: /\.yaml$/,
      parse: ({ contents, filePath }) => yaml.parse(contents),
    },
  ],
  // path is relative to calling script in package.json
  source: ["./src/style-dictionary/theme/default/**/*.yaml"],
  platforms: {
    // CSS - Variables
    // css: {
    //   transformGroup: "css",
    //   buildPath: "./src/css/",
    //   transforms: ["attribute/cti", "name/cti/kebab", "color/hsl"],
    //   files: [
    //     {
    //       destination: "variables.css",
    //       format: "css/variables",
    //     },
    //   ],
    // },
    json: {
      transformGroup: "json",
      buildPath: "./src/tokens/",
      transforms: ["attribute/cti", "name/cti/kebab", "color/hsl"],
      files: [
        {
          destination: "tokens.json",
          format: "json/flat",
        },
      ],
    },
    // JavaScript - Tokens
    // js: {
    //   transformGroup: "js",
    //   buildPath: "./src/tokens/",
    //   transforms: ["attribute/cti", "name/cti/pascal", "asset/base64"],
    //   files: [
    //     {
    //       destination: "design-tokens.js",
    //       format: "javascript/es6",
    //     },
    //   ],
    // },
  },
};
