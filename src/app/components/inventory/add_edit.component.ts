import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Inventory, Size } from "../../models/inventory.model";
import { InventoryRepository } from "../../models/inventory.repository";

@Component({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})

export class AddEditComponent {
    
    title:string = 'Add a new Item';
    editing: boolean = false;
    item: Inventory = new Inventory();

    constructor(private repository: InventoryRepository,
                private router: Router,
                activeRoute: ActivatedRoute) 
    { 
        // Delete
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        // Edit
        if (this.editing) {
            this.item = this.repository.getItem(activeRoute.snapshot.params["id"]);
        } 

        // Add
        else {
            this.item.size = new Size();
        }        
    }

    save(form: NgForm) {
        console.log('===== AddEditComponent save');
        this.repository.saveInventory(this.item);
        this.router.navigateByUrl("inventory/list");                
    }

    private deleteItem(id: string){
        this.repository.deleteInventory(id);
        this.router.navigateByUrl("inventory/list");
    }
    
}