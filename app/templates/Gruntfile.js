(function () {

    var beez = {
        projectname: '<%= slugname %>'
    };

    module.exports = function (grunt) {
        // enviroment
        beez.projectdir = grunt.file.findup(beez.projectname);
        grunt.log.ok('[environment] project name:', beez.projectname);
        grunt.log.ok('[environment] project directory:', beez.projectdir);

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: {
                src: ['dist', 'release', 'docs']
            },
            jshint: {
                src: ['s'],
                options: {
                    jshintrc: '.jshintrc',
                    jshintignore: ".jshintignore"
                }
            },
            mkdir: {
                docs: {
                    options: {
                        mode: 0755,
                        create: ['docs']
                    }
                }
            },
            copy: {
                raw: {
                    files: [
                        {
                            src: ['dist/' + beez.projectname + '/index.js'],
                            dest: 'release/<%= slugname %>.js'
                        }
                    ]
                },
                min: {
                    files: [
                        {
                            src: ['dist/' + beez.projectname + '/index.js'],
                            dest: 'release/<%= slugname %>.min.js'
                        }
                    ]
                }
            },
            jsdoc : {
                dist : {
                    src: ['s'],
                    options: {
                        lenient: true,
                        recurse: true,
                        private: true,
                        destination: 'docs',
                        configure: '.jsdoc.json'
                    }
                }
            },
            exec: {
                setver: {
                    command: './setver',
                    stdout: true,
                    stderr: true
                },
                beez_rjs: {
                    command: function (optimize) {
                        return './node_modules/requirejs/bin/r.js -o build.js optimize=' + optimize;
                    },
                    stdout: true,
                    stderr: true
                },
                spec_foundation: {
                    command: 'beez-foundation -c spec/foundation/spec.js -a <%= slugname %>:' + beez.projectdir,
                    stdout: true,
                    stderr: true
                }
            }
        });

        // These plugins provide necessary tasks.
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // task: foundation
        grunt.registerTask('pre', [
            'exec:setver'
        ]);

        /**
         * task: build
         */
        grunt.registerTask('rawbuild', [
            'pre',
            'jshint',
            'exec:beez_rjs:none',
            'copy:raw'
        ]);

        grunt.registerTask('minbuild', [
            'pre',
            'jshint',
            'exec:beez_rjs:uglify2',
            'copy:min'
        ]);

        // task: docs
        grunt.registerTask('docs', [
            'mkdir:docs',
            'jsdoc'
        ]);

        // task: defulat
        grunt.registerTask('default', [
            'clean',
            'rawbuild',
            'minbuild'
        ]);

        grunt.registerTask('foundation', [
            'exec:spec_foundation'
        ]);

    };

})(this);
