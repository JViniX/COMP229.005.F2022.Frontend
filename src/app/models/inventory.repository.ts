import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Inventory } from "./inventory.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";

@Injectable()
export class InventoryRepository {

    private tempInventoryList: Inventory[] = [];
    public listReady: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    getInventory(): Inventory[] {
        return this.tempInventoryList;
    }

    setInventory(){
        this.listReady = false;
        this.dataSource.getInventoryList().subscribe(data => {
            this.tempInventoryList = data;
            this.listReady = true;
        });
    }

    getItem(id: string): Inventory {
        return Object.assign({}, this.tempInventoryList.find(i => i._id === id)!);        
    }

    saveInventory(item: Inventory): Observable<ResponseModel> {

        // If it does not have id, then create a new item.
        if (item._id == null || item._id == "") {
            return this.dataSource.insertInventory(item)
                .pipe(map(response => {
                    if(response._id) // If API created
                    {             
                        return new ResponseModel(true, `Item Added Successfully with the id ${response._id}`);
                    }
                    else{ // If API send error.
                        // Convert into ResponseModel to get the error message.
                        return response as ResponseModel;
                    }
                }));
        } else {
            // If it has id, then update a existing item.
            return this.dataSource.updateInventory(item)
                .pipe(map(resp => {
                    // Convert into ResponseModel to get the error message.
                    let response = resp as ResponseModel;
                    if (response.success == true) {
                        this.tempInventoryList.splice(this.tempInventoryList.
                            findIndex(i => i._id == item._id), 1, item);
                            return new ResponseModel(true, `Item Edited Successfully`);
                    }
                    else{
                        return response
                    }        
                }));
        }
    }

    deleteInventory(id: string): Observable<ResponseModel> {
        return this.dataSource.deleteInventory(id)
            .pipe(map(response => {
                return response;
        }));
    }

}