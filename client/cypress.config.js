const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    specPattern: "cypress/component/*.cy.{js,jsx,ts,tsx}", // Adjust the pattern according to your directory structure
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackOptions: {
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".png"],
        },
      },
    },
  },
});
