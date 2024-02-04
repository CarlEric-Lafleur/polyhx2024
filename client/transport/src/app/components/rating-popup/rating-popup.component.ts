import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrl: './rating-popup.component.scss',
})
export class RatingPopupComponent {
  rating: number = 0;
  @Output() rated: EventEmitter<number> = new EventEmitter<number>();

  rate(value: number) {
    this.rating = value;
  }

  submitRating() {
    this.rated.emit();
  }
}
