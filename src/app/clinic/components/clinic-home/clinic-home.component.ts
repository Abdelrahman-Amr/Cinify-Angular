import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentWithoutRatingModel } from 'src/app/shared/model/appointment-without-rating-model';
import { AppointmentWithoutRatingService } from 'src/app/shared/services/appointment-without-rating.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-clinic-home',
  templateUrl: './clinic-home.component.html',
  styleUrls: ['./clinic-home.component.css']
})
export class ClinicHomeComponent implements AfterViewInit, OnInit {
  appointments: AppointmentWithoutRatingModel[] = [];
  displayedColumns: string[] = ['doctor.fullName', 'patient.fullName', 'date', 'time'];
  dataSource = new MatTableDataSource<AppointmentWithoutRatingModel>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private appointmentService: AppointmentWithoutRatingService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'doctor.fullName': return item.doctor.fullName;
        case 'patient.fullName': return item.patient.fullName;
        default: return (item as any)[property];
      }
    };
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadAppointments();
  }


  loadAppointments() {
    //replace with clinic id 
    this.appointmentService.getAppointmetsByClinicId(6).subscribe(
      (data: AppointmentWithoutRatingModel[]) => {
        this.dataSource.data = data;
        this.appointments = data;
        console.log("all appointments: ", data);
      }
    )
  }

  announceSortChange(sortState: Sort) {
    console.log("sort");

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
