import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/@core/router-enum';
import { Cat } from 'src/app/shared/classes/cat';
import { Page } from 'src/app/shared/classes/page';
import { CatsService } from 'src/app/shared/services/cats.service';

@Component({
  selector: 'app-display-cats',
  templateUrl: './display-cats.component.html',
  styleUrls: ['./display-cats.component.scss']
})
export class DisplayCatsComponent {
  cats: Cat[] = [];
  title = RouterEnum.CATS;
  page: Page = {
    pageSize: 10,
    pageNumber: 0,
    totalRows: 0
  }
  totalRows!: number;
  disabledLoadButton: boolean = false;
  constructor(
    private _catsService: CatsService,
    private _router: Router
  ) {

  }

  getAllCats() {
    if (this._catsService.checkLocalStorage() === null || this._catsService.checkLocalStorage() === 'undefined') {
      this._catsService.getAllCats().subscribe(r => {
        this._catsService.setCats(r);
        this.totalRows = r.length;
        this.cats = r.slice(0, this.page.pageSize);
      });
      return;
    }
    const cats = JSON.parse(this._catsService.checkLocalStorage() as string);
    this.cats = cats.slice(0, this.page.pageSize);
    this.totalRows = cats.length;
    if (this._catsService.checkSubjectCats().length === 0) {
      this._catsService.fillSubjectCat(cats);
    }

  }

  loadCats() {
    this.page.pageNumber += 1;
    this._catsService.getPaginatedCats(this.page).subscribe(r => {
      this.cats.push(...r);
      this.disabledLoadButton = this.cats.length === this.totalRows ?? false;
    })
  }

  navigateVotePage() {
    this._router.navigate(['cats/vote-cat']).then();
  }

  ngOnInit() {
    this.getAllCats();
  }
}
