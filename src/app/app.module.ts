import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

import { IndexModule } from "./components/index.module";
import { IndexComponent } from './components/index.component';

import { InventoryModule } from "./components/inventory/inventory.module";
import { ListComponent } from './components/inventory/list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    IndexModule,
    InventoryModule,
    RouterModule.forRoot([
      { path: "", component: IndexComponent},
      { path: "inventory/list", component: ListComponent },
      { path: "**", redirectTo: ""}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
