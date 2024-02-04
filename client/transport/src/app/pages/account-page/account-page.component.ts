import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private httpClient: HttpClient) {}

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

  getProfile(): void {
    this.httpClient
      .get<{
        name: string;
        description: string;
        isDriver: boolean;
        vehicleType: string;
        isElectric: boolean;
        phoneNumber: string;
        points: number;
      }>('http://localhost:5000/getProfile')
      .subscribe((data) => {
        this.name = data.name;
        this.description = data.description;
        this.isDriver = data.isDriver;
        this.vehicleType = data.vehicleType;
        this.isElectric = data.isElectric;
        this.phoneNumber = data.phoneNumber;
        this.points = data.points;
      });
  }

  saveProfile(): void {
    this.httpClient.post('http://localhost:5000/saveProfile', {
      name: this.name,
      description: this.description,
      isDriver: this.isDriver,
      vehicleType: this.vehicleType,
      isElectric: this.isElectric,
      phoneNumber: this.phoneNumber,
      points: this.points,
    });
  }
}
