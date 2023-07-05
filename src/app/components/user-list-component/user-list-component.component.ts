import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/interfaces/user';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponentComponent implements OnInit {

  constructor( private userServ: UserServiceService ) { }

 // user_interface: UserI
facts: UserI[] = [];
factsUserUpdate: UserI[] = [];
  ngOnInit(): void {
    this.userServ.getUsers().subscribe( (data: any) => {
      this.facts = data['Usuario'];
      this.loadData();
    } );
  }
  loadData(){
    localStorage.setItem('Users', JSON.stringify(this.facts));
  }

  updateUser(b:number){
for(let i = 0 ; i < this.facts.length ; i++){
    if(b == i){
    this.factsUserUpdate.push(this.facts[i]);
    localStorage.setItem('userUpdate', JSON.stringify(this.factsUserUpdate));
    }
}
  }

}
