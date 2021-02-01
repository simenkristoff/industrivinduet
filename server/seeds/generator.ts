import { getObjectId, getObjectIds } from 'mongo-seeding';
import { Types } from 'mongoose';
/**
 * GENERATOR:
 * - Random generators for seeds
 *
 * Types:
 * - Name: {name: {first: String, last: String}, email: String}
 * - Company: {name: String, link: String, logo: String}
 *
 * Functions:
 * - randomBoolean: Boolean
 * - randomName: Name[]
 * - randomPhone: String
 * - randomPortrait: String
 * - randomDate: Date
 * - randomGrades: String[]
 * - randomStudyFields: ObjectId[]
 * - randomMember: ObjectId
 * - randomCompany: Company[]
 * - randomEventType: String[]
 * - randomJobType: String[]
 * - randomCampusPlace: String
 * - randomLocations: String[]
 * - generateDescription: String
 */

export namespace Generator {
  /* Random boolean */
  export function randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /* Random Name */
  interface Name {
    name: {
      first: string;
      last: string;
    };
    email: string;
  }
  const names = ['Simen', 'Peter', 'Frederik', 'Johannes', 'Marius', 'Arild', 'Jacob'];
  const lastNames = [
    'Kristoffersen',
    'Skaar Nordby',
    'Jomaas',
    'Reinseth',
    'Lindløkken',
    'Madsen',
    'Nordang',
  ];

  export function randomName(): Name {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * names.length)];

    return {
      name: {
        first: firstName,
        last: lastName,
      },
      email: `${firstName.toLowerCase()}.${lastName
        .replace(' ', '')
        .toLowerCase()}@industrivinduet.no`,
    };
  }

  /* Random Phone */
  export function randomPhone(): string {
    return Math.floor(Math.random() * 100000000).toString();
  }

  /* Random Portrait */
  const portraits: Array<string> = [
    'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
    'https://lh3.googleusercontent.com/proxy/pjJvQ8SJpL6KoffX92ZBg0OBt1KuXPcJ8R5SsG_vR1b1pScOuqkF2mbmTdhrEGVwJBwB3zTLfcZBX52yKjgrwGl9ti8dAvQDJ-fG8avG24UrvvOkYu0Skqz7ix2ui8M3NSSfhQSGXA2GRIMNgUdxgjivNX5TvONjf1k7PBwtd1anvZSDU17JNKjPwsFAQw',
  ];
  export function randomPortrait(): string {
    const randomInt: number = Math.floor(Math.random() * portraits.length);

    return portraits[randomInt];
  }

  /* Random date */

  export function randomDate(): Date {
    const start: Date = new Date(2020, 1, 1, 0, 0);
    const end: Date = new Date(2022, 12, 31, 24, 59);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /* Random Grades */
  const grades: string[] = ['1', '2', '3', '4', '5'];

  export function randomGrades(): Array<string> {
    const amount: number = Math.floor(Math.random() * grades.length);
    const output: Array<string> = [];
    for (var i = 0; i < amount; i++) {
      let selector: number = Math.floor(Math.random() * grades.length);
      while (output.includes(grades[selector])) {
        selector = Math.floor(Math.random() * grades.length);
      }
      output.push(grades[selector]);
    }

    return output;
  }

  /* Random Studyfields */
  const studyfieldIds: Array<string> = ['puma', 'eps', 'ledsys', 'indmek'];

  export function randomStudyFields(): Types.ObjectId[] {
    const amount: number = Math.floor(Math.random() * studyfieldIds.length);
    const output: Array<string> = [];
    for (var i = 0; i < amount; i++) {
      let selector: number = Math.floor(Math.random() * studyfieldIds.length);
      while (output.includes(studyfieldIds[selector])) {
        selector = Math.floor(Math.random() * studyfieldIds.length);
      }
      output.push(studyfieldIds[selector]);
    }

    return getObjectIds(output);
  }

  /* Random Members */

  export function randomMember(): Types.ObjectId {
    const randomInt: number = Math.floor(Math.random() * 15);

    return getObjectId(`member-${randomInt}`);
  }

  /* Random Companies */
  interface Company {
    name: string;
    link: string;
    logo: string;
  }
  const companies: Company[] = [
    {
      name: 'Kongsberg',
      link: 'https://www.kongsberg.com/',
      logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Kongsberg_Gruppen_logo.svg/1200px-Kongsberg_Gruppen_logo.svg.png',
    },
    {
      name: 'Kværner',
      link: 'https://www.akersolutions.com/',
      logo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kv%C3%A6rner_logo.svg/1200px-Kv%C3%A6rner_logo.svg.png',
    },
    {
      name: 'Schlumberger',
      link: 'https://www.slb.com/',
      logo: 'https://1000logos.net/wp-content/uploads/2020/09/Schlumberger-Logo.png',
    },
    {
      name: 'DNV-GL',
      link: 'https://www.dnvgl.com/index.html',
      logo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/DNV_GL_logo.svg/1200px-DNV_GL_logo.svg.png',
    },
    {
      name: 'COWI',
      link: 'https://www.cowi.no/',
      logo: 'https://dwglogo.com/wp-content/uploads/2016/02/COWI_a-s_logo.png',
    },
    {
      name: 'Equinor',
      link: 'https://www.equinor.com/en.html',
      logo: 'https://www.3mw.no/wp-content/uploads/2018/08/LOGO-EQUINOR.png',
    },
  ];

  export function randomCompany(): Company {
    const randomInt: number = Math.floor(Math.random() * companies.length);

    return companies[randomInt];
  }

  /* Random EventType */
  const eventTypes: Array<string> = ['Bedriftspresentasjon', 'Workshop', 'Case', 'Foredrag'];
  export function randomEventType(): string {
    const randomInt: number = Math.floor(Math.random() * eventTypes.length);

    return eventTypes[randomInt];
  }

  /* Random JobType */
  const jobTypes: Array<string> = ['Heltid', 'Deltid', 'Sommerjobb'];
  export function randomJobType(): string {
    const randomInt: number = Math.floor(Math.random() * jobTypes.length);

    return jobTypes[randomInt];
  }

  /* Random CampusPlace */
  const campusPlaces: Array<string> = [
    'Hangaren',
    'Kjelhuset',
    'Kje2',
    'VE2',
    'PU-lab',
    'S1',
    'S2',
    'S3',
  ];
  export function randomCampusPlace(): string {
    const randomInt: number = Math.floor(Math.random() * campusPlaces.length);

    return campusPlaces[randomInt];
  }

  /* Random Locations */
  const locations: Array<string> = [
    'Oslo',
    'Bergen',
    'Stavanger',
    'Trondheim',
    'Kristiansand',
    'Molde',
    'Ålesund',
  ];

  export function randomLocations(): Array<string> {
    const amount: number = Math.floor(Math.random() * locations.length);
    const output: Array<string> = [];
    for (var i = 0; i < amount; i++) {
      let selector: number = Math.floor(Math.random() * locations.length);
      while (output.includes(locations[selector])) {
        selector = Math.floor(Math.random() * locations.length);
      }
      output.push(locations[selector]);
    }

    return output;
  }

  /* Generate Description */
  export function generateDescription(paragraphs: number): string {
    let output: string = '';
    for (var i = 0; i <= paragraphs; i++) {
      output +=
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus, est a semper fringilla, risus mi aliquam ipsum, a aliquet risus leo et erat. Sed venenatis rutrum magna sit amet vehicula. Sed feugiat augue at magna condimentum, quis facilisis neque ullamcorper. Aliquam erat volutpat. Nam rhoncus, dui ut semper suscipit, nibh mauris aliquam dolor, in dignissim mauris nulla elementum metus. Donec eros tortor, sollicitudin a ante ac, imperdiet interdum tortor. Donec id urna justo. Morbi eu diam sed nulla sagittis sodales suscipit sed lectus. Etiam a elementum velit. Nullam auctor ante quis neque lobortis sagittis. Nullam ut massa lorem. Donec rutrum tincidunt lectus vitae vehicula.</p>';
    }

    return output;
  }
}
