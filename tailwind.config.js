/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xs: "960px",
        },
      },
    },
  },
  // if you want to include tailwind classes in mdx 
  safelist: [
    'mb-4',
    'p-4',
    'border',
    'border-blue-500'
  ],
  plugins: [require("@tailwindcss/typography")],
};
