import { MemberEntity } from '@/types';

const membersData: MemberEntity[] = [
  {
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
  {
    _id: 'member2',
    name: {
      first: 'Marius',
      last: 'Skaar Nordby',
    },
    role: {
      roleType: 'Leder',
      group: {
        _id: 'group2',
        name: 'Bedrift',
      },
      _id: 'role3',
      name: 'Bedriftssjef',
    },
    email: 'marius.skaarnordby@industrivinduet.no',
    image:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg',
  },
  {
    _id: 'member3',
    name: {
      first: 'Jacob',
      last: 'Skaar Nordby',
    },
    role: {
      roleType: 'Medlem',
      group: {
        _id: 'group2',
        name: 'Bedrift',
      },
      _id: 'role4',
      name: 'Rekrutteringsansvarlig',
    },
    email: 'jacob.skaarnordby@industrivinduet.no',
  },
  {
    _id: 'member4',
    name: {
      first: 'Arild',
      last: 'Madsen',
    },
    role: {
      roleType: 'Leder',
      group: null,
      _id: 'role1',
      name: 'Daglig leder',
    },
    email: 'arild.madsen@industrivinduet.no',
    phone: '92103890',
    image:
      'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
  },
];

export default membersData;
