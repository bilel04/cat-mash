import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule} from '@angular/material/select';
import { BreadcumbComponent } from './components/breadcumb/breadcumb.component';

import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
