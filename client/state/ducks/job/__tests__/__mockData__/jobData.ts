import { JobEntity } from '../../types';

const jobsData: JobEntity[] = [
  {
    _id: 'job1',
    company: 'Schlumberger',
    title: 'Sommerjobb hos Schlumberger',
    type: 'Foredrag',
    startdate: new Date(),
    deadline: new Date(),
    places: ['Oslo', 'Trondheim'],
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
    active: true,
  },
  {
    _id: 'job2',
    company: 'Kongsberg',
    title: 'Sommerjobb hos Kongsberg',
    type: 'Foredrag',
    startdate: new Date(),
    deadline: new Date(),
    places: ['Oslo', 'Trondheim'],
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
    active: true,
  },
];

export default jobsData;
