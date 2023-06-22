import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbCarouselModule , NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbDropdownModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule
  ],
  exports:
  [
    FooterComponent,
    HeaderComponent,
    NgbCarouselModule,
    NgbDropdownModule,
    MatSelectModule,
    NgbCarouselModule,
    MatCardModule
  ]
})
export class SharedModule { }
