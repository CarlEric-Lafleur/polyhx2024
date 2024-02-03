import { Component } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  name = 'Carlos lococo';
  rating = 4.5;

  currentImage: string = '../../../assets/img/default_profile.png';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.currentImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
