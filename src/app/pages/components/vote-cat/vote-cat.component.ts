import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/@core/router-enum';
import { Cat } from 'src/app/shared/classes/cat';
import { CatsService } from 'src/app/shared/services/cats.service';

@Component({
  selector: 'app-vote-cat',
  templateUrl: './vote-cat.component.html',
  styleUrls: ['./vote-cat.component.scss']
})
export class VoteCatComponent {
  title: string = RouterEnum.VOTE_CAT;
  displayCatOne!: Cat;
  displayCatTwo!: Cat;
  cats: Cat[] = [];
  constructor(
    private _catsService: CatsService,
    private _router: Router
  ) {

  }

  navigateDisplayCatsPage() {
    this._router.navigate(['cats']);
  }

  getTwoRandomCats(cats: Cat[]) {
    const indexCatOne = Math.floor(Math.random() * cats.length);
    let indexCatTwo = Math.floor(Math.random() * cats.length);

    while (cats[indexCatOne].id === cats[indexCatTwo].id) {
      indexCatTwo = Math.floor(Math.random() * cats.length);
    }
    this.displayCatOne = cats[indexCatOne];
    this.displayCatTwo = cats[indexCatTwo];
  }

  voteCat(id: string) {
    this.cats = this.cats.filter(cat => {
      if (cat.id === id) cat.score += 1;
      return cat
    })
    this.getTwoRandomCats(this.cats);
  }

  ngOnDestroy() {
    if (this.cats.length != 0) this._catsService.setCats(this.cats);
  }

  ngOnInit() {
    if (this._catsService.checkSubjectCats().length === 0) this.navigateDisplayCatsPage();
    else {
      this._catsService.cats$.subscribe(cats => {
        this.cats = cats;
        this.getTwoRandomCats(cats);
      })
    }
  }
}
