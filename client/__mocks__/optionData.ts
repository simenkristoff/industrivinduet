import { OptionEntity } from '@/types';

const optionsData: OptionEntity = {
  _id: '6029004d0c33a255c0a3d719',
  general: {
    sitename: 'Industrivinduet',
    email: 'post@industrivinduet.no',
    address: 'Gamle Kjemi, Gløshaugen Trondheim, Norge',
    showMaps: true,
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
};

export default optionsData;
