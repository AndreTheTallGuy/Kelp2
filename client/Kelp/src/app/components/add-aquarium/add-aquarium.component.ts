import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Aquarium } from 'src/app/models/Aquarium';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-aquarium',
  templateUrl: './add-aquarium.component.html',
  styleUrls: ['./add-aquarium.component.css'],
})
export class AddAquariumComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  addAquarium: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private angularFire: AngularFireAuth,
    private ss: LocalStorageService
  ) {
    this.addAquarium = this.formBuilder.group({
      photo: '',
      name: '',
      phone: '',
      url: '',
      street: '',
      city: '',
      postalCode: '',
      description: '',
      rating: '',
    });
  }

  ngOnInit(): void {
    this.angularFire.user.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res) {
      } else {
        this.router.navigate(['sign-in']);
      }
    });
  }

  addAquaForm(form: any) {
    this.isLoading = true;
    console.log(form.value);

    this.apiService.addAquarium(form.value).subscribe(
      (res) => {
        console.log(res);
        alert('Aquarium Added');
        this.isLoading = false;
        this.router.navigate(['aquariums']);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
