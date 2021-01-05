import { Url } from 'url';

export type Permissions = {
  _id: string;
  name: string;
};

export type User = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  permissions?: Array<Permissions<string>>;
  accessToken?: string;
};

export type Group = {
  _id?: string;
  name: string;
  updatedAt?: string;
};

export type Role = {
  _id: string;
  name: string;
  group: Group;
  updatedAt: string;
};

export type Member = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  _id: string;
  title: string;
  type: string;
  date: string;
  starttime: string;
  endtime: string;
  place: string;
  dining: string;
  description: string;
  image: string;
  member: Member;
  createdAt: string;
  updatedAt: string;
};

export interface Options {
  homepage: {
    events: number;
    jobs: number;
  };
  event: {
    types: Array<string>;
  };
  job: {
    types: Array<string>;
  };
  details: {
    name: string;
    email: string;
    address: string;
    organization: string;
    about: string;
  };
  socials: {
    facebook: {
      name: string;
      url: Url;
    };
    instagram: {
      name: string;
      url: Url;
    };
    linkedin: {
      name: string;
      url: Url;
    };
  };
}

export interface UserState {
  isLoggedIn: boolean;
  currentUser: User;
  userErr: [];
}

export interface GroupState {
  groups: Group[];
  group: Group;
}

export interface RoleState {
  roles: Role[];
  role: Role;
}

export interface MemberState {
  members: Member[];
  member: Member;
}

export interface EventState {
  events: Event[];
  event: Event;
}

export interface OptionsState {
  options: Options;
}

export interface RootState {
  user: UserState;
  groupsData: GroupState;
  rolesData: RoleState;
  membersData: MemberState;
  eventsData: EventState;
  optionsData: OptionsState;
}
