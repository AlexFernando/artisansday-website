const settings = [
  
  //ENGLISH SITE
  {
    "name": "artisandayluz",
    "state": {
      "frontity": {
        "url": "https://artisandayluz.com",
        "title": "Artisan Day Luz",
        "description": "WordPress installation for ArtisanDayLuz Website"
      },

      "theme":{
        "lang": "en"
      }
    },
    "packages": [
      {
        "name": "artisandayluz-theme",
        "state": {
          "theme": {
            "menu": [
              ["Home", "/"],
              ["About", "/about/"],
              ["Full Program", "/fullprogram/"],
              ["Main Event", "/mainevent/"],            
              ["Contact", "/contact/"]
            ],
            "featured": {
              "showOnList": true,
              "showOnPost": true
            },
            // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
            autoPrefetch: "hover"
          }
        }
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
  },

  //SPANISH SITE
  {
    "name": "artisandayluz-spanish",
    "match": [".*artisandayluz.com\/es(\/.*)?$"],
    "state": {
      "frontity": {
        "url": "https://artisandayluz.com/es/",
        "title": "Artisan Day Luz",
        "description": "WordPress installation for ArtisanDayLuz Website"
      },
      "theme":{
        "lang": "es"
      }
    },
    "packages": [
      {
        "name": "artisandayluz-theme",
        "state": {
          "theme": {
            "menu": [
              ["Inicio", "/es/"],
              ["Acerca de", "/es/about/"],
              ["Programa Completo", "/es/fullprogram/"],
              ["Evento Principal", "/es/mainevent/"],            
              ["Contacto", "/es/contact/"]
            ],
            "featured": {
              "showOnList": true,
              "showOnPost": true
            },
            // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
            autoPrefetch: "hover"
          }
        }
      },
      {
        "name": "@frontity/wp-source",
        "state": {
          "source": {
            "api": "https://artisan.wildfreewalkingtours.com/es/wp-json/",
               "subdirectory": "/es",
          "homepage": "/homepage",
          "params": {
            "lang": "es",
          },

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
  },

    //FRENCH SITE
    {
      "name": "artisandayluz-french",
      "match": [".*artisandayluz.com\/fr(\/.*)?$"],
      "state": {
        "frontity": {
          "url": "https://artisandayluz.com/fr/",
          "title": "Artisan Day Luz",
          "description": "WordPress installation for ArtisanDayLuz Website"
        },
        "theme":{
          "lang": "fr"
        }
      },
      "packages": [
        {
          "name": "artisandayluz-theme",
          "state": {
            "theme": {
              "menu": [
                ["Début", "/fr/"],
                ["À propos de", "/fr/about/"],
                ["Programme Complet", "/fr/fullprogram/"],
                ["Événement principal", "/fr/mainevent/"],            
                ["Contact", "/fr/contact/"]
              ],
              "featured": {
                "showOnList": true,
                "showOnPost": true
              },
              // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
              autoPrefetch: "hover"
            }
          }
        },
        {
          "name": "@frontity/wp-source",
          "state": {
            "source": {
              "api": "https://artisan.wildfreewalkingtours.com/fr/wp-json/",
                 "subdirectory": "/fr",
            "homepage": "/homepage",
            "params": {
              "lang": "fr",
            },
  
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
    }
  

]

export default settings;
