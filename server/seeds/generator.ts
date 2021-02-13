import { getObjectId, getObjectIds } from 'mongo-seeding';
import { Types } from 'mongoose';

import { StudyField, Member } from '../types';
/**
 * This namespace includes functions for generating random values for documents.
 *
 * @function randomBoolean
 * @function randomName
 * @function randomPhone
 * @function randomPortrait
 * @function randomDate
 * @function randomGrades
 * @function randomStudyFields
 * @function randomMember
 * @function randomCompany
 * @function randomEventType
 * @function randomJobType
 * @function randomCampusPlace
 * @function randomLocations
 * @function generateDescription
 */
export namespace Generator {
  /**
   * Random boolean generator
   * @namespace Generator
   * @returns {boolean} boolean
   */
  export function randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Name interface
   * @interface Name
   */
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

  /**
   * Random name generator
   * @namespace Generator
   * @returns {Name} name
   */
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

  /**
   * Random phone number generator
   * @namespace Generator
   * @returns {string} phone number
   */
  export function randomPhone(): string {
    return Math.floor(Math.random() * 100000000).toString();
  }

  const portraits: Array<string> = ['profiler/default.png'];

  /**
   * Random portrait generator
   * @namespace Generator
   * @returns {string} image url
   */
  export function randomPortrait(): string {
    const randomInt: number = Math.floor(Math.random() * portraits.length);

    return portraits[randomInt];
  }

  /**
   * Random date generator
   * @namespace Generator
   * @returns {Date} date
   */
  export function randomDate(): Date {
    const start: Date = new Date(2020, 1, 1, 0, 0);
    const end: Date = new Date(2022, 12, 31, 24, 59);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  const grades: string[] = ['1', '2', '3', '4', '5'];

  /**
   * Random grades generator
   * @namespace Generator
   * @returns {string[]} grades
   */
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

  const studyfieldIds: Array<string> = ['puma', 'eps', 'ledsys', 'indmek'];

  /**
   * Random studyfield generator
   * @namespace Generator
   * @returns {StudyField[]} studyfields
   */
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

  /**
   * Random member generator
   * @namespace Generator
   * @returns {Member} member
   */
  export function randomMember(): Types.ObjectId {
    const randomInt: number = Math.floor(Math.random() * 15);

    return getObjectId(`member-${randomInt}`);
  }

  interface Company {
    name: string;
    link: string;
    logo: string;
  }

  const companies: Company[] = [
    {
      name: 'Kongsberg',
      link: 'https://www.kongsberg.com/',
      logo: 'bedrifter/kongsberg.png',
    },
    {
      name: 'Kværner',
      link: 'https://www.akersolutions.com/',
      logo: 'bedrifter/kvaerner.png',
    },
    {
      name: 'Schlumberger',
      link: 'https://www.slb.com/',
      logo: 'bedrifter/schlumberger.png',
    },
    {
      name: 'DNV-GL',
      link: 'https://www.dnvgl.com/index.html',
      logo: 'bedrifter/dnv-gl.png',
    },
    {
      name: 'COWI',
      link: 'https://www.cowi.no/',
      logo: 'bedrifter/cowi.png',
    },
    {
      name: 'Equinor',
      link: 'https://www.equinor.com/en.html',
      logo: 'bedrifter/equinor.png',
    },
  ];

  /**
   * Random company generator
   * @namespace Generator
   * @returns {Company} company
   */
  export function randomCompany(): Company {
    const randomInt: number = Math.floor(Math.random() * companies.length);

    return companies[randomInt];
  }

  const eventTypes: Array<string> = ['Bedriftspresentasjon', 'Workshop', 'Case', 'Foredrag'];

  /**
   * Random event type generator
   * @namespace Generator
   * @returns {string} event type
   */
  export function randomEventType(): string {
    const randomInt: number = Math.floor(Math.random() * eventTypes.length);

    return eventTypes[randomInt];
  }

  const jobTypes: Array<string> = ['Heltid', 'Deltid', 'Sommerjobb'];

  /**
   * Random job type generator
   * @namespace Generator
   * @returns {string} job type
   */
  export function randomJobType(): string {
    const randomInt: number = Math.floor(Math.random() * jobTypes.length);

    return jobTypes[randomInt];
  }

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

  /**
   * Random campus place generator
   * @namespace Generator
   * @returns {string} location at campus
   */
  export function randomCampusPlace(): string {
    const randomInt: number = Math.floor(Math.random() * campusPlaces.length);

    return campusPlaces[randomInt];
  }

  const locations: Array<string> = [
    'Oslo',
    'Bergen',
    'Stavanger',
    'Trondheim',
    'Kristiansand',
    'Molde',
    'Ålesund',
  ];

  /**
   * Random location generator
   * @namespace Generator
   * @returns {string[]} locations in Norway
   */
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

  /**
   * Random description generator
   * @namespace Generator
   * @returns {string} lorem ipsum text
   */
  export function generateDescription(paragraphs: number): string {
    let output: string = '';
    for (var i = 0; i <= paragraphs; i++) {
      output +=
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus, est a semper fringilla, risus mi aliquam ipsum, a aliquet risus leo et erat. Sed venenatis rutrum magna sit amet vehicula. Sed feugiat augue at magna condimentum, quis facilisis neque ullamcorper. Aliquam erat volutpat. Nam rhoncus, dui ut semper suscipit, nibh mauris aliquam dolor, in dignissim mauris nulla elementum metus. Donec eros tortor, sollicitudin a ante ac, imperdiet interdum tortor. Donec id urna justo. Morbi eu diam sed nulla sagittis sodales suscipit sed lectus. Etiam a elementum velit. Nullam auctor ante quis neque lobortis sagittis. Nullam ut massa lorem. Donec rutrum tincidunt lectus vitae vehicula.</p>';
    }

    return output;
  }
}
