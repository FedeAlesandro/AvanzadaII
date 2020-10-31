import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pwd: string;

  wrongUser: boolean = false;

  constructor(private userService: UserService, private userTypeService: UserTypeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    let user: User;
    
    await this.userService.login(this.email, this.pwd)
      .then(response => {
        user = response;
      })
      .catch(error => {
        this.wrongUser = true;
      });
    
    this.validate(user);
  }

  async isAdmin(userTypeId: number) {
    let isAdmin: boolean = false;
    await this.userTypeService.getById(userTypeId)
      .then(response => {
        if (response.type.localeCompare('Admin') == 0)
          isAdmin = true;
        else
          isAdmin = false;
      })
      .catch(error => {
      });

    return isAdmin;
  }

  async validate(user: User){
    if (await this.isAdmin(user.userTypeId)) {
      this.userService.activateToken();
      this.router.navigate(['home']);
    } else {
      this.wrongUser = true;
    }
  }
}
