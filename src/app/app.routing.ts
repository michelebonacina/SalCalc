import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards';
import { UserComponent } from './user';

// define application routes to compoments
export const AppRoutes: Routes = [
    { path: 'index.html', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'index.html?page=login', component: LoginComponent },
    { path: '**', redirectTo: 'index.html' },

];

// define application routing
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);