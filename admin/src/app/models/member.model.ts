import { Commute } from './commute.model';
import { Store } from './store.model';

export type Member = {
  uid: string;
  studentNumber: number;
  name: string;
  job: string;
  currentAddress: string;
  isHomeInHiroshima: boolean;
  homeAddress: string;
  comment: string;
  stores: Omit<Store, 'assigned'>[];
  commute: { [key in Commute]?: boolean };
  isAdmin: boolean;
};
