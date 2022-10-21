const colors = require("tailwindcss/colors")

module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            ...colors,
            blue: {
                300: "#F4F8FA",
                1000: "#1B31A8",
            },
            darkBlue: {
                500: "#1E2A32",
            },
        },
        fontFamily: {
            work: ["Work Sans", "sans-serif"],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
