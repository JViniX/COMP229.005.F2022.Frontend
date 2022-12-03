import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, 
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { FBAuthService } from "../../models/fb-auth.service";

@Injectable()
export class AuthGuard {

    constructor(private router: Router,
        private auth: FBAuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean 
    {
        if (!this.auth.authenticated) {
            this.auth.redirectUrl = state.url;
            this.router.navigateByUrl("/users/signin");
            return false;
        }
        return true;
    }
}