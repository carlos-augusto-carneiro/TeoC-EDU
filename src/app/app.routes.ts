import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Automatos } from './pages/automatos/automatos';
import { Afd } from './pages/afd/afd';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'automatos', component: Automatos },
  { path: 'automatos/afd', component: Afd }
];
