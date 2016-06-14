module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({

    semistandard: {
      app: {
        src: [
          'app/**/**.js',
          'modules/**.js'
        ]
      }
    },

    concat: {
      // 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          // External libraries
          'static/lib/katex/dist/katex.min.js',
          'static/lib/katex-auto-render.min.js',
          'static/lib/umbrella/umbrella.min.js',

          // Internal libraries
          'static/sweet-justice.js', // Sweet justice
          'static/page.js', // Page router
          'static/editor.js', // Text editor
          'static/template.min.js',  // Template system

          // Own code
          'static/javascript.js',  // This specific file
          'static/pages/*.js'
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

    copy: {
      files: {
        cwd: 'static/lib/katex/dist/fonts/',  // set working folder / root to copy
        src: '**/*',           // copy all files and subfolders
        dest: 'public/fonts',  // destination folder
        expand: true           // required when using cwd
      }
    },

    notify: {
      done: {
        options: {
          title: 'Libre University',
          message: 'Deployed locally'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-semistandard');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-notify');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'copy']);
  grunt.registerTask('default', ['semistandard', 'build']);
};
