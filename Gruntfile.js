'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        livereload: {
            port: 35729 // Default livereload listening port.
        },
        connect: {
            livereload: {
                options: {
                    hostname: "*",
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },
        // Configuration to be run (and then tested)
        regarde: {
            scss: {
                files: '**/*.scss',
//                tasks: ['sass', 'livereload']
                tasks: ['livereload']
            },
            html: {
                files: "**/*.html",
                tasks: ['livereload']
            }
        },

        sass: {
            scss: {
                options: {
                    lineNumbers: true,
                    trace: true
                },
                files: {
                    "css/style.css": "sass/style.scss"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};