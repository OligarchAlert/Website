export default {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-hash": {
            algorithm: 'sha256',
            trim: 10,
            manifest: './dist/build-meta.json'
        }
    }
}