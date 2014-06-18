'use strict';

var paths = {
    js: ['*.js', 'server/**/*.js', 'public/**/*.js', 'test/**/*.js', '!test/coverage/**', '!public/system/lib/**', 'packages/**/*.js', '!packages/**/node_modules/**'],
    html: ['public/**/views/**', 'server/views/**', 'packages/**/public/**/views/**', 'packages/**/server/views/**'],
    css: ['public/**/css/*.css', '!public/system/lib/**', 'packages/**/public/**/css/*.css']
};

module.exports = function(grunt) {

    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('server/config/assets.json'),
        clean: ['public/build'],
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: paths.html,
                options: {
                    livereload: true
                }
            },
            css: {
                files: paths.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            core: {
                options: {
                    mangle: false
                },
                files: '<%= assets.core.js %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: paths.css
        },
        cssmin: {
            core: {
                files: '<%= assets.core.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**', 'node_modules/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: require('./server/config/config').port
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js', 'packages/**/test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['clean','cssmin', 'uglify', 'cities', 'concurrent']);
    } else {
        grunt.registerTask('default', ['clean','jshint', 'csslint', 'cities', 'concurrent']);
    }

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    // For Heroku users only.
    // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
    grunt.registerTask('heroku:production', ['cssmin', 'uglify', 'cities']);

    grunt.registerTask('cities', 'seeds with few cities', function(n,e,i,a) {
        var config = require('./server/config/config');
        var mongoose = require('mongoose');
        var connection = mongoose.connection;
        var City = require(__dirname + '/packages/atmos/server/models/city');

        var _ = require('lodash');

        var done = this.async();
        mongoose.connect(config.db);

        var requiredCities = [
            {'name': 'paris'},
            {'name': 'marseille'},
            {'name': 'lyon'},
            {'name': 'toulouse'},
            {'name': 'nice'},
            {'name': 'nantes'},
            {'name': 'strasbourg'},
            {'name': 'montpellier'},
            {'name': 'bordeaux'},
            {'name': 'lille'}
        ];

        var citiesToAdd = [];

        connection.on('open', function () {

            City.find().exec(function(err, fetchedCities) {
                if (err) {
                    console.log(err);
                    done(false);
                    return;
                }

                _.each(requiredCities, function(requiredCity) {
                    if (!_.where(fetchedCities, requiredCity).length){
                        requiredCity.records = [{ atmo: 2 }, { atmo: 2 }];
                        citiesToAdd.push(requiredCity);
                    }
                });

                console.log('It adds the following cities :');
                console.log(citiesToAdd);

                if (citiesToAdd.length) {
                    City.create(citiesToAdd, function (err) {
                        if (err) {
                            console.log(err);
                            done(false);
                            return;
                        }

                        console.log('success!');
                        // close the database after 'city' is saved.
                        connection.close();
                        done(true);
                    });
                } else {
                    console.log('nothing to do');
                    done(true);
                }
            });
        });
    });
};
