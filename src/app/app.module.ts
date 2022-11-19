import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import { IndexModule } from "./components/index.module";
import { InventoryModule } from "./components/inventory/inventory.module";
import { AuthModule } from './components/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './components/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    IndexModule,
    InventoryModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
