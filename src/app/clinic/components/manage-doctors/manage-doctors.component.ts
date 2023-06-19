import {Component, OnInit} from '@angular/core';
import {DoctorModel} from "../../../shared/model/clinic/doctor-model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDoctorComponent} from "../edit-doctor/edit-doctor.component";
import {AppointmentModel} from "../../../shared/model/clinic/appointment-model";
import {Form, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css']
})
export class ManageDoctorsComponent implements OnInit{
  doctors:DoctorModel[]=[];
  appointments:AppointmentModel[]=[];
  // forms:FormGroup[][]=[];
  doctor=new DoctorModel();
  doctor2=new DoctorModel();

  flags:Map<number, boolean> = new Map<number, boolean>();
  forms:Map<number, FormGroup[]> = new Map<number, FormGroup[]>();

  constructor(private editDialog: MatDialog, private  formBuilder:FormBuilder) {
  }
  ngOnInit(): void {

    this.doctor.fullName="Abdo Amr";
    this.doctor.doctorTitle="Doctor";
    this.doctor.averageRating=3;
    this.doctor.clinic="clinic";
    this.doctor.ticketPrice=200;
    this.doctor.phoneNumber="01111315033";
    this.doctor.id=1;
    this.doctors.push(this.doctor);

    this.doctor2.fullName="Abdo Amr";
    this.doctor2.doctorTitle="Doctor";
    this.doctor2.averageRating=3;
    this.doctor2.clinic="clinic";
    this.doctor2.ticketPrice=200;
    this.doctor.doctorSpecialization="eyes";
    this.doctor.doctorSpecialization="eyes";
    this.doctor2.doctorSpecialization="eyes";
    this.doctor2.id=2;

    this.doctors.push(this.doctor2);

    let app=new AppointmentModel();
    app.date=new Date();
    app.startTime=9.30;
    app.endTime=10.30;
    this.appointments.push(app);

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

  editDoctor(doctor:DoctorModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '540px';
    // const data = new  UpdatePreviewData();
    // data.st = row;
    // data.sel = selection;
    dialogConfig.data = doctor;
    this.editDialog.open(EditDoctorComponent, dialogConfig);
  }

  editAppointments(id:number){
      this.flags.set(id,!this.flags.get(id));
}
  addAppointment(id:number){
    // for(let i=0;i<this.doctors.length;i++) {
    let appointment = this.formBuilder.group({
      from:[9.30],
      to:[10.00],
      date:[new Date()]
    });
    let arr:FormGroup[] =[];
    arr.push(appointment);
    // @ts-ignore
    this.forms.set(id,this.forms.get(id).concat(arr));
    this.appointments.push(new AppointmentModel());
  }
}
