module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> - http://jackrugile.com/jrumble - MIT License */\n'
            },
            demoBuild: {
                src: '<%= pkg.name %>.js',
                dest: 'demo/js/<%= pkg.name %>.<%= pkg.version%>.min.js'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }

        },
        jshint: {
            all: ['Gruntfile.js', 'jquery.jrumble.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint','uglify']);

};