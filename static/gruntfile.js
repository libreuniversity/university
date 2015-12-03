module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      files: {
        cwd: 'static/katex/dist/fonts/',  // set working folder / root to copy
        src: '**/*',           // copy all files and subfolders
        dest: 'public/fonts',    // destination folder
        expand: true           // required when using cwd
      }
    },

    concat: {
      // 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          // Libraries
          'static/katex/dist/katex.min.js',
          'static/katex-auto-render.min.js',
          'static/sweet-justice.js', // Sweet justice

          // Own code
          'static/editor.js', // Text editor
          'static/umbrella/rainstorm.js', // Umbrella js
          'static/template.min.js',  // Template system
          'static/javascript.js',  // This specific file
          'static/page.subject.js', // subject page
          'static/page.test.js' // test page
        ],
        dest: 'public/javascript.js',
      }
    },

    uglify: {
      build: {
        src: 'public/javascript.js',
        dest: 'public/javascript.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/style.min.css': 'static/style.scss'
        },
      }
    },

    watch: {
      scripts: {
        files: [
          'static/gruntfile.js',
          'static/*.js',
          'static/*/*.js',
          'static/*.scss',
          'static/*/*.scss'],
        tasks: ['concat', 'uglify', 'sass', 'copy'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['static/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Concatenate
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Concatenate
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Minify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Sass
  grunt.loadNpmTasks('grunt-sass');

  // Watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal
  grunt.registerTask('default', ['concat', 'uglify', 'copy']);
};
