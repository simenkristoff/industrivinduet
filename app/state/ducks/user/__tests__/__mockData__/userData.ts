import { UserEntity, UserPermissions } from '../../types';

const userData: UserEntity[] = [
  {
    _id: 'user1',
    email: 'simen.kristoffersen98@gmail.com',
    permissions: UserPermissions.ADMIN,
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
    _id: 'user2',
    email: 'marius.skaarnordby@industrivinduet.no',
    permissions: UserPermissions.USER,
    member: {
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
  },
];

export default userData;
