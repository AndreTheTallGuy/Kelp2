import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Aquarium } from 'src/app/models/Aquarium';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-add-aquarium',
  templateUrl: './add-aquarium.component.html',
  styleUrls: ['./add-aquarium.component.css']
})
export class AddAquariumComponent implements OnInit {

  addAquarium: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private angularFA: AngularFireAuth) {
    this.addAquarium = this.formBuilder.group({
      photo: '',
      name: '',
      phone: '',
      url: '',
      street: '',
      city: '',
      postalCode: '',
      description: '',
      rating: ''
    })
   }

  ngOnInit(): void {
        
  }

  addAquaForm(form:any){
    this.isLoading = true;
    console.log(form.value);

    
    this.apiService.addAquarium(form.value).subscribe(res=>{
      console.log(res);
      alert("Aquarium Added");
      this.isLoading = false;
      this.router.navigate(['aquariums'])
      
    }, (error) =>{
      this.isLoading = false;
      console.log(error);
      
    })  
  }
}
