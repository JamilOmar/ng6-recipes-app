import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    AppRoutingModule,
    // Because we need to use it
    HeaderComponent
  ],
  providers: [AuthService, ShoppingListService, RecipeService , DataStorageService , AuthGuardService],
})
export class CoreModule { }
