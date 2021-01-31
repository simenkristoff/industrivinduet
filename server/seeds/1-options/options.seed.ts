import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { OptionBase } from '../../models';

interface OptionSeed extends OptionBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

const options: OptionSeed = {
  _id: getObjectId('options'),
  general: {
    sitename: 'Industrivinduet',
    email: 'post@industrivinduet.no',
    address: 'Gamle Kjemi, Gløshaugen Trondheim, Norge',
    phone: '',
    organization: '996056009',
    about:
      '<p>Industrivinduet er A/F Smørekoppens bedriftskontakt. Vi jobber for å fremme kontakt mellom næringslivet og studentene ved Produktutvikling og Produksjon</p>',
  },
  event: {
    homepage: {
      displayEvents: true,
      numberOfEvents: 3,
    },
    eventTypes: ['Bedriftspresentasjon', 'Workshop', 'Case', 'Foredrag'],
  },
  job: {
    homepage: {
      displayJobs: true,
      numberOfJobs: 3,
    },
    jobTypes: ['Heltid', 'Deltid', 'Sommerjobb'],
  },
  socials: {
    facebook: {
      name: 'Industrivinduet',
      link: 'https://www.facebook.com/industrivinduet/',
    },
    instagram: {
      name: 'Industrivinduet',
      link: 'https://www.instagram.com/industrivinduet/',
    },
    linkedin: {
      name: 'Industrivinduet, NTNU',
      link: 'https://www.linkedin.com/company/industrivinduet-ntnu',
    },
  },
  _v: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export = options;
