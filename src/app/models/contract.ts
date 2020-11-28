import {ContractState} from './contract-state.enum';

export class Contract {
  id: number;
  description: string;
  amount: number;
  state: ContractState;
  createdAt: Date;
  firstNameStudent: string;
  lastNameStudent: string;
  studentId: number;
  propertyId: number;
}
