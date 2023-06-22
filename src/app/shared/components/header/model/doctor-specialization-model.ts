import {BaseModel} from "./base-model";

export class DoctorSpecializationModel extends BaseModel{
  name:string;

  constructor(id:number) {
    super();
    this.id  = id;
  }
}
