module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            lightBlue: {
                300: "#F4F8FA",
            },
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
