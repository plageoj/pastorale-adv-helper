import { Member } from './member.model';
import { Store } from './store.model';

export type History = {
  id: string;
  storeId: Store['id'];
  memberId: Member['uid'];
  memberName: Member['name'];
  amount: number;
  notes: string;
  draft: string;
  year: number;
};
