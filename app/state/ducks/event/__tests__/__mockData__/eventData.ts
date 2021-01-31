import { EventEntity } from '../../types';

const eventsData: EventEntity[] = [
  {
    _id: 'event1',
    title: 'Foredrag med Kongsberg',
    type: 'Foredrag',
    date: new Date(),
    starttime: new Date(),
    endtime: new Date(),
    place: 'PU-lab',
    dining: 'Kjelhuset',
    description:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus, est a semper fringilla, risus mi aliquam ipsum, a aliquet risus leo et erat. Sed venenatis rutrum magna sit amet vehicula. Sed feugiat augue at magna condimentum, quis facilisis neque ullamcorper. Aliquam erat volutpat. Nam rhoncus, dui ut semper suscipit, nibh mauris aliquam dolor, in dignissim mauris nulla elementum metus. Donec eros tortor, sollicitudin a ante ac, imperdiet interdum tortor. Donec id urna justo. Morbi eu diam sed nulla sagittis sodales suscipit sed lectus. Etiam a elementum velit. Nullam auctor ante quis neque lobortis sagittis. Nullam ut massa lorem. Donec rutrum tincidunt lectus vitae vehicula.</p>',
    grades: ['1', '2', '3', '4'],
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Kongsberg_Gruppen_logo.svg/1200px-Kongsberg_Gruppen_logo.svg.png',
    link: 'https://www.ntnu.no/studier/mtprod/oppbygning/pm',
    studyfields: [
      {
        _id: 'puma',
        name: 'Produktutvikling og materialer',
        abbr: 'Puma',
        description:
          '<p><span style="color: #272833; font-family: \'Open Sans\', Arial, sans-serif; font-size: 16px; background-color: #ffffff;">Ved denne studieretningen vil du arbeide med metoder og teknikker knyttet til produktutvikling, eller med materialvalg og teknikker knyttet til forming av materialer. Livsl&oslash;psegenskaper til produkter og komponenter st&aring;r sentralt, samtidig som kreativitet og innovasjon dyrkes.</span></p>',
        link: 'https://www.ntnu.no/studier/mtprod/oppbygning/pm',
      },
      {
        _id: 'eps',
        name: 'Energi-, prosess og strømningsteknikk',
        abbr: 'EPS',
        description:
          '<p><span style="color: #272833; font-family: \'Open Sans\', Arial, sans-serif; font-size: 16px; background-color: #ffffff;">Denne studieretningen omfatter hele energikjeden, fra elektrisitet, kulde- og varmeproduksjon til sluttbruk av energi i industri og bygninger. Vi arbeider med systemer basert p&aring; fornybar energi, s&aring;vel som naturgass og olje.</span></p>',
        link: 'https://www.ntnu.no/studier/mtprod/oppbygning/ep',
      },
    ],
    member: {
      _id: 'member1',
      name: {
        first: 'Simen',
        last: 'Kristoffersen',
      },
      role: null,
      email: 'simen.kristoffersen98@gmail.com',
      phone: '90360922',
      image:
        'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
    },
  },
  {
    _id: 'event2',
    title: 'Foredrag med Schlumberger',
    type: 'Foredrag',
    date: new Date(),
    starttime: new Date(),
    endtime: new Date(),
    place: 'PU-lab',
    dining: 'Kjelhuset',
    description:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus, est a semper fringilla, risus mi aliquam ipsum, a aliquet risus leo et erat. Sed venenatis rutrum magna sit amet vehicula. Sed feugiat augue at magna condimentum, quis facilisis neque ullamcorper. Aliquam erat volutpat. Nam rhoncus, dui ut semper suscipit, nibh mauris aliquam dolor, in dignissim mauris nulla elementum metus. Donec eros tortor, sollicitudin a ante ac, imperdiet interdum tortor. Donec id urna justo. Morbi eu diam sed nulla sagittis sodales suscipit sed lectus. Etiam a elementum velit. Nullam auctor ante quis neque lobortis sagittis. Nullam ut massa lorem. Donec rutrum tincidunt lectus vitae vehicula.</p>',
    grades: ['1', '2', '3', '4', '5', '6'],
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Kongsberg_Gruppen_logo.svg/1200px-Kongsberg_Gruppen_logo.svg.png',
    link: 'https://www.ntnu.no/studier/mtprod/oppbygning/pm',
    studyfields: [
      {
        _id: 'puma',
        name: 'Produktutvikling og materialer',
        abbr: 'Puma',
        description:
          '<p><span style="color: #272833; font-family: \'Open Sans\', Arial, sans-serif; font-size: 16px; background-color: #ffffff;">Ved denne studieretningen vil du arbeide med metoder og teknikker knyttet til produktutvikling, eller med materialvalg og teknikker knyttet til forming av materialer. Livsl&oslash;psegenskaper til produkter og komponenter st&aring;r sentralt, samtidig som kreativitet og innovasjon dyrkes.</span></p>',
        link: 'https://www.ntnu.no/studier/mtprod/oppbygning/pm',
      },
      {
        _id: 'eps',
        name: 'Energi-, prosess og strømningsteknikk',
        abbr: 'EPS',
        description:
          '<p><span style="color: #272833; font-family: \'Open Sans\', Arial, sans-serif; font-size: 16px; background-color: #ffffff;">Denne studieretningen omfatter hele energikjeden, fra elektrisitet, kulde- og varmeproduksjon til sluttbruk av energi i industri og bygninger. Vi arbeider med systemer basert p&aring; fornybar energi, s&aring;vel som naturgass og olje.</span></p>',
        link: 'https://www.ntnu.no/studier/mtprod/oppbygning/ep',
      },
    ],
    member: {
      _id: 'member1',
      name: {
        first: 'Simen',
        last: 'Kristoffersen',
      },
      role: null,
      email: 'simen.kristoffersen98@gmail.com',
      phone: '90360922',
      image:
        'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
    },
  },
];

export default eventsData;
