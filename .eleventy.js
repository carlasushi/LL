const { minify } = require("terser");


module.exports = function(eleventyConfig) {
// Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy('./src/styles/');

// https://www.11ty.dev/docs/quicktips/inline-js/
eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
) {
try {
    const minified = await minify(code);
    callback(null, minified.code);
} catch (err) {
    console.error("Terser error: ", err);
    // Fail gracefully.
    callback(null, code);
}
})

// Return your Object options:
return {
    dir: {
    input: "src",
    output: "public",
    }
}
};