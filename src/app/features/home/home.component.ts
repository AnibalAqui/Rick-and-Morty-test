import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { debounceTime, Subscription, switchMap, tap } from 'rxjs';
import {
  CharactersResp,
  CharRespResult,
} from '../../core/services/characters/characters.interface';
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
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private charService = inject(CharactersService);
  isFavorites = false;
  characters: CharRespResult[] | undefined;
  visible = false;
  charater: CharRespResult | undefined;
  search = new FormControl();
  search$!: Subscription;
  searchValue: string | undefined;
  favorties: number[] = [];
  total = 0;

  ngOnDestroy(): void {
    this.search$.unsubscribe();
  }

  async ngOnInit() {
    this.search$ = this.search.valueChanges
      .pipe(
        debounceTime(300),
        tap((val) => (this.searchValue = val)),
        switchMap((val) =>
          this.charService.getCharacters({
            name: val,
          }),
        ),
      )
      .subscribe((response) => {
        this.characters = response.results;
        this.total = response.info.count;
      });
    await this.getCharacters();
  }

  async getCharacters() {
    const resp = await this.charService.getCharacters();
    if (resp) {
      this.characters = resp.results;
      this.total = resp.info.count;
    }
  }

  async onPageChange(e: PaginatorState) {
    const page = (e.page ?? 0) + 1;
    const resp = await this.charService.getCharacters({
      page,
      name: this.searchValue,
    });
    if (resp) {
      this.characters = resp.results;
      this.total = resp.info.count;
    }
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

  async favoritesFn() {
    this.isFavorites = !this.isFavorites;
    if (this.isFavorites) {
      const local = localStorage.getItem('favorites');
      if (local) {
        const favs: number[] = JSON.parse(local);
        const response = await this.charService.getCharactersById(favs);
        if (response) {
          this.characters = response;
          this.total = this.characters.length;
        }
      }
    } else {
      this.getCharacters();
    }
  }
}
