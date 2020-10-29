import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "https://utn-avanzada2-tp-final.herokuapp.com/api/User/";
  private token: boolean = false;

  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  login(email: string, password: string): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.apiURL + 'Login', {
      email,
      password
    }, httpOptions)
      .toPromise();
  };

  getToken(){
    return this.token;
  }

  activateToken(){
    this.token = true;
  }
}
