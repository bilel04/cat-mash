import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VoteCatComponent } from './vote-cat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreadcumbComponent } from 'src/app/shared/components/breadcumb/breadcumb.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'src/app/shared/components/breadcumb/breadcumb.component.spec';
import { Router } from '@angular/router';
import { CatsService } from 'src/app/shared/services/cats.service';
import { Cat } from 'src/app/shared/classes/cat';
import { BehaviorSubject, of } from 'rxjs';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

describe('VoteCatComponent', () => {
  let component: VoteCatComponent;
  let fixture: ComponentFixture<VoteCatComponent>;
  let router: Router;
  let _catsService: CatsService;
  const simulatedCats: Cat[] = [{ id: '1', url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg', score: 0 },
  { id: '2', url: 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg', score: 0 }, { id: '3', url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg', score: 0 },
  { id: '4', url: 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg', score: 0 }];
  let cats$ = new BehaviorSubject<Cat[]>([]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteCatComponent, BreadcumbComponent],
      providers: [Router, CatsService],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock,
        },
      })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VoteCatComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    _catsService = TestBed.inject(CatsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "cats" if cats$ is empty', () => {
    cats$.next([]);
    component.cats = cats$.getValue();
    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    component.navigateDisplayCatsPage();
    expect(navigateSpy).toHaveBeenCalledWith(['cats']);
  });

  it('should call initDisplayedCats if cats$ is not empty', () => {
    spyOn(cats$, 'getValue').and.returnValue(simulatedCats);
    component.cats = cats$.getValue();
    fixture.detectChanges();
    expect(cats$.getValue).toHaveBeenCalled();
  });

  it('should set displayCatOne and displayCatTwo with two different random cats', () => {
    component.getTwoRandomCats(simulatedCats);

    expect(component.displayCatOne).toBeDefined();
    expect(component.displayCatTwo).toBeDefined();
    expect(component.displayCatOne).not.toEqual(component.displayCatTwo);
  });


  it('should not change the score if the cat ID is not found', () => {
    component.cats = simulatedCats;

    component.voteCat('6');

    expect(component.cats).toEqual(simulatedCats);

    const getTwoRandomCatsSpy = spyOn(component, 'getTwoRandomCats');
    expect(getTwoRandomCatsSpy).not.toHaveBeenCalled();
  });

  it('should increase the score of a cat and call getTwoRandomCats', () => {
    component.cats = simulatedCats;

    component.voteCat('2');

    const cat2 = component.cats.find(cat => cat.id === '2');
    expect(cat2?.score).toBe(1);

    const getTwoRandomCatsSpy = spyOn(component, 'getTwoRandomCats');
    component.voteCat('1');
    expect(getTwoRandomCatsSpy).toHaveBeenCalled();
  });


  it('should call setCats if cats is not empty', () => {
    component.cats = simulatedCats;
    const setCatsSpy = spyOn(_catsService, 'setCats');

    component.ngOnDestroy();

    expect(setCatsSpy).toHaveBeenCalledWith(simulatedCats);
  });

  it('should not call setCats if cats is empty', () => {
    component.cats = [];
    const setCatsSpy = spyOn(_catsService, 'setCats');

    component.ngOnDestroy();
    expect(setCatsSpy).not.toHaveBeenCalled();
  });


});
