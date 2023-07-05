import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserI } from 'src/app/interfaces/user';
import { Login } from 'src/app/interfaces/login';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServ : UserServiceService) { }
  facts: UserI[] = [];

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)] ),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),    
  });

  send = false;
  noAccess = false;

  userLogin : Login = {
    userName: '',
    password:''
  }

  ngOnInit(): void {
    this.get_data();
  }

  get_data(){
      this.userServ.getUsers().subscribe( (data: any) => {
      this.facts = data['Usuario'];
    });
  }

  login(){
    this.userLogin.userName = this.loginForm.value.userName!;
    this.userLogin.password = this.loginForm.value.password!;
    this.send = true;
    this.checkInfo();
  }

  checkInfo(){
    if(this.loginForm.valid){
      let find = this.facts.filter( usuario => usuario.name == this.userLogin.userName );
      if(find[0].password == this.loginForm.value.password ){
        this.noAccess = false;
      }else{
        this.noAccess = true;
      }
    }
  }
    

}
