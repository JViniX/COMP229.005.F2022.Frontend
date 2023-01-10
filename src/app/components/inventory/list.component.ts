import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Inventory } from "../../models/inventory.model";
import { InventoryRepository } from "../../models/inventory.repository";
import { AuthService } from "../../models/auth.service";

@Component({
    selector: "list-inventory",
    templateUrl: "list.component.html"
})

export class ListComponent{

    title = 'Inventory List';    

    constructor(public repository: InventoryRepository,
        private router: Router,
        private auth: AuthService) 
    {
        repository.setInventory();
    }    

    get inventoryList(): Inventory[] {
        return this.repository.getInventory();        
    }

    deleteMethod(id: string) {
        if (!this.auth.authenticated) {
            alert("Error: Authentication is required.");
        }
        else if(confirm("Are you sure do you want to delete?")) {
            this.repository.deleteInventory(id).subscribe(response => {
                if(response.success){
                    this.repository.setInventory();
                }
                else {
                    alert(`Error: ${response.message}`);
                }
            });
        }
    }
    
}