# Sugar-cubed!

A simple tool to allow searching for a food and then display it's sugar nutritional information (grams per 100 grams) using sugar cubes.

## Why?

Built for personal use and to practice writing a small [Vue.js](https://vuejs.org/) app using single file JavaScript components.
Currently styled with the [Tachyons](http://tachyons.io/) CSS Framework.

#### Notes

This is the legacy branch of this project. It uses Vue.js v2.5.17 with `Vue.component` to register components in `.js` pages.

There is no working demo of this legacy version of the app. Although you could still clone this repo and get a free [API from USDA](https://ndb.nal.usda.gov/ndb/doc/index) to use the app locally.

Locate `/src/js/config.json` and replace `<Your API Key>` with the key you get from USDA:

```json
{
  "apiKey": "<Your API Key>",
  "endPoints": {
    "search": "https://api.nal.usda.gov/ndb/search/?",
    "reports": "https://api.nal.usda.gov/ndb/reports/?",
    "nutrients": "https://api.nal.usda.gov/ndb/nutrients/?"
  },
  "nutrients": {
    "sugar": {
      "id": "269"
    }
  }
}
```

### Licensing

Data provided by:

- [U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory](http://www.ars.usda.gov/nutrientdata)
- [U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA Branded Food Products Database . Nutrient Data Laboratory](http://ndb.nal.usda.gov)
