export default [
    {
        ignores: ["node_modules", "dist", "build"],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
        },
    },
];