/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all React component files
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's global resets to avoid Bootstrap conflicts
  },
  plugins: [],
};
