import {BaseModel} from "./base-model";
import {CityModel} from "./city-model";

export class AreaModel extends BaseModel{
   city:CityModel;
   name:string;
}
