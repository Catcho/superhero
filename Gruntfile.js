module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/**/*.js',
        dest: 'build/js/all.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      }
    },
    clean: ["build/**"],
    copy: {
      main: {
        files: [
          // includes files within path 
          {expand: true, cwd: "src/",src: ['**/*.html', 'img/*'], dest: 'build/', filter: 'isFile'},
        ]
      }
    },
    jshint: {
        options: {
          "curly": true,
          "eqnull": true,
          "eqeqeq": true,
          "undef": true,
          "globals": {
            "jQuery": true,
            "module": true,
            "console": true
          }
        },
        all: ['Gruntfile.js', 'src/js/*.js']
    },
    imagemin:{
        dynamic: {                         // Another target 
          files: [{
            expand: true,                  // Enable dynamic expansion 
            cwd: 'src/img/',                   // Src matches are relative to this path 
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
            dest: 'buils/img/'                  // Destination path prefix 
          }]
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
    
  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['jshint','clean','copy','uglify','imagemin']);
    
};