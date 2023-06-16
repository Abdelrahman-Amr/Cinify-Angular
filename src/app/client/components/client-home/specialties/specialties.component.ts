
import { Component , HostListener } from '@angular/core';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent {
    imagePath = 'assets/images';
  	showNavigationArrows = false;
  	showNavigationIndicators = false;
    isSmallScreen: boolean;
  	images: string[] = ["assets/images/R.jpg","assets/images/x.jpg","assets/images/R.jpg","assets/images/x.jpg","assets/images/R.jpg","assets/images/x.jpg","assets/images/R.jpg","assets/images/x.jpg"]
	// images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  	

//   ngAfterViewInit() {
//       // Initialize the carousel
//       $(document).ready(() => {
//         $('#carouselExampleIndicators').carousel();
//       });
//     }
constructor() {
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
    return Array(Math.ceil(this.images.length / 4)).fill(0).map((_, i) => i);
  }
  
  getCarouselImages(index: number): string[] {
    const start = index * 4;
    return this.images.slice(start, start + 4);
  }
  
}
