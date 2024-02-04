import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find-companion-page',
  templateUrl: './find-companion-page.component.html',
  styleUrl: './find-companion-page.component.scss',
})
export class FindCompanionPageComponent {
  points: number = 200;
  isInRide: boolean = false;
  isRideDone: boolean = false;

  drivers = [
    {
      name: 'Cameron Wilson',
      rating: 4.5,
      description: 'Je suis une bonne personne',
      vehicleType: 'Toyota Corolla',
      isElectric: true,
      phoneNumber: '123-456-7890',
      points: 200,
      image: '../../../assets/img/user1.png',
    },
    {
      name: 'Kayla Smith',
      rating: 2.8,
      description: 'Je suis très gentille',
      vehicleType: 'Auto vraiment cool',
      isElectric: false,
      phoneNumber: '514-111-2222',
      points: 200,
      image: '../../../assets/img/user2.png',
    },
    {
      name: 'Jean Dupont',
      rating: 3.8,
      description: 'Je suis serviable',
      vehicleType: 'hyundai accent',
      isElectric: false,
      phoneNumber: '450-234-3333',
      points: 200,
      image: '../../../assets/img/user3.png',
    },
  ];

  selectedDriver = this.drivers[Math.floor(Math.random() * 3)];

  constructor(private snackBar: MatSnackBar) {}

  joinRide(): void {
    let snackBarRef = this.snackBar.open(
      'Vous avez rejoint le trajet',
      'fermer',
      {
        duration: 3000,
      }
    );

    this.isInRide = true;
  }

  leaveRide(): void {
    let snackBarRef = this.snackBar.open(
      'Vous avez quitté le trajet',
      'fermer',
      {
        duration: 3000,
      }
    );

    this.isInRide = false;
  }

  finishRide(): void {
    this.isRideDone = true;
  }

  onRate(): void {
    this.isRideDone = false;
  }

  changeDriver(driver: number) {
    this.selectedDriver = this.drivers[driver];
  }
}
