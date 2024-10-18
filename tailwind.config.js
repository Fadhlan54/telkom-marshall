/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alert: {
          success: "#17D079",
          "success-2": "#23A96A",
          "success-3": "#178E57",
          danger: "#F54A45",
          "danger-2": "#DC3D38",
          "danger-3": "#C3302C",
          warning: "#F79009",
          "warning-2": "#DC6803",
          "warning-3": "#B54708",
        },
        primary: {
          1: "#0093AD",
          2: "#00768A",
          3: "#005868",
        },
        secondary: {
          1: "#1F2855",
          2: "#192044",
          3: "#131833",
        },
        soft: {
          1: "#E8F5F8",
          2: "#CEEBEF",
          3: "#B1DEF6",
        },
        grey: {
          1: "#E4E6EF",
          2: "#D0D5DD",
          3: "#B5B5C3",
          4: "#8989A3",
        },
      },
      animation: {
        "spin-slow": "spin 2.5s ease-in-out infinite",
        "spin-fast-to-slow": "spin-fast-to-slow 3s ease-in-out infinite",
      },
      keyframes: {
        "spin-fast-to-slow": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(1080deg)" },
          "100%": { transform: "rotate(1800deg)" },
        },
      },
      boxShadow: {
        top: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "top-md":
          "0 -3px 6px -4px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08)",
        "top-lg":
          "0 -10px 20px -5px rgba(0, 0, 0, 0.12), 0 5px 10px -5px rgba(0, 0, 0, 0.08)",
        "top-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "bottom-xl":
          "5px 10px 15px 5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
