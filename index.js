#!/usr/bin/env node
const app = require('commander')
const chokidar = require('chokidar')
const child_process = require('child_process')

// Utility functions
const split = val => val.split(',')

const execute = () => {
    app.runAsync ? execAsync() : execSync()
}

const execSync = () => {
    command = app.commands.join(' && ')
    child_process.exec(command, function(error, stdout, stderr) {
        if (stdout) console.log('command out:\n ' + stdout)
        if (stderr) console.log('stderr:\n' + stderr)
        if (error !== null) console.log('exec error: ' + error)
    })
}
const execAsync = () => {
    app.commands.forEach(command => {
        child_process.exec(command, function(error, stdout, stderr) {
            if (stdout) console.log('command out:\n ' + stdout)
            if (stderr) console.log('stderr:\n' + stderr)
            if (error !== null) console.log('exec error: ' + error)
        })
    })
}

//  Define Parameters
app.version('0.1.0')
    .option(
        '-d, --watch-dirs [directories]',
        'List of directories to watch, by default will watch current directory',
        split
    )
    .option(
        '-c, --commands [directory]',
        'List of Commands to run when files change',
        split
    )
    .option(
        '-f, --exclude-files [files to exclude]',
        'List of Files to Exclude from Watch',
        split
    )
    .option(
        '-e, --exclude-extensions [extensions to exclude]',
        'List of Extensions to Exclude from Watch',
        split
    )
    .option(
        '-D, --exclude-directories [directories to exclude]',
        'List of Directories to Exclude from Watch',
        split
    )
    .option('-a, --run-async', 'Run commands asynchronously [false]', false)
    .parse(process.argv)

console.log('Called with the following Options')

if (app.watchDirs) console.log('watch dirs:', app.watchDirs)
if (app.commands) console.log('commands:', app.commands)
if (app.excludeFiles) console.log('excluded files:', app.excludeFiles)
if (app.excludeExtensions)
    console.log('excluded extensions:', app.excludeExtensions)
if (app.excludeDirectories)
    console.log('excluded directories:', app.excludeDirectories)
if (app.runAsync) 
console.log('run commands async:', app.runAsync)

execute()

// Initialize watcher.
var watcher = chokidar.watch(app.watchDirs ? app.watchDirs : '.', {
    ignored: new Array().concat(
        app.excludeDirectories,
        app.excludeFiles,
        app.excludeExtensions? new RegExp(app.excludeExtensions.map(el => '.' + el).join('|')) : [],
        /(^|[\/\\])\../
    ),
    persistent: true
})

// Something to use when events are received.
var log = console.log.bind(console)

// Add event listeners.

var ready = false

watcher
    .on('add', path => console.log(`File ${path} has been added`))
    .on('change', path => {
        if (ready) execute()
        log(`File ${path} has been changed`)
    })
    .on('unlink', path => {
        if (ready) execute()
        log(`File ${path} has been removed`)
    })
    .on('addDir', path => {
        if (ready) execute()
        log(`Directory ${path} has been added`)
    })
    .on('unlinkDir', path => {
        if (ready) execute()
        log(`Directory ${path} has been removed`)
    })
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => {
        ready = true
        log('Initial scan complete. Ready for changes')
    })
