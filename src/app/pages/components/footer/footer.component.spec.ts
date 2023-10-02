import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'src/app/shared/components/breadcumb/breadcumb.component.spec';
import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock,
        },
      }), MatToolbarModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the language form', () => {
    component.setLanguageForm();

    expect(component.form).toBeDefined();
    expect(component.form instanceof FormGroup).toBeTruthy();

    expect(component.languageControl).toBeDefined();
    expect(component.languageControl instanceof FormControl).toBeTruthy();
    expect(component.languageControl.value).toBe(component._translate.currentLang);

  });
});
