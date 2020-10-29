import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pwd: string;

  wrongUser: boolean = false;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.email, this.pwd)
      .then(response => {
        this.userService.activateToken();
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.wrongUser = true;
      });
  }

}
