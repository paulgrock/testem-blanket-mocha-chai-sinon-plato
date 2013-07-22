/*global module:false*/
module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    shaSub: function(sha){
      return sha.substring(sha.length - 7);
    },
    jsDir: "public/javascripts",
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['<%= jsDir %>/**/*.js', '!<%= jsDir %>/vendor/**/*.js']
    },
    compass: {
      options: {
        httpPath: '/',
        cssDir: 'public/stylesheets',
        sassDir: 'public/stylesheets',
        fontsDir: 'public/stylesheets/fonts',
        imagesDir: 'public/images',
        javascriptsDir: 'public/javascripts',
        noLineComments: true,
        sassOptions: {
          debugInfo: false,
          sourcemap: true
        },
        relativeAssets: true
      },
      prod: {
        options: {
          environment: 'production',
          outputStyle: 'compressed'
        }
      },
      dev: {
        outputStyle: 'nested'
      }
    },
    watch: {
      styles: {
        files: ['public/**/*.sass', 'public/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      },
      src: {
        files: ['views/**/*.jade', 'public/**/*.js'],
        options: {
          livereload: true
        }
      }
    },
    requirejs: {
      options: {
        modules: [
          {
            name: 'common'
          }
        ],
        optimize: 'uglify2',
        generateSourceMaps: true,
        preserveLicenseComments: false,
        useSourceUrl: true,
        optimizeCss: 'none',
        skipDirOptimize: true,
        fileExclusionRegExp: /^\./
      },
      prod: {
        options: {
          mainConfigFile: '<%= jsDir %>/require-config.js',
          appDir: 'public',
          dir: 'public/<%= pkg.name %>/'
        }
      }
    },
    testem: {
      main : {
        files : {
          'tests.tap': [ 'testem.json']
        }
      }
    },
    plato : {
      main : {
        src : [ '<%= jsDir %>/**/*.js', '!<%= jsDir %>/vendor/**/*.js' ],
        dest : 'reports'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

  grunt.registerTask('local-build', [
    'git-describe',
    'compass:prod',
    'requirejs:prod'
  ]);

  grunt.registerTask('build', [
    'git-describe',
    'requirejs:prod',
    'compass:prod',
    'sftp'
  ]);

  grunt.registerTask('test', [
    'testem'
  ]);
};
