module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        PATHS: {
            APP: 'app/',
            BUILD: 'build/'
        },

        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    appDir: '<%= PATHS.APP %>',
                    baseUrl: 'scripts',
                    dir: '<%= PATHS.BUILD %>',
                    mainConfigFile: '<%= PATHS.APP %>scripts/main.js',
                    modules: [
                        {
                            name: 'main'
                        }
                    ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default task(s).
    grunt.registerTask('default', ['requirejs']);

};