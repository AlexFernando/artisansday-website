const settings = {
  "name": "artisandayluz",
  "state": {
    "frontity": {
      "url": "http://chp.multiviral.cloud",
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
          "api": "http://chp.multiviral.cloud/wp-json",

          "postTypes": [

            {
              type: "allevents",
              endpoint: "allevents",
              archive: "allevents",
            },

            {
              type: 'tribe_events',
              endpoint: 'tribe/events/v1/events',
              archive: '/events'
            }
          ],
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
