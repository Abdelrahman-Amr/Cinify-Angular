import {BaseModel} from "./base-model";
import {AreaModel} from "./area-model";
import {CityModel} from "./city-model";

export class ClinicModel extends BaseModel{
  area:AreaModel;
  city:CityModel;
  username:string;
  password:string;
  name:string;
  phoneNumber:string;
  email:string;
  address:string;
  status:string;
  isDeleted:boolean;

  constructor(id:number) {
    super();
    this.id  = id;
  }

}
