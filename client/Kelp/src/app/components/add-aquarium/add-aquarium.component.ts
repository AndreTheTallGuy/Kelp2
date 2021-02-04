import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Aquarium } from 'src/app/models/Aquarium';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-aquarium',
  templateUrl: './add-aquarium.component.html',
  styleUrls: ['./add-aquarium.component.css']
})
export class AddAquariumComponent implements OnInit {

  addAquarium: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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

    this.authService.addAquarium(form.value).subscribe(res=>{
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
