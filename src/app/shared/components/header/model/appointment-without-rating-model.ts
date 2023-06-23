import {BaseModel} from "./base-model";
import {DoctorModel} from "./doctor-model";
import {PatientModel} from "./patient-model";

export class AppointmentWithoutRatingModel extends BaseModel{
  startTime:string;
  doctor:DoctorModel;
   patient:PatientModel;
   date:Date;
   endTime:string;
   creditCardLastFourDigits:string;

}
