
import { Component, HostListener } from '@angular/core';
import { specialitiesSlides } from './specialities-data';
import { Slide } from './slide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})


export class SpecialtiesComponent {
  
  slides: Slide[] = specialitiesSlides;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  isSmallScreen: boolean;

  //   ngAfterViewInit() {
  //       // Initialize the carousel
  //       $(document).ready(() => {
  //         $('#carouselExampleIndicators').carousel();
  //       });
  //     }
  constructor(private router: Router) {
    this.checkScreenSize();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 480; // Set the maximum width for mobile devices
  }

  getCarouselIndices(): number[] {
    return Array(Math.ceil(this.slides.length / 4)).fill(0).map((_, i) => i);
  }

  getCarouselImages(index: number): Slide[] {
    const start = index * 4;
    return this.slides.slice(start, start + 4);
  }

  openUrl(speciality: string) {
    this.router.navigate(["doctor",speciality,"Egypt"])
  }

}
