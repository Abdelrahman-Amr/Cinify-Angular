import { AppointmentModel } from "./appointment-model";
import { BaseModel } from "./base-model";
import { DoctorModel } from "./doctor-model";

export class PatientAppointment extends AppointmentModel{
    doctor:DoctorModel;
    status:String;
}
