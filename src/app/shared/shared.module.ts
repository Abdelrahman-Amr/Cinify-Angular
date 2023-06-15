import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    
  ],
  imports: [
    CommonModule,MatSelectModule,NgbModule,NgbCarouselModule
  ],
  exports:
    [
      FooterComponent,
      HeaderComponent,
      MatSelectModule,
      NgbCarouselModule
    ]
})
export class SharedModule { }
