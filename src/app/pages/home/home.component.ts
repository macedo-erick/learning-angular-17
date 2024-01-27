import { Component } from '@angular/core';
import { SkinService } from '../../services/skin/skin.service';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  tap
} from 'rxjs';
import { Skin } from '../../models/skin.model';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { SkinCardComponent } from '../../components/skin-card/skin-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    SkinCardComponent,
    NgOptimizedImage,
    NgTemplateOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [SkinService]
})
export class HomeComponent {
  skins$?: Observable<Skin[]>;
  filteredSkins$?: Observable<Skin[]>;
  pageTrigger$ = new Subject();

  searchFieldControl = new FormControl('');

  pageSize = 30;
  endIndex = 0;

  lastSearchTerm = '';

  comparator = (a: Skin, b: Skin) => a.name.localeCompare(b.name);

  constructor(private skinService: SkinService) {
    this.skins$ = this.skinService
      .getSkins()
      .pipe(tap((res) => console.log(res)));

    this.filteredSkins$ = combineLatest([
      this.skins$,
      this.searchFieldControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.pageTrigger$.pipe(startWith(''))
    ]).pipe(
      map(([skins, q]) => {
        this.endIndex = q !== this.lastSearchTerm ? 0 : this.endIndex;
        this.lastSearchTerm = String(q);

        const filteredSkins = q
          ? skins
              .filter((skin) => new RegExp(q, 'i').test(skin.name))
              .sort(this.comparator)
          : skins;

        this.endIndex += this.pageSize;

        return filteredSkins.slice(0, this.endIndex);
      })
    );
  }
}
