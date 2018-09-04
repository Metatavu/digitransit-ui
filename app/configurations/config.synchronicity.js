const CONFIG = 'synchronicity';
const API_URL = process.env.API_URL || 'https://dev-api.digitransit.fi';
const MAP_URL =
  process.env.MAP_URL || 'https://digitransit-dev-cdn-origin.azureedge.net';
const APP_DESCRIPTION = 'Puhtaan ilman reittiopas';
const YEAR = 1900 + new Date().getYear();

export default {
  CONFIG,

  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/routers/hsl/`,
    STOP_MAP: `${MAP_URL}/map/v1/hsl-stop-map/`,
    CITYBIKE_MAP: `${MAP_URL}/map/v1/hsl-citybike-map/`,
    PARK_AND_RIDE_MAP: `${MAP_URL}/map/v1/hsl-parkandride-map/`,
    TICKET_SALES_MAP: `${MAP_URL}/map/v1/hsl-ticket-sales-map/`
  },

  contactName: {
    sv: '',
    fi: '',
    default: '',
  },

  title: 'Puhtaan ilman reittiopas',

  availableLanguages: ['fi', 'en'],
  defaultLanguage: 'fi',

  favicon: './sass/themes/hsl/icon_favicon-reittiopas.svg',

  feedIds: ['HSL'],

  preferredAgency: 'HSL',
  showHSLTracking: true,

  defaultMapCenter: {
    lat: 60.1710688,
    lon: 24.9414841,
  },

  nearbyRoutes: {
    radius: 2000,
    bucketSize: 100,
  },

  maxWalkDistance: 2500,
  itineraryFiltering: 2.5, // drops 40% worse routes

  parkAndRide: {
    showParkAndRide: true,
    parkAndRideMinZoom: 14,
  },

  ticketSales: {
    showTicketSales: true,
    ticketSalesMinZoom: 16,
  },

  stopsMinZoom: 14,

  colors: {
    primary: '#007ac9',
  },

  sprites: 'svg-sprite.hsl.svg',

  appBarLink: { name: 'SynchroniCity', href: 'https://synchronicity-iot.eu/' },

  nationalServiceLink: { name: 'matka.fi', href: 'https://opas.matka.fi/' },

  agency: {
    show: false,
  },

  socialMedia: {
    title: 'Puhtaan ilman reittiopas',
    description: APP_DESCRIPTION,

    image: {
      url: '/img/hsl-social-share.png',
      width: 400,
      height: 400,
    },

    twitter: {
      card: 'summary',
      site: '@HSL_HRT',
    },
  },

  meta: {
    description: APP_DESCRIPTION,
  },

  showTicketInformation: false,
  ticketLink: 'https://www.hsl.fi/liput-ja-hinnat',

 // Control what transport modes that should be possible to select in the UI
  // and whether the transport mode is used in trip planning by default.
  transportModes: {
    bus: {
      availableForSelection: true,
      defaultValue: false,
    },

    tram: {
      availableForSelection: true,
      defaultValue: false,
    },

    rail: {
      availableForSelection: true,
      defaultValue: false,
    },

    subway: {
      availableForSelection: true,
      defaultValue: false,
    },

    citybike: {
      availableForSelection: true, // TODO: Turn off in autumn
      defaultValue: false, // always false
    },

    airplane: {
      availableForSelection: true,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: true,
      defaultValue: false,
    },
  },

  streetModes: {
    walk: {
      availableForSelection: true,
      defaultValue: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: false,
      defaultValue: false,
      icon: 'car_park-withoutBox',
    },
  },

  useSearchPolygon: true,

  areaPolygon: [
    [25.5345, 60.2592],
    [25.3881, 60.1693],
    [25.3559, 60.103],
    [25.3293, 59.9371],
    [24.2831, 59.78402],
    [24.2721, 59.95501],
    [24.2899, 60.00895],
    [24.3087, 60.01947],
    [24.1994, 60.12753],
    [24.1362, 60.1114],
    [24.1305, 60.12847],
    [24.099, 60.1405],
    [24.0179, 60.1512],
    [24.0049, 60.1901],
    [24.0445, 60.1918],
    [24.0373, 60.2036],
    [24.0796, 60.2298],
    [24.1652, 60.2428],
    [24.3095, 60.2965],
    [24.3455, 60.2488],
    [24.428, 60.3002],
    [24.5015, 60.2872],
    [24.4888, 60.3306],
    [24.5625, 60.3142],
    [24.5957, 60.3242],
    [24.6264, 60.3597],
    [24.666, 60.3638],
    [24.7436, 60.3441],
    [24.9291, 60.4523],
    [24.974, 60.5253],
    [24.9355, 60.5131],
    [24.8971, 60.562],
    [25.0388, 60.5806],
    [25.1508, 60.5167],
    [25.1312, 60.4938],
    [25.0385, 60.512],
    [25.057, 60.4897],
    [25.0612, 60.4485],
    [25.1221, 60.4474],
    [25.1188, 60.4583],
    [25.149, 60.4621],
    [25.1693, 60.5062],
    [25.2242, 60.5016],
    [25.3661, 60.4118],
    [25.3652, 60.3756],
    [25.5345, 60.2592],
  ],

  footer: {
    content: [
      {
        name: 'about-this-service',
        nameEn: 'About the service',
        route: '/tietoja-palvelusta',
        icon: 'icon-icon_info',
      },
      {
        name: 'footer-feedback',
        nameEn: 'Submit feedback',
        href: 'https://goo.gl/forms/gtcYRseqQFx9eOy13',
        icon: 'icon-icon_speech-bubble',
      },
      { label: '<img src="https://cdn.metatavu.io/assets/synchronicity/eu.png"></img>' },
      { 
        label: '<img src="https://cdn.metatavu.io/assets/synchronicity/metatavu.png"></img>',
        href: 'https://www.metatavu.fi/puhtaan-ilman-reittiopas-synchronicity/'
      }
    ],
  },

  defaultEndpoint: {
    address: 'Rautatieasema, Helsinki',
    lat: 60.1710688,
    lon: 24.9414841,
  },

  defaultOrigins: [
    {
      icon: 'icon-icon_rail',
      label: 'Rautatieasema, Helsinki',
      lat: 60.1710688,
      lon: 24.9414841,
    },
    {
      icon: 'icon-icon_airplane',
      label: 'Lentoasema, Vantaa',
      lat: 60.317429,
      lon: 24.9690395,
    },
    {
      icon: 'icon-icon_bus',
      label: 'Kampin bussiterminaali, Helsinki',
      lat: 60.16902,
      lon: 24.931702,
    },
  ],

  redirectReittiopasParams: true,
  queryMaxAgeDays: 14, // to drop too old route request times from entry url

  aboutThisService: {
    fi: [
      {
        header: 'Tietoja palvelusta',
        paragraphs: [
          'Tervetuloa kokeilemaan puhtaan ilman reittiopasta, jonka avulla voit valita kävely- ja pyöräilyreitin ilmanlaadun mukaan. Reittiopas on osa EU-rahoitteista SynchroniCity-hanketta ja se on tehty HSL:n kanssa yhteistyössä. Toteutuksesta vastaa Forum Virium Helsinki.',
        ],
      },
      {
        header: 'Tietolähteet',
        paragraphs: [
          'Kartat, tiedot kaduista, rakennuksista, pysäkkien sijainnista ynnä muusta tarjoaa © OpenStreetMap contributors. Osoitetiedot tuodaan Väestörekisterikeskuksen rakennustietorekisteristä. Joukkoliikenteen reitit ja aikataulut perustuvat HSL:n JORE-aineistoon.',
        ],
      },
    ],

    sv: [
    ],

    en: [
      {
        header: 'About this service',
        paragraphs: [
          'Welcome to test a clean air journey planner prototype. The application allows you to choose a walking and cycling route based on air quality. The route guide is made by Forum Virium Helsinki in co-operation with Helsinki Regional Transport Authority as a part of the EU-funded SynchroniCity project.',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Maps, streets, buildings, stop locations etc. are provided by © OpenStreetMap contributors. Address data is retrieved from the Building and Dwelling Register of the Finnish Population Register Center. Public transport routes and timetables are based on JORE data of HSL.',
        ],
      },
    ],
  },

  fareMapping: {
    'HSL:hki': 'HSL:hki',
    'HSL:hki2': 'HSL:hki',
    'HSL:esp': 'HSL:esp',
    'HSL:esp2': 'HSL:esp',
    'HSL:van': 'HSL:van',
    'HSL:van2': 'HSL:van',
    'HSL:ker': 'HSL:ker',
    'HSL:kir': 'HSL:kir',
    'HSL:seu': 'HSL:seu',
    'HSL:seu2': 'HSL:seu',
    'HSL:seu3': 'HSL:seu',
    'HSL:seu4': 'HSL:seu',
    'HSL:seu5': 'HSL:seu',
    'HSL:lse': 'HSL:lse',
    'HSL:lse2': 'HSL:lse',
    'HSL:lse3': 'HSL:lse',
    'HSL:lse4': 'HSL:lse',
    'HSL:lse5': 'HSL:lse',
    'HSL:lse6': 'HSL:lse',
    'HSL:kse': 'HSL:kse',
    'HSL:kse1': 'HSL:kse',
    'HSL:kse2': 'HSL:kse',
    'HSL:kse3': 'HSL:kse',
    'HSL:kse4': 'HSL:kse',
    'HSL:kse5': 'HSL:kse',
    'HSL:kse6': 'HSL:kse',
    'HSL:kse7': 'HSL:kse',
    'HSL:kse8': 'HSL:kse',
    'HSL:kse9': 'HSL:kse',
    'HSL:kse10': 'HSL:kse',
    'HSL:kse11': 'HSL:kse',
    'HSL:kse12': 'HSL:kse',
    'HSL:kse13': 'HSL:kse',
    'HSL:kse14': 'HSL:kse',
    'HSL:kse15': 'HSL:kse',
    'HSL:kse16': 'HSL:kse',
  },

  staticMessages: [
    {
      id: '2',
      content: {
        fi: [
          {
            type: 'text',
            content:
              'Tervetuloa kokeilemaan puhtaan ilman reittiopasta, jonka avulla voit valita kävely- ja pyöräilyreitin ilmanlaadun mukaan. Reittiopas on osa EU-rahoitteista SynchroniCity-hanketta ja se on tehty HSL:n kanssa yhteistyössä. Toteutuksesta vastaa Forum Virium Helsinki. Käytämme evästeitä palveluidemme kehitykseen. Käyttämällä sivustoa hyväksyt evästeiden käytön.',
          }
        ],
        en: [
          {
            type: 'text',
            content:
              'Welcome to test a clean air journey planner prototype. The application allows you to choose a walking and cycling route based on air quality. The route guide is made by Forum Virium Helsinki in co-operation with Helsinki Regional Transport Authority as a part of the EU-funded SynchroniCity project. We use cookies to improve our services. By using this site, you agree to its use of cookies.',
          }
        ],
        sv: [
          {
            type: 'text',
            content:
              'Vi använder cookies för att utveckla våra tjänster. Genom att använda webbplatsen godkänner du att vi använder cookies. Läs mer: ',
          }
        ],
      },
    },
  ],
  staticMessagesUrl: '',
};
