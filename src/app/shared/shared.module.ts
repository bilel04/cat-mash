import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcumbComponent } from './components/breadcumb/breadcumb.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BreadcumbComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    TranslateModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    TranslateModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    BreadcumbComponent
  ]
})
export class SharedModule { }
