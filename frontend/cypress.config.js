const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://flight-frontend-q55m.onrender.com", // כתובת האתר שלך
    setupNodeEvents(on, config) {
      // הוסף כאן כל אירועים מותאמים אישית אם יש
    },
  },
});
