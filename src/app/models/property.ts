import {Landlord} from "./landlord";

export class Property {
  id: number;
  rooms: number;
  size: number;
  cost: number;
  active: boolean;
  address: string;
  place: string;
  landlordId: number;
  districtId: number;
}
