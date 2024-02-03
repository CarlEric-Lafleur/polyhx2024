import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rating: number = 3.5;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
