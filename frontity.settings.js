const settings = {
  "name": "artisandayluz",
  "state": {
    "frontity": {
      "url": "https://artisan.wildfreewalkingtours.com",
      "title": "Artisan Day Luz",
      "description": "WordPress installation for ArtisanDayLuz Website"
    }
  },
  "packages": [
    {
      "name": "artisandayluz-theme",
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": "https://artisan.wildfreewalkingtours.com/wp-json/",

          "params": {
            per_page: 100,
          },


          "postTypes": [

            {
              type: "allevents",
              endpoint: "allevents",
              archive: "allevents",
            },
          ],
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@aamodtgroup/frontity-contact-form-7"
  ]
};

export default settings;
