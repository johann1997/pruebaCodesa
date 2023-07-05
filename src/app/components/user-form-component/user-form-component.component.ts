import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/interfaces/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form-component.component.html',
  styleUrls: ['./user-form-component.component.css']
})
export class UserFormComponentComponent implements OnInit {
  facts: UserI[] = [];
  factsUserUpdate: UserI[] = [];
  updadetUser = false;
  message='';

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)] ),
    email: new FormControl('', [Validators.required, Validators.email]),    
    telephone: new FormControl(0, [Validators.required,Validators.pattern(/^([0-9])*$/)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    document: new FormControl(0, [Validators.required, Validators.minLength(5)])
  });


  user: UserI  = {
    name: '',
    email: '',
    telephone: 0,
    address:'',
    password:'',
    document:0
    
  }

  send = false;
  invalidRegister = false;

  constructor(private userServ: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.get_data();
    this.loadUserData();
  }
  get_data(){
    this.userServ.getUsers().subscribe( (data: any) => {
    this.facts = data['Usuario'];

  });
}

  saveUser(){

    this.send = true;

    if(this.profileForm.valid){
      this.user.name = this.profileForm.value.name!;
      let find = this.facts.filter( usuario => usuario.name == this.user.name );
      if(find.length >= 1){
        this.invalidRegister = true;
      }else{
      this.user.name = this.profileForm.value.name!;
      this.user.email = this.profileForm.value.email!;
      this.user.telephone = this.profileForm.value.telephone!;
      this.user.address = this.profileForm.value.address!;
      this.user.password = this.profileForm.value.password!;
      this.user.document = this.profileForm.value.document!;

      this.userServ.addUser(this.user);
      this.message = 'el usuario ha sido creado exitosamente';
      }
      
    }

  }
  loadUserData(){
    
    let facts = localStorage.getItem('userUpdate');
    if (facts != ''){
    this.factsUserUpdate = JSON.parse(facts!);
    this.updadetUser =true;
    this.profileForm.setValue(this.factsUserUpdate[0]);
    
    }
    
  }
  updateUser(id:any){
    console.log(id);
    console.log(this.profileForm);
    
    var index = this.facts.findIndex(e => e.document === id);
    if (index !== -1){
      this.facts[index].name = this.profileForm.value.name!;
      this.facts[index].email = this.profileForm.value.email!;
      this.facts[index].telephone = this.profileForm.value.telephone!;
      this.facts[index].address = this.profileForm.value.address!;
      this.facts[index].password = this.profileForm.value.password!;
      this.facts[index].document = this.profileForm.value.document!;
    }
    //let find = this.facts.filter( usuario => usuario.document == this.user.document )
    
  }


}
