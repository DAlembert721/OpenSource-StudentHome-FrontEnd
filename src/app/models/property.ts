import {Landlord} from "./landlord";

export class Property {
  id: number;
  rooms: number;
  size: number;
  cost: number;
  active: boolean;
  address: string;
  place: number;
  title: string;
  description: string;
  landLordId: number;
  landLordFirstName: string;
  landLordLastName: string;
}
