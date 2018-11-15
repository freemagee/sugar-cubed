# Sugar-cubed!

Simple tool to allow searching for a food substance and then display it's sugar
nutritional information (grams) using sugar cubes.

## Why?

Built for personal use and to practice writing a small [Vue.js](https://vuejs.org/) app using single file Vue components.
Currently styled with the [Tachyons](http://tachyons.io/) CSS Framework.

### Licensing

Data provided by:

- [U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory](http://www.ars.usda.gov/nutrientdata)
- [U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA Branded Food Products Database . Nutrient Data Laboratory](http://ndb.nal.usda.gov)

## Project setup
```
yarn install
```

This branch is using [Parcel](https://parceljs.org/) as a "no config" bundler.

## Build project

You need an API key. You can get a free [API key from USDA](https://ndb.nal.usda.gov/ndb/doc/index) to use the app locally.
Create a `.env` file in the root of the project. Add:

```
VUE_APP_APIKEY=<Your API key>
```

### Dev
```
yarn dev
```

### Build
```
yarn build
```
