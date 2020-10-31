import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private apiURL = "https://utn-avanzada2-tp-final.herokuapp.com/api/UserType/";
  private token: boolean = false;

  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getById(id: number): Promise<any>{
    return this.http.get(this.apiURL + id)
      .toPromise();
  }
}
