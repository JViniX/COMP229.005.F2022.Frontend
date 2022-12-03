import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";
import { ResponseModel } from "./response.model";

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable()
export class FBAuthService {

    public username: string;
    private _redirectUrl: string;

    constructor(
        private datasource: RestDataSource,
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { }

    authenticate(email: string, password: string){
        
        return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result)=>{
            this.username = result.user.displayName;
            result.user.getIdToken().then( token => {
                this.datasource.auth_token = token;
                this.router.navigateByUrl(this._redirectUrl || "");
            })
        })
        .catch( (error)=>{
            window.alert(error.message);
        });
    }

    signupUser(user: User): Observable<ResponseModel> {
        return this.datasource.signupUser(user);
    }

    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }

    clear() {
        return this.afAuth.signOut().then( ()=>{
            this.username = null;
            this.datasource.auth_token = null;
        });
    }

    get redirectUrl(): string{
        let result = this._redirectUrl;
        this._redirectUrl = null;
        return result;
    }

    set redirectUrl(url: string){
        this._redirectUrl = url;
    }

    googleAuth(){
        return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
            .then((result)=>{
                this.username = result.user.displayName;
                result.user.getIdToken().then( token => {
                    this.datasource.auth_token = token;
                    this.router.navigateByUrl(this._redirectUrl || "");
                })
            })
            .catch((error)=>{
                window.alert(error.message);
            });
    }
}