import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDoctorComponent} from "../edit-doctor/edit-doctor.component";
import {Form, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DoctorService} from "../../../shared/services/doctor.service";
import {AppointmentWithoutRatingService} from "../../../shared/services/appointment-without-rating.service";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {Constants} from "../../../shared/constatnts";
import {DoctorModel} from "../../../shared/model/doctor-model";
import {AppointmentWithoutRatingModel} from "../../../shared/model/appointment-without-rating-model";
import {AppointmentModel} from "../../../shared/model/appointment-model";

@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css']
})
export class ManageDoctorsComponent implements OnInit{
  doctors:DoctorModel[]=[];
  appointments:AppointmentWithoutRatingModel[]=[];
  // forms:FormGroup[][]=[];
  doctor=new DoctorModel();
  page:number=1;
  limit=5;
  totalCount=0;
  isLoading=true;

  flags:Map<number, boolean> = new Map<number, boolean>();
  forms:Map<number, FormGroup[]> = new Map<number, FormGroup[]>();
  imgUrl=Constants.downloadDoctorImgUrl+'doctor-clinic-illustration_1270-69.avif';

  constructor(private editDialog: MatDialog, private  formBuilder:FormBuilder,
              private doctorService:DoctorService,
              private appointmentService:AppointmentWithoutRatingService,
              private swAlertService:SwAlertService) {
  }
  ngOnInit(): void {
    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
      this.totalCount=value.totalCount;
      this.isLoading = false;
    });

    let app=new AppointmentModel();
    app.date=new Date();
    app.startTime=9.30;
    app.endTime=10.30;
    // this.appointments.push(app);

    for(let i=0;i<this.doctors.length;i++){
      this.flags.set(this.doctors[i].id, false);
      let appointment = this.formBuilder.group({
              from:[9.30],
              to:[10.00],
              date:[new Date()]
            });
      let arr:FormGroup[] =[];
      arr.push(appointment);
        this.forms.set(this.doctors[i].id,arr);
    }
    //   this.forms[i] = [];
      for(let j=0;j<this.doctors.length;j++){

      }
    //     this.forms[i][j] = [];
    //     let appointment = this.formBuilder.group({
    //       from:[9.30],
    //       to:[10.00],
    //       date:[new Date()]
    //     });
    //     this.forms[i][j].push(appointment);
    //
    //   }
    // }
    // console.log(this.forms);
  }

  editDoctor(doctor:DoctorModel, index:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '580px';
    // const data = new  UpdatePreviewData();
    // data.st = row;
    // data.sel = selection;
    dialogConfig.data = doctor;
    this.editDialog.open(EditDoctorComponent, dialogConfig).afterClosed().subscribe(()=>{
      this.doctorService.getDoctor(doctor.id).subscribe(value => {
        this.doctors[index]  = value;
      });
    });
  }

  editAppointments(docId:number){
    if(!this.flags.get(docId)){
      this.appointmentService.getFullAppointmentUpcomingByDoctorId(docId).subscribe(value => {
        this.appointments = value;
        this.createForms(docId);
        this.flags.set(docId,true);
      });

    }else{
      this.flags.set(docId,false);
    }

  }
  addAppointment(id:number){
    // for(let i=0;i<this.doctors.length;i++) {
    let app = this.formBuilder.group({
      id:[''],
      doctorId:[id],
      from:[''],
      to:[''],
      date:['']
    });
    // appointment.addControl(new FormControl());
    let arr:FormGroup[] =[];
    arr.push(app);
    // @ts-ignore
    this.forms.set(id,this.forms.get(id).concat(arr));
    // this.appointments.push(new AppointmentModel());
  }

  nextPage(){
    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
    });
  }

  createForms(docId:number){
    this.forms.set(docId,[]);
    for(let i=0;i<this.appointments.length;i++){
      this.flags.set(docId, false);
      let appointment = this.formBuilder.group({
        id:[this.appointments[i].id],
        doctorId:[this.appointments[i].doctor.id],
        from:[this.appointments[i].startTime],
        to:[this.appointments[i].endTime],
        date:[this.appointments[i].date]
      });

      // console.log(this.forms.get(this.doctors[i].id));
      let arr:FormGroup[] =[];
      arr.push(appointment);
      if(!this.forms.get(docId)){
        this.forms.set(docId,arr);
      }else {
        // @ts-ignore
        this.forms.set(docId, this.forms.get(docId).concat(arr));
      }

    }
  }

  saveApp(appointment:FormGroup){
      // console.log(appointment);
      let app = new AppointmentWithoutRatingModel();
      app.id = +appointment.controls['id']?.value;
      let doctor = new DoctorModel();
      doctor.id = +appointment.controls['doctorId'].value;
      app.doctor = doctor ;
      if(appointment.controls['to'].value.length==8){
        app.endTime = appointment.controls['to'].value;
      }else{
        app.endTime = appointment.controls['to'].value+":00";
      }

    if(appointment.controls['from'].value.length==8){
      app.startTime = appointment.controls['from'].value;
    }else{
      app.startTime = appointment.controls['from'].value+":00";
    }
    app.date = appointment.controls['date'].value;
console.log(app);
    this.appointmentService.updateAppointment(app).subscribe(value => {
        this.swAlertService.success("Saved Successfully");
      }, error => {
      this.swAlertService.fail("Failed to Save Appointment");
    });

  }
}
