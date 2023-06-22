import {BaseModel} from "./base-model";
import {DoctorTitleModel} from "./doctor-title-model";
import {DoctorSpecializationModel} from "./doctor-specialization-model";
import {ClinicModel} from "./clinic-model";

export class DoctorModel extends BaseModel{

    doctorTitle:DoctorTitleModel;
    clinic:ClinicModel;
     doctorSpecialization:DoctorSpecializationModel;
     fullName:string;
     phoneNumber:string;
     ticketPrice:number;
     averageRating:number;
     ratingCount:number;
     status:string;
     isDeleted:boolean


}
