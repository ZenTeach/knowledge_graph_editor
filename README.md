# Graph Editor View
## Yarn installation
``` npm i -g yarn ```

## Configuration
Create a file named `.env` in the project directory and add the following snippet.

```
NEO4J_PROTOCOL=neo4j
NEO4J_HOST=localhost
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neo4j
NEO4J_PORT=7687
NEO4J_DATABASE=neo4j
NEO4J_ENCRYPTION=ENCRYPTION_OFF
SERVER_PORT=3001
```
## Project setup

``` yarn install ```

### Compiles and hot-reloads for development
``` yarn serve ```

### Compiles and minifies for production
``` yarn build ```

### Run your unit tests
``` yarn test:unit ```

### Lints and fixes files
``` yarn lint ```

## Project Structure

```
src
├── App.vue
├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── main.js
├── plugins
│   └── axios.js
├── router
│   └── index.js
├── services
│   └── service_config.js
├── store
│   └── index.js
└── views
    └── Home.vue


```

This project follows the structure mentioned above where each folder serves a specific purpose, which is outlined below:

- ```assets```: this folder hosts all static assets (images, favicons, style files, pdfs) that are used in by the framework.

- ```components```: this folder hosts web components that are renders in views later on. 

- ```plugins```: this folder contains initialization of certain plugins and libraries outside of vue.js toolchain.

- ```router```: this folder contains all routes used by [VueRouter](https://router.vuejs.org/) which is used by vue.js to perform [client-side routing](https://willtaylor.blog/client-side-routing-in-vanilla-js/).

- ```services```: this folder contains different services that interact with the server. This follows the [service layer pattern](https://en.wikipedia.org/wiki/Service_layer_pattern)

- ```store```: this folder contains modules to manage app state provided by [vuex](https://vuex.vuejs.org/)

- ```views```: contains Vue.js views that are rendered by the vue engine.

- ```main.js```: this is the main entrypoint that is loaded by the dev-server. It also houses the main vue initialization.

- ```App.vue```: contains the entrypoint of the app. This is where all vue.js component/view rendering happens.
