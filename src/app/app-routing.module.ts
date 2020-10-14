import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'pokemon-list'},
  {path: '**', pathMatch: 'full', redirectTo: 'pokemon-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
