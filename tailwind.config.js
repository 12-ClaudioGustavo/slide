/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
            },
            keyframes: {
                kenBurns: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.2) translate(-2%, -2%)' },
                }
            }
        },
    },
    plugins: [],
}
