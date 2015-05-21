# Awesome React App

Example React app that combines a bunch of useful things:

- Serverside rendering. Waits for async (ajax) requests to finish before returning page thanks to [react-async](https://github.com/andreypopp/react-async).
- Webpack with configs for dev and production.
- WebpackDevServer with hot loading so we can view code changes live in browser without a page refresh.
- [Radium](https://github.com/FormidableLabs/radium) for specifying style within components. No more stylesheets.
- Simple json database for prototyping (powered by [json-server](https://github.com/typicode/json-server)).

# Install

- Install dependencies: npm install
- Setup database: rename db.empty.json to db.json
- Run server: npm run start
- Load app: [http://localhost:3000](http://localhost:3000)

# Notes

- To tell server to not wait for async (ajax) requests: [http://localhost:3000/?renderAsyncData=false](http://localhost:3000/?renderAsyncData=false)
- To skip WebpackDevServer (which gives us automatic bundling and hot loading): [http://localhost:8080](http://localhost:8080). If you skip WebpackDevServer by running on port 8080 you must manually bundle assets by running: "webpack --config webpack.prod.config.js". When running through WebpackDevServer the bundle.js file is never actually created, it's just served directly from memory.
