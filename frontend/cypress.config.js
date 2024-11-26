const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // כתובת האתר שלך
    setupNodeEvents(on, config) {
      // הוסף כאן כל אירועים מותאמים אישית אם יש
    },
  },
});
