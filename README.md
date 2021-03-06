# Users Search - Torre API
This is a small project that uses the TORRE.CO BIO API.

# Stack

* Vue.JS.
* OpenStreetMap.
* Vercel Serverless functions.

# TODO

# PoC

* Bootstrap the app.                                     [X]
* Implement a Serverless Service to fetch the torre api. [X]
* Show Raw Data in console for testing.                  [X] 
* Integrate a Map Visualizer, full screen.               [X]
    * Choose between GMaps and OpenStreetMap.            [X]
* Show a Specific user location by getting the lat/long params from the TORRE.CO BIO API. [x]

# Roadmap - Improvements.

* Show all users in the map with a heatmap-ish visualization. [ :( ]
    * Status: I did some tests with heatmaps, need to play around a little bit more with the API's to get the data needed.   
* Given Specific Zoom-in events, replace the heat map by pointers for each user. [ :(]
    * Since it was coupled with the heatmap feature, can't put it together either. [ :( ]
* onClick over each user, show some details about them .(name, links,bio, etc). [X]


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Demo

![Demo](/gif/test.gif)





Visit the Demo  [here](https://vue2-map.vercel.app/).

