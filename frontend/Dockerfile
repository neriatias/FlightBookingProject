# השתמש בתמונה של Node.js
FROM node:14

# הגדרת ספריית העבודה
WORKDIR /app

# העתקת קובצי ה-package.json והתקנת התלויות
COPY package*.json ./
RUN npm install

# העתקת כל קבצי הקוד
COPY . .

# פתיחת פורט 3000
EXPOSE 3000

# הפקודה להרצת ה-Frontend
CMD ["npm", "start"]
