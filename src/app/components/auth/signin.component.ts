import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FBAuthService } from "src/app/models/fb-auth.service";

@Component({
    templateUrl: "signin.component.html"
})

export class SignInComponent {
    public title: string = "Sign";
    public email: string;
    public password: string;
    public message: string;

    constructor(private router: Router,
        public auth: FBAuthService) { }

    authenticate(form: NgForm) {
        if (form.valid) {
            // perform authentication
            this.auth.authenticate(this.email, this.password);            
        } else {
            this.message = "Form Data Invalid";
        }
    }
}