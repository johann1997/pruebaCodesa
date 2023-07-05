import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { UserI } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient) { }
  
  url = 'assets/data/data.json';
  create = 'user is created';
  
  getUsers(){
    return this.http.get(`${this.url}`);
  }
  
  addUser(user:UserI){
    //return this.http.post(`${this.url}`,user);
    localStorage.setItem('usuario', JSON.stringify(user));
    return this.create;
  }
  
  deleteUser(idUser:string){
    return this.http.delete(`${this.url}/${idUser}`);
  }
  
  updateUser(user:UserI){
    return this.http.post(`${this.url}`,user);
  }
}

