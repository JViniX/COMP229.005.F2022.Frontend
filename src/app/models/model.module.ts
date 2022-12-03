import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { InventoryRepository } from "./inventory.repository";
import { RestDataSource } from "./rest.datasource";
import { FBAuthService } from "./fb-auth.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        InventoryRepository,
        RestDataSource,
        FBAuthService
    ]
})

export class ModelModule { }