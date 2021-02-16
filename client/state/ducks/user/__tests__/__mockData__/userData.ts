import { RegisterTokenInterface, UserEntity, UserPermissions } from '@/types';

export const registerToken = '3f62c4e1bfc00d93ef532bad256757dc538ad5cc5f6a252507114f26a81153cd';
export const registerExpires = new Date().getTime();

export const registerTokenData: RegisterTokenInterface = {
  token: registerToken,
};

export const registerPayload = {
  _id: 'user2',
  email: 'marius.skaarnordby@industrivinduet.no',
  permissions: UserPermissions.USER,
  isRoot: false,
  isRegistered: false,
  registerToken,
  registerExpires,
  member: null,
};

const userData: UserEntity[] = [
  {
    _id: 'user1',
    email: 'simen.kristoffersen98@gmail.com',
    permissions: UserPermissions.ADMIN,
    isRoot: false,
    isRegistered: true,
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
    isRoot: false,
    isRegistered: false,
    registerToken,
    registerExpires,
    member: null,
  },
];

export default userData;
