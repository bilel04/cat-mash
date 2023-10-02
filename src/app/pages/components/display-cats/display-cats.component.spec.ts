import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DisplayCatsComponent } from './display-cats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreadcumbComponent } from 'src/app/shared/components/breadcumb/breadcumb.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'src/app/shared/components/breadcumb/breadcumb.component.spec';
import { Router } from '@angular/router';
import { Page } from 'src/app/shared/classes/page';
import { CatsService } from 'src/app/shared/services/cats.service';
import { of } from 'rxjs';
import { Cat } from 'src/app/shared/classes/cat';
import { MatCardModule } from '@angular/material/card';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

describe('DisplayCatsComponent', () => {
  let component: DisplayCatsComponent;
  let fixture: ComponentFixture<DisplayCatsComponent>;
  let router: Router;
  let _catsService: CatsService;
  const simulatedCats: Cat[] = [{ id: '1', url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg', score: 0 },
  { id: '2', url: 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg', score: 0 }, { id: '3', url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg', score: 0 },
  { id: '4', url: 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg', score: 0 }];
  let page: Page = {
    pageSize: 10,
    pageNumber: 0,
    totalRows: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCatsComponent, BreadcumbComponent],
      providers: [Router, CatsService],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock,
        },
      }), MatCardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayCatsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    _catsService = TestBed.inject(CatsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to vote-cat page', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');

    component.navigateVotePage();

    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['cats/vote-cat']);
  }));

  it('should local storage be empty', fakeAsync(() => {
    spyOn(_catsService, 'checkLocalStorage').and.returnValue(null);

    const getAllCatsSpy = spyOn(_catsService, 'getAllCats').and.returnValue(of(simulatedCats));

    component.initCats();

    tick();

    expect(getAllCatsSpy).toHaveBeenCalled();
    expect(component.cats).toEqual(simulatedCats.slice(0, component.page.pageSize));
    expect(component.totalRows).toBe(simulatedCats.length);
  }));

  it('should init cat data from local storage', fakeAsync(() => {
    const checkLocalStorageSpy = spyOn(_catsService, 'checkLocalStorage').and.returnValue(JSON.stringify(simulatedCats));

    component.initCats();

    tick();

    expect(checkLocalStorageSpy).toHaveBeenCalled();
    expect(component.cats).toEqual(simulatedCats.slice(0, component.page.pageSize));
    expect(component.totalRows).toBe(simulatedCats.length);
  }));
});