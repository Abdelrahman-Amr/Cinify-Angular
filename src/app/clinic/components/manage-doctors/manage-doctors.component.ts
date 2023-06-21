import {Component, OnInit} from '@angular/core';
import {DoctorModel} from "../../../shared/model/doctor-model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDoctorComponent} from "../edit-doctor/edit-doctor.component";
import {AppointmentModel} from "../../../shared/model/appointment-model";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {DoctorService} from "../../../shared/services/doctor.service";

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
  page:number=1;
  limit=5;
  totalCount=0;

  flags:Map<number, boolean> = new Map<number, boolean>();
  forms:Map<number, FormGroup[]> = new Map<number, FormGroup[]>();

  constructor(private editDialog: MatDialog, private  formBuilder:FormBuilder,
              private doctorService:DoctorService) {
  }
  ngOnInit(): void {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
      this.totalCount=value.totalCount;
    });

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

  editDoctor(doctor:DoctorModel, index:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '540px';
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

  nextPage(){
    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
    });
  }
}
