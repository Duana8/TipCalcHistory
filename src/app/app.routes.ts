import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {path: '', redirectTo:'/main', pathMatch: 'full'},
    {path: 'main', component: MainPageComponent},
    {path: 'profile', component: ProfileComponent}
];
