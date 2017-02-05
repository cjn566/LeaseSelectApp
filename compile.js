var fs = require("fs");
var browserify = require("browserify");
browserify("./src/components/app.jsx")
    .transform("babelify", {presets: ["latest", "react"], plugins: "transform-class-properties"})
    .bundle()
    .pipe(fs.createWriteStream("public/bundle.js"));