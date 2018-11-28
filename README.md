# Startover

Hey, this is fresh, but essentially it's a little command line tool that will let you watch for file changes and run specific scripts when files are changed, suggestions, bugs reports, and feature requests welcome

## Installing Startover

We can install Startover globally from NPM

```bash
npm i -g startover
```

## Run Startover

We can run startover once it is installed with the following command

```powershell
startover -d myapp -f hello.js,"bye world.html" -e css,md -c "npm run build" -D test,
```

It is important to remember that the command/commands we are running from the `-c` option must be compatible with the system/shell we are running `startover` in and they will run one after the other

## Available Options

The application help information can be found with

```powershell
startover --help
```

Or is as follows

```powershell
Options:
  -V, --version                                       output the version number
  -d, --watch-dirs [directories]                      List of directories to watch, by default will watch current directory
  -c, --commands [directory]                          List of Commands to run when files change
  -f, --exclude-files [files to exclude]              List of Files to Exclude from Watch
  -e, --exclude-extensions [extensions to exclude]    List of Extensions to Exclude from Watch
  -D, --exclude-directories [directories to exclude]  List of Directories to Exclude from Watch
  -a, --run-async                                     Run commands asynchronously [false]
  -h, --help                                          output usage information
```

## Specifying Commands

### Long Running Processes

For long running processes that need to be run in the background we can make use of [`forever`](https://www.npmjs.com/package/chokidar), we can add the following scripts to our `package.json`, for example, or even define them separately

### Synchronous

By default the processes will run synchronously in the order in which you define them

`package.json`

```json
  "scripts": {
    "start": "node app/server.js",
    "build": "browserify public/main.js -o public/bundle.js",
    "forever-start": "forever start app/server.js",
    "forever-stop": "forever stopall"
  },
```

`command line`

```powershell
startover -D docs,node_modules -f hello.js,yes.html -e html,md -c "npm run forever-stop","npm run build","npm run forever-start"
```

### Asynchronous

We can make use of the -a flag to run processes asynchronously as follows, which will run each command specified as a different child process

```powershell
startover -D docs,node_modules -f hello.js,yes.html -e html,md -c "npm run forever-stop","npm run build","npm run forever-start" -a
```

### Combining Async and Sync

If we need to run some processes synchronously (like stopping our server and then restarting it) but others asynchronously (like managing server processes on a separate thread to compiling a website) we can do it by separating commands that need to run synchronously with `<command 1> && <command 2>`

```powershell
startover -D docs,node_modules -f hello.js,yes.html -e html,md -c "npm run forever-stop && npm run forever-start","npm run build" -a
```

## Running Dev

Clone the GitHub Repo, and then install the app dependencies and install the application globally

```powershell
npm i
npm i -g
```

Next we can link NPM to our actual package instead of the global version with

```powershell
npm link
```

## Resources

I've made use of a few different resources for the application as follows

### Articles

-   [Building command line tools with Node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/) by Tim Pettersen

### Libraries

-   Parsing Commands : [Commander](https://npmjs.org/package/commander)
-   Watching File System : [Chokidar](https://www.npmjs.com/package/chokidar)
