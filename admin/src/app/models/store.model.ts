import { Member } from './member.model';
import { Status } from './status.model';

export type Store = {
  address: string;
  amount: number;
  altTel: string;
  comment: string;
  draft: string;
  id: string;
  assigned?: Omit<Member, 'stores'>;
  last?: {
    amount: number;
    uid: Member['uid'];
    name: Member['name'];
  };
  name: string;
  needAttention: boolean;
  notes: string;
  status: Status;
  tel: string;
  visible: boolean;
};
