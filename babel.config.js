module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', '@babel/preset-typescript', "module:metro-react-native-babel-preset", "@babel/preset-react"],
        plugins: [
            ["module-resolver", {
                "alias": {
                    "^@/(.+)": "./src/\\1"
                }
            }],
            ["@babel/plugin-transform-react-jsx-source"]
        ]
    };
};
