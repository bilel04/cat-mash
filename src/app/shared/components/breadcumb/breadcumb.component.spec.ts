import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { BreadcumbComponent } from './breadcumb.component';

export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({ key1: 'valeur1', key2: 'valeur2' });
  }
}

describe('BreadcumbComponent', () => {
  let component: BreadcumbComponent;
  let fixture: ComponentFixture<BreadcumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock, 
        },
      })],
      declarations: [BreadcumbComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreadcumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
