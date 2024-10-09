import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
];
