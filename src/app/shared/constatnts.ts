import {environment} from "../../environments/environment";

export class Constants {

  public static readonly baseURL = environment.baseURL;
  public static readonly baseAuthURL = environment.baseAuthURL;
  public static readonly redirectURI = environment.redirectURI;


  // Security APIs
  public static readonly loginURL = this.baseAuthURL+'/login';
  public static readonly authURL = this.baseAuthURL+'/oauth2/authorize';
  public static readonly jwtURL = this.baseAuthURL+'/oauth2/token';
  public static readonly test = this.baseAuthURL+'/test';

  //Patient
  public static readonly getPatientDataURL = this.baseURL + '/patients/data';

  //Doctor URLs
  public static readonly getAllDoctorsUrl = this.baseURL + '/doctors/all';
  public static readonly getDoctorsPageUrl = this.baseURL + '/doctors/getPage';
  public static readonly getDoctorsPageByClinicUrl = this.baseURL + '/doctors/getPageByClinic/';

  public static readonly getDoctor = this.baseURL + '/doctors/';
  public static readonly updateDoctorURL = this.baseURL + '/doctors/updateDoctor';
  public static readonly deleteDoctorUrl = this.baseURL + '/doctors/delete/';
  public static readonly addDoctorURL = this.baseURL + '/doctors/addDoctor';
  public static readonly uploadDoctorImgUrl = environment.baseURL + '/doctors/upload';
  public static readonly downloadDoctorImgUrl = environment.baseURL + '/doctors/download/';



  // Doctor Titles Urls
  public static readonly getAllDoctorTitlesUrl = this.baseURL + '/doctorTitles/all';
  public static readonly getDoctorTitle = this.baseURL + '/doctorTitles/';
  public static readonly updateDoctorTitleURL = this.baseURL + '/doctorTitles/update';
  public static readonly deleteDoctorTitleUrl = this.baseURL + '/doctorTitles/delete/';
  public static readonly addDoctorTitleURL = this.baseURL + '/doctorTitles/add';


  // Doctor Specs Urls
  public static readonly getAllDoctorSpecsUrl = this.baseURL + '/doctorSpecs/all';
  public static readonly getDoctorSpec = this.baseURL + '/doctorSpecs/';
  public static readonly updateDoctorSpecURL = this.baseURL + '/doctorSpecs/update';
  public static readonly deleteDoctorSpecUrl = this.baseURL + '/doctorSpecs/delete/';
  public static readonly addDoctorSpecURL = this.baseURL + '/doctorSpecs/add';


  // Clinic Urls
  public static readonly getAllClinicsUrl = this.baseURL + '/clinics/all';
  public static readonly getClinicURL = this.baseURL + '/clinics/';
  public static readonly updateClinicURL = this.baseURL + '/clinics/update';
  public static readonly deleteClinicUrl = this.baseURL + '/clinics/delete/';
  public static readonly addClinictUrl = this.baseURL + '/clinics/addClinic';
  public static readonly getClinicDataURL = this.baseURL + '/clinics/data';


  // AppointmentWithoutRating Urls
  public static readonly getAllAppointmentWithoutRatingsUrl = this.baseURL + '/appointmentsForClinics/all';
  public static readonly getAppointmentWithoutRatingURL = this.baseURL + '/appointmentsForClinics/';
  public static readonly updateAppointmentWithoutRatingURL = this.baseURL + '/appointmentsForClinics/update';
  public static readonly deleteAppointmentWithoutRatingUrl = this.baseURL + '/appointmentsForClinics/delete/';
  public static readonly addAppointmentWithoutRatingURL = this.baseURL + '/appointmentsForClinics/add';
  public static readonly bookAppointmentUrl = this.baseURL + '/appointmentsForClinics/book/';

  // public static readonly getAppointmentByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/';
  // public static readonly getAppointmentUpcomingByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/upcoming/';

  public static readonly getFullAppointmentByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/full/';
  public static readonly getFullAppointmentUpcomingByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/full/upcoming/';

  public static readonly getDividedAppointmentByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/divided/';
  public static readonly getDividedAppointmentUpcomingByDoctorIdURL = this.baseURL + '/appointmentsForClinics/byDoctorId/divided/upcoming/';

  //Appointments
  public static readonly getAllPatientAppointments=this.baseURL+'/appointments/byPatientId/'
  public static readonly CancelPatientAppointment=this.baseURL+'/appointments/cancelAppointment/'

//Areas
  public static readonly getAllAreasUrl=this.baseURL+ '/areas/all';
  public static readonly getAreaByCityUrl=this.baseURL+ '/areas/areasByCityId/';


//Cities
  public static readonly getAllCities=this.baseURL+'/cities/all'


  //Patient URLs
  public static readonly addPatientUrl = this.baseURL + '/patients/addPatient';




  /* Validation Regex */
  public static readonly ENGLISH_CHARACTERS = '^[a-zA-Z ]+$';
  public static readonly ARABIC_CHARACTERS = '^[\\u0621-\\u064A ]+$';
  public static readonly DIGITS_ONLY_14 = '^[0-9]{14}$';
  public static readonly DIGITS_ONLY_11 = '^[01][0-9]{10}$';
  public static readonly FLOAT_NUMBERS = '^([0-9]*[.])?[0-9]+$';
  public static readonly DIGITS_ONLY = '^\\d+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS = '^[a-zA-Z0-9 ]+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH = '^[a-zA-Z0-9- ]*$';

  public static readonly EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

}
