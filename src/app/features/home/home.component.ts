import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CharRespResult } from '../../core/services/characters/characters.interface';
import { CharactersService } from '../../core/services/characters/characters.service';
import { CardDialogComponent } from '../../shared/components/card-dialog/card-dialog.component';
import { CharcaterCardComponent } from '../../shared/components/charcater-card/charcater-card.component';

@Component({
  selector: 'app-home',
  imports: [
    InputGroup,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    CharcaterCardComponent,
    CardDialogComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private charService = inject(CharactersService);
  isFavorites = false;
  characters$!: Observable<CharRespResult[]>;
  visible = false;
  charater: CharRespResult | undefined;
  private page$ = new BehaviorSubject<number>(1);
  private favoritesMode$ = new BehaviorSubject<boolean>(false);
  search = new FormControl();
  searchValue: string | undefined;
  favorties: number[] = [];
  total = 0;

  ngOnInit() {
    this.characters$ = combineLatest([
      this.search.valueChanges.pipe(startWith('')),
      this.page$,
      this.favoritesMode$,
    ]).pipe(
      switchMap(([search, page, isFavorites]) => {
        if (isFavorites) {
          const local = localStorage.getItem('favorites');
          if (!local) return of([]);

          const favs: number[] = JSON.parse(local);
          if (favs.length === 0) return of([]);

          return this.charService.getCharactersById(favs).pipe(
            map((res) => (Array.isArray(res) ? res : [res])),
            tap((res) => (this.total = res.length)),
          );
        }

        return this.charService
          .getCharacters({
            name: search,
            page,
          })
          .pipe(
            tap((res) => (this.total = res.info.count)),
            map((res) => res.results),
          );
      }),
    );
  }

  onPageChange(e: PaginatorState) {
    this.page$.next((e.page ?? 0) + 1);
  }

  showDialog(e: CharRespResult) {
    this.visible = true;
    this.charater = e;
  }

  addToFavorites(e: number) {
    if (this.favorties.includes(e)) {
      const index = this.favorties.indexOf(e);
      this.favorties.splice(index, 1);
    } else {
      this.favorties.push(e);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorties));
  }

  favoritesFn() {
    this.favoritesMode$.next(!this.favoritesMode$.value);
  }
}
