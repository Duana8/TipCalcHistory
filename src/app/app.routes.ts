import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { TipCalcComponent } from './components/tip-calc/tip-calc.component';

export const routes: Routes = [
    {path: '', redirectTo:'menu', pathMatch: 'full'},
    {path: 'menu', component: MenuComponent},
    {path: 'order', component: OrderComponent},
    {path: 'calc', component: TipCalcComponent}
];
