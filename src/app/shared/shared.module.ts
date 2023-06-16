import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbCarouselModule , NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbDropdownModule
  ],
  exports:
  [
    FooterComponent,
    HeaderComponent,
    NgbCarouselModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
