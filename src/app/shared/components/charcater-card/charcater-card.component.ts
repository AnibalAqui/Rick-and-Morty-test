import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { BehaviorSubject, Subject } from 'rxjs';
import { CharRespResult } from '../../../core/services/characters/characters.interface';

@Component({
  selector: 'app-charcater-card',
  imports: [ButtonModule],
  templateUrl: './charcater-card.component.html',
})
export class CharcaterCardComponent implements OnInit, OnChanges {
  @Input({ required: true }) character!: CharRespResult;
  @Output() clicked = new Subject<CharRespResult>();
  @Output() favorite = new Subject<number>();
  severity: ButtonSeverity = 'secondary';
  favorites: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      this.validateFavorites();
    }
  }

  ngOnInit(): void {
    this.validateFavorites();
  }

  validateFavorites() {
    this.severity = 'secondary';
    const local = localStorage.getItem('favorites');
    if (local) {
      this.favorites = JSON.parse(local);
    }
    if (this.favorites.includes(this.character.id)) {
      this.severity = 'help';
    }
  }

  onClick() {
    if (this.character) {
      this.clicked.next(this.character);
    }
  }

  addFavorite() {
    if (this.severity === 'secondary') {
      this.severity = 'help';
    } else {
      this.severity = 'secondary';
    }
    this.favorite.next(this.character.id);
  }
}
