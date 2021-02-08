import { RoleEntity } from '../../types';

const rolesData: RoleEntity[] = [
  {
    _id: 'role1',
    name: 'Daglig leder',
    roleType: 'Leder',
    group: null,
  },
  {
    _id: 'role2',
    name: 'Nestleder',
    roleType: 'Nestleder',
    group: null,
  },
  {
    _id: 'role3',
    name: 'Bedriftssjef',
    roleType: 'Leder',
    group: {
      _id: 'group2',
      name: 'Bedrift',
    },
  },
  {
    _id: 'role4',
    name: 'Rekrutteringsansvarlig',
    roleType: 'Medlem',
    group: {
      _id: 'group2',
      name: 'Bedrift',
    },
  },
];

export default rolesData;
