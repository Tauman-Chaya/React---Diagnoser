// הגדרות כלליות של האפליקציה.
// הערכים נקראים מהקובץ .env שבתיקייה הראשית. לשינוי במחשב שלך בלבד: .env.local (לא עולה ל-git).

// כתובת השרת (C----Diagnoser)
export const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7082";

// המייל של המנהלת: מאבחנת עם המייל הזה מקבלת הרשאות ניהול (תשלומים, מתעניינים).
// ברירת המחדל תואמת לשרת ולנתוני הדמה ב-Database/schema.sql.
export const MANAGER_EMAIL = process.env.REACT_APP_MANAGER_EMAIL || "esty@2024";

// מזהה האפליקציה בהתחברות עם Google (מזהה ציבורי, לא סוד)
export const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  "850793628922-mt77pmp9fmc7g37307q7316kqier689d.apps.googleusercontent.com";
