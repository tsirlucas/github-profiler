#Github Profiler
An application where you can search for Github users and add/edit/remove notes for each one

## Setup
First install the node and npm requirements and make a symbolic link to nodejs

After that install the node dependencies:

```shellscript
npm install
```

## Running the static server (port 3000)
To run the server do:
```shellscript
npm start
```

## Running tests
To run the tests do:
```shellscript
npm test
```

## Building production
First install webpack globally:
```shellscript
npm install webpack -g
```

To run production builder do:
```shellscript
NODE_ENV=production webpack -p --config webpack.production.config.js
```