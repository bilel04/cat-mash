import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayCatsComponent } from './pages/components/display-cats/display-cats.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SharedModule } from 'src/app/shared/shared.module';
import { VoteCatComponent } from './pages/components/vote-cat/vote-cat.component';
import { PathMatch } from './@core/path-match';
import { FooterComponent } from './pages/components/footer/footer.component';

registerLocaleData(localeFr, 'fr'); // Définier la langue fr comme étant langue locale, je l'utilise dans le but d'afficher le currency code après le montant de produit.

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: 'cats', loadChildren: () => import('./pages/modules/cats/cats.module').then(m => m.CatsModule) },
  { path: '', redirectTo: 'cats', pathMatch: 'full' as PathMatch },
  { path: '**', redirectTo: 'cats' },
];

@NgModule({
  declarations: [
    AppComponent,
    DisplayCatsComponent,
    VoteCatComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
