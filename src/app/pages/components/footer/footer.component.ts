import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LANG } from 'src/app/@core/lang';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  languages = LANG;
  form!: FormGroup<{ language: any; }>;
  languageControl!: FormControl<string | null>;


  constructor(
    public _translate: TranslateService
  ) {
    if (this._translate.getBrowserLang() !== undefined) {
      this._translate.use(this._translate.getBrowserLang() ?? '');
    } else {
      this._translate.use('fr');
    }
    this.setLanguageForm();
  }

  setLanguageForm() {
    this.languageControl = new FormControl(this._translate.currentLang);
    this.form = new FormGroup({
      language: this.languageControl,
    });
  }

  ngOnInit() {

  }
}
