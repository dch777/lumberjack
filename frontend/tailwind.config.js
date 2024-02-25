/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
	content: [
		"./src/**/*.{html,js,tsx,ts,jsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		colors: {
			darkgreen: "#102820",
			huntergreen: "#4C6444",
			khaki: "#CABA9C",
			lightbrown: "#8A6240",
			darkbrown: "#4D2D18",
			red: "#6D140C",
			white: "#FFFFFF",
			black: "#000000",
			blue: "#03294E",
		},
		extend: {},
	},
	darkMode: "class",
	plugins: [nextui()],
};
