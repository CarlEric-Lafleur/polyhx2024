import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  name = 'Carlos lococo';
  rating = 4.5;
  @Input() description: string = 'Je suis une bonne personne';
  isDriver: boolean = false;
  vehicleType: string = 'Toyote Corolla';
  isElectric: boolean = false;
  phoneNumber: string = '123-456-7890';
  points: number = 100;

  currentImage: string = '../../../assets/img/default_profile.png';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.currentImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  changeDriverStatus(): void {
    this.isDriver = true;
  }

  saveProfile(): void {
    console.log('Profile saved');
  }
}
