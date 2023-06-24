import {BaseModel} from "./base-model";

export  class DoctorTitleModel extends BaseModel{
  name:string;

  constructor(id:number) {
    super();
    this.id  = id;
  }
}
