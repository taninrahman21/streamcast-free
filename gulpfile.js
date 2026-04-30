var gulp = require("gulp"),
  fs_config = require("./fs-config.json");
const zip = require("gulp-zip");

require("gulp-freemius-deploy")(gulp, {
  developer_id: fs_config.developer_id,
  plugin_id: fs_config.plugin_id,
  public_key: fs_config.public_key,
  secret_key: fs_config.secret_key,
  zip_name: "streamcast.zip",
  zip_path: "zip/",
  add_contributor: false,
});

function bundle() {
  return gulp.src(["**/*", "!node_modules/**", "!src/**", "!zip/**", "!composer-lock.json", "!composer.json", "!bundled/**", "!gulpfile.js", "!package.json", "!package-lock.json", "!webpack.config.js", "!.gitignore", "!todo.txt", "!fs-config.json", "!empty.js"]).pipe(gulp.dest("bundled/streamcast"));
}

exports.bundle = bundle;

exports.zip = () => {
  return (
    gulp
      .src(["bundled/**"])
      // .pipe(zip("streamcast.zip"))
      .pipe(zip("streamcast.zip"))
      .pipe(gulp.dest("zip"))
  );
};
