module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
	  css: {
		  src: ['src/sass/**/*.sass'],
		  dest: 'dist/curriculo/sass/build/build.sass',
	  },
      js: {
        src: ['src/js/src/**/*.js'],
        dest: 'dist/curriculo/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/curriculo/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    qunit: {
      files: ['js/test/**/*.html']
    },
	pug: {
        compile: {
            options: {
                client: false,
                pretty: true,
                data: {
                    debug: false
                }
            },
			files: [ {
              cwd: "src/jade/",
              src: "**/*.jade",
              dest: "dist/curriculo/view",
              expand: true,
              ext: ".html"
            } ]
        }
    },
	sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                'dist/curriculo/css/<%= pkg.name %>.css' : '<%= concat.css.dest %>',
            }
        }
    },
	cssmin: {
		target: {
		    files: [{
		    	expand: true,
		    	cwd: 'dist/curriculo/css',
		    	src: ['*.css', '!*.min.css'],
		    	dest: 'dist/curriculo/css',
		    	ext: '.min.css'
		    }]
	  }
	},
    // jshint: {
    //   files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    //   options: {
    //     // options here to override JSHint defaults
    //     globals: {
    //       jQuery: true,
    //       console: true,
    //       module: true,
    //       document: true
    //     }
    //   }
    // },
    watch: {
      files: ['src/js/src/**/*.js', 'src/jade/**/*.jade', 'src/sass/**/*.sass'],
      tasks: ['uglify', 'concat', 'pug', 'sass', 'cssmin']
  	},
});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // grunt.registerTask('test', ['qunit']);

  grunt.registerTask('default', ['concat', 'uglify', 'pug', 'sass', 'cssmin']);

};
