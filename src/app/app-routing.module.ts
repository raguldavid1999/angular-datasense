import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent,
  },
  {
    path: ':id',
    component: DetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
