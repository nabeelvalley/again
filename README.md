# Startover NPM Package

Hey, this is fresh, but essentially I'm trying to do something like `nodemon`

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
## Run Startover 

We can run startover once it is installed with the following command

```powershell 
startover -d myapp -f hello.js,"bye world.html" -e css,md -c "npm run build" -D test,
```
It is important to remember that the command/commands we are running from the `-c` option must be compatible with the system/shell we are running `startover` in and they will run one after the other

## Resources 

I've made use of a few different resources for the application as follows

### Articles 
- [Building command line tools with Node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/) by Tim Pettersen

### Libraries 
- Parsing Commands : [Commander](https://npmjs.org/package/commander)
- Watching File System : [Chokidar](https://www.npmjs.com/package/chokidar)