# Startover NPM Package

Hey, this is fresh, but essentially I'm trying to do something like `nodemon` and `forever` but just a lot simpler and that will suit my needs better

## Running Dev

Clone the GitHub Repo, and then install the app dependencies and install the application globally

```bash
npm i 
npm i -g
```

Next we can link NPM to our actual package instead of the global version with

```bash 
npm link
```

## What's Happening Here 

### Getting Started  

We have a simple node app that is running globally, but linked to our application's `index.js` file with the following 

```bash 
npm i -g 
npm link 
``` 

### Define Run Command 

Next we the `startover` command linked in our `package.json` as follows 

```json 
{
  "name": "startover",
  "version": "0.0.0",
  "description": "Rerun scripts on file change",
  "main": "index.js",
  "scripts": { ... },
  "bin": {
    "startover": "./index.js"
  },
	... 
}
```

This will allow us to run th `index.js` file which is done by simply running the following command 

```bash 
startover 
```

### Parsing Command Line Arguments 

We make use of the `commander` package to parse CLI arguments, we do this from the 	`index.js` file

```js 

```

## Resources 

I've made use of a few different resources for the application as follows

### Articles 
- [Building command line tools with Node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/) by Tim Pettersen

### Libraries 
- 