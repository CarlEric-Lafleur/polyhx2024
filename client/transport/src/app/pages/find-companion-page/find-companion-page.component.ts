import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find-companion-page',
  templateUrl: './find-companion-page.component.html',
  styleUrl: './find-companion-page.component.scss',
})
export class FindCompanionPageComponent {
  description: string = 'Je suis une bonne personne';
  name = 'Carlos lococo';
  points: number = 200;
  isInRide: boolean = false;
  isRideDone: boolean = false;
  phoneNumber: string = '123-456-7890';

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
}
