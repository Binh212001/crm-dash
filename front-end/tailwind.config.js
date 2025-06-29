/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  plugins: [],
  theme: {
    extend: {
      colors: {
        label: {
          primary: "#4880FF",      // teal-200
          completed: "#00B69B",    // teal-100
          work: "#FD9A56",         // red-100 (or use orange-100 if more orange)
          processing: "#6226EF",   // violet-200
          friends: "#D456FD",      // purple-100
          rejected: "#EF3826",     // red-200
          social: "#5A8CFF",       // blue-100
          onhold: "#FFA756",       // yellow-100
          intransit: "#BA29FF",    // fuchsia-200
        },
        main:{
          primary:"#F5F6FA"
        },
        primary:"#4880FF",
        "primary-txt":"#202224"
      }
    },
  }}