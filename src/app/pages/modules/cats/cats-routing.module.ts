import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayCatsComponent } from '../../components/display-cats/display-cats.component';
import { VoteCatComponent } from '../../components/vote-cat/vote-cat.component';
import { PathMatch } from 'src/app/@core/path-match';


const routes: Routes = [{
  path: '',
  redirectTo: 'display-cats',
  title: 'Display cats',
  pathMatch: 'full' as PathMatch
},
{
  path: 'display-cats',
  title: 'Display cats',
  component: DisplayCatsComponent,
}, {
  path: 'vote-cat',
  component: VoteCatComponent,
  title: 'Vote cat'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule { }
