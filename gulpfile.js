var gulp = require("gulp");
var fs = require("fs");

const zip = require("gulp-zip");

function bundle() {
  return gulp
    .src([
      "assets/**/*",
      "build/**/*",
      "frameworks/**/*",
      "inc/**/*",
      "languages/**/*",
      "mimes/**/*",
      "public/**/*",
      "vendor/**/*",
      "class-streamcast-block.php",
      "iframe.html",
      "readme.txt",
      "streamcast.php",
    ], { base: "." })
    .pipe(gulp.dest("bundled/streamcast"));
}

exports.bundle = bundle;

exports.zip = () => {
  return (
    gulp
      .src(["bundled/**"])
      .pipe(zip("streamcast.zip"))
      .pipe(gulp.dest("zip"))
  );
};
