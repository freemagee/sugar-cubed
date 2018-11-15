export default {
  apiKey: process.env.VUE_APP_APIKEY,
  endPoints: {
    search: "https://api.nal.usda.gov/ndb/search/?",
    reports: "https://api.nal.usda.gov/ndb/reports/?",
    nutrients: "https://api.nal.usda.gov/ndb/nutrients/?"
  },
  nutrients: {
    sugar: {
      id: "269"
    }
  }
};
