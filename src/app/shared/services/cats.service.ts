import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cat } from '../classes/cat';
import { Page } from '../classes/page';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  _api = 'https://latelier.co/data/cats.json';
  cats$: BehaviorSubject<Cat[]> = new BehaviorSubject<Cat[]>([]);

  constructor(
    private _http: HttpClient
  ) {

  }

  setCats(cats: Cat[]) {
    this.fillSubjectCat(cats);
    localStorage.setItem('cats', JSON.stringify(cats));
  }

  fillSubjectCat(cats: Cat[]) {
    this.cats$.next(cats);
  }

  checkSubjectCats() {
    return this.cats$.getValue();
  }

  checkLocalStorage() {
    return localStorage.getItem('cats');
  }


  getAllCats(): Observable<Cat[]> {
    return this._http.get<Observable<Cat[]>>(this._api).pipe(
      map((data: any) => {
        return data.images.map((cat: Cat) => new Cat(cat.id, cat.url));
      })
    );
  }

  getPaginatedCats(page: Page) {
    return this.cats$.pipe(
      map((data) => data.slice(page.pageNumber * page.pageSize, page.pageSize * (page.pageNumber + 1)))
    )
  }
}
