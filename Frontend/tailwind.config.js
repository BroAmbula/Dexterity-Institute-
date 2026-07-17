/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.jsx",          // Scans loose JSX files right inside Frontend
    "./**/*.jsx"        // Scans JSX files inside subfolders like Auth, Student, Admin
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}