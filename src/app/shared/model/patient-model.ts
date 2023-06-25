import {BaseModel} from "./base-model";
import {AreaModel} from "./area-model";
import {CityModel} from "./city-model";

export class PatientModel extends BaseModel{

   area:AreaModel;
   city:CityModel;
   phoneNumber:string;
   password:string;
   fullName:string;
   birthDate:Date;
   gender:string;
   address:string;
   preperationTime:number;
   isDeleted:boolean;
   email:string;

}
