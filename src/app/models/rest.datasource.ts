import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of  } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Inventory } from "./inventory.model";
import { ResponseModel } from "./response.model";

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class RestDataSource {

    baseUrl: string;

    constructor(private http: HttpClient) {        
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // Inventory
    getInventoryList(): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(this.baseUrl + "inventory/list");
    }

    // insertInventory(item: Inventory): Observable<Inventory> {
    //     return this.http.post<Inventory>(
    //             this.baseUrl + "inventory/add",
    //             item
    //         ).pipe(map(response => {
    //             return response;
    //         }),
    //         catchError(error => {
    //             console.log(error.error);
    //             return of(error.error);
    //         }));
    // }

    // updateInventory(item: Inventory): Observable<ResponseModel> {
    //     return this.http.put<ResponseModel>(`${this.baseUrl}inventory/edit/${item._id}`,
    //         item).pipe(map(response => {
    //             return response;
    //         }),
    //         catchError(error => {return of(error.error)}));
    // }

    // deleteInventory(id: string): Observable<ResponseModel> {
    //     return this.http.delete<ResponseModel>(`${this.baseUrl}inventory/delete/${id}`).pipe(map(response => {
    //             return response;
    //         }),
    //         catchError(error => {return of(error.error)}));
    // }
}
