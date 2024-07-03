//front/src/app/pages/main/main.route.ts
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";

export const MAIN_ROUTE:Routes = [
  {path: '', title: 'Home',component: HomeComponent},
  {path: 'home',title: 'Home', component: HomeComponent},
]
