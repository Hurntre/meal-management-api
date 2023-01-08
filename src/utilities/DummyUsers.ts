import { Role } from '../auth/enums/role.enum';

export const Users = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@gmail.com',
    token: 'MjA.F24QA5r-P4rfF1lZF-O5458OX3EoeY_GVGAHv1Okf42hzFyhSaLvXVJTnZQE',
    role: Role.User,
  },
  {
    id: 2,
    name: 'admin',
    email: 'admin@gmail.com',
    token: 'Mjc1.qI_NjaiE8gqNDAvEv5jbCCkkiTj-qGsSXJOYOfLwLgtQ-iIuNfCS3jDGAQ_b',
    role: Role.Admin,
  },
];
