const sass = require("node-sass");

module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      options: {
        sepeartor: "\n\n//-------------------------------\n",
        banner: "\n\n//----------------------------------\n",
      },
      dist: {
        src: ["components/scripts/*.js"],
        dest: "builds/development/js/script.js",
      },
      prod: {
        src: ["components/scripts/*.js"],
        dest: "builds/production/js/script.js",
      },
    }, //concat
    bower_concat: {
      all: {
        dest: 'builds/development/js/_bower.js',
        cssDest: 'builds/development/css/_bower.css'
      }
    },
    wiredep: {
      task: {
        src: "builds/development/**/*.html",
      },
    },
    sass: {
      dist: {
        options: {
          implementation: sass,
          sourceMap: true,
        },
        files: [
          {
            src: "components/sass/style.scss",
            dest: "builds/development/css/style.css",
          },
        ],
      },
    }, //sass
    connect: {
      server: {
        options: {
          hostname: "localhost",
          port: 3000,
          base: "builds/development",
          livereload: true,
        },
      },
    },
    watch: {
      options: {
        spawn: false,
        livereload: true,
      },
      scripts: {
        files: [
          "builds/development/**/*.html",
          "components/scripts/**/*.js",
          "components/sass/**/*.scss",
        ],
        tasks: ["concat", "sass"],
      },
    }, //watch
  }); //initConfig
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-bower-concat");

  grunt.registerTask("default", [
    "wiredep",
    "bower_concat",
    "concat",
    "sass",
    "connect",
    "watch",
  ]); // default command grunt
}; //wrapping function
