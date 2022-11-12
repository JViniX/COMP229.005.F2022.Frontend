import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { InventoryRepository } from "./inventory.repository";
import { RestDataSource } from "./rest.datasource";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        InventoryRepository,
        RestDataSource
    ]
})

export class ModelModule { }