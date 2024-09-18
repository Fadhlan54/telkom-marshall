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
        background: "var(--background)",
        foreground: "var(--foreground)",
        alert: {
          success: "#73CA5C",
          danger: "#FF0000",
          "danger-transparent": "rgba(255, 0, 0, 0.08)",
          warning: "#F9CC00",
          "success-hover": "#539F3F",
          attention: "#F9CC00",
        },
      },
      animation: {
        "spin-slow": "spin 2.5s ease-in-out infinite",
      },
      boxShadow: {
        top: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "top-md":
          "0 -3px 6px -4px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08)",
        "top-lg":
          "0 -10px 20px -5px rgba(0, 0, 0, 0.12), 0 5px 10px -5px rgba(0, 0, 0, 0.08)",
        "top-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
