import { Component, OnInit, OnDestroy } from '@angular/core';    
import { FormGroup, FormBuilder, Validators } from '@angular/forms';    
import { Subscription } from 'rxjs';    
import { ActivatedRoute, Router } from '@angular/router';    
import { Resturant } from '../resturant';  
import { ResturantService } from '../resturant.service';   
import { GenericValidator } from 'src/app/shared/genericvalidator';  
    
@Component({    
  selector: 'app-resturant-edit',    
  templateUrl: './resturant-edit.component.html',    
  styleUrls: ['./resturant-edit.component.css']    
})    
export class ResturantEditComponent implements OnInit, OnDestroy {    
  pageTitle = 'Resturant Edit';    
  errorMessage: string;    
  resturantForm: FormGroup;    
  tranMode: string;    
  resturant: Resturant;    
  private sub: Subscription;    
    
  displayMessage: { [key: string]: string } = {};    
  private validationMessages: { [key: string]: { [key: string]: string } };    
  genericValidator: GenericValidator;    
    
    
  constructor(private fb: FormBuilder,    
    private route: ActivatedRoute,    
    private router: Router,    
    private resturantService: ResturantService) {    
    
    this.validationMessages = {    
      name: {    
        required: 'Resturant name is required.',    
        minlength: 'Resturant name must be at least three characters.',    
        maxlength: 'Resturant name cannot exceed 50 characters.'    
      },    
      zipCode: {    
        required: 'Resturant zipCode is required.',    
      }    
    };    
    this.genericValidator = new GenericValidator(this.validationMessages);    
  }    
    
  ngOnInit() {    
    this.tranMode = "new";    
    this.resturantForm = this.fb.group({    
      name: ['', [Validators.required,    
      Validators.minLength(3),    
      Validators.maxLength(50)    
      ]],    
      address1: '',    
      address2: '',
      city: '',
      state: '',
      zipCode: ['', [Validators.required]],    
      description: '',    
      rating: '',    
      averageRating: '',   
      ratingTotal: '',
      hours: '',
      numberOfTimesRated: '' 
    });    
    
    this.sub = this.route.paramMap.subscribe(    
      params => {    
        const id = params.get('id');    
        const zipCode = params.get('zipCode');    
        if (id == '0') {    
          const resturant: Resturant = { id: "0", name: "", address1: "", address2: "", city: "", state: "", zipCode: "", description: "", rating: 0, averageRating: 0, ratingTotal: 0, hours: "", numberOfTimesRated: 0  };    
          this.displayResturant(resturant);    
        }    
        else {    
          this.getResturant(id, zipCode);    
        }    
      }    
    );    
  }    
    
  ngOnDestroy(): void {    
    this.sub.unsubscribe();    
  }    
    
  getResturant(id: string, zipCode: string): void {    
    this.resturantService.getResturant(id, zipCode)    
      .subscribe(    
        (resturant: Resturant) => this.displayResturant(resturant),    
        (error: any) => this.errorMessage = <any>error    
      );    
  }    
    
  displayResturant(resturant: Resturant): void {    
    if (this.resturantForm) {    
      this.resturantForm.reset();    
    }    
    this.resturant = resturant;    
    if (this.resturant.id == '0') {    
      this.pageTitle = 'Add Resturant';    
    } else {    
      this.pageTitle = `Edit Resturant: ${this.resturant.name}`;    
    }    
    this.resturantForm.patchValue({    
      name: this.resturant.name,    
      address1: this.resturant.address1,   
      address2: this.resturant.address2,
      city: this.resturant.city,    
      state: this.resturant.state, 
      zipCode: this.resturant.zipCode,   
      description: this.resturant.description,    
      rating: this.resturant.rating,
      averageRating: this.resturant.averageRating,
      ratingTotal: this.resturant.ratingTotal,
      hours: this.resturant.hours,
      numberOfTimesRated: this.resturant.numberOfTimesRated 
    });    
  }    
    
  deleteResturant(): void {    
    if (this.resturant.id == '0') {    
      this.onSaveComplete();    
    } else {    
      if (confirm(`Are you sure want to delete this Resturant: ${this.resturant.name}?`)) {    
        this.resturantService.deleteResturant(this.resturant.id, this.resturant.zipCode)    
          .subscribe(    
            () => this.onSaveComplete(),    
            (error: any) => this.errorMessage = <any>error    
          );    
      }    
    }    
  }    
    
  saveResturant(): void {    
    if (this.resturantForm.valid) {    
      if (this.resturantForm.dirty) {    
        const p = { ...this.resturant, ...this.resturantForm.value };    
        if (p.id === '0') {    
          this.resturantService.createResturant(p)    
            .subscribe(    
              () => this.onSaveComplete(),    
              (error: any) => this.errorMessage = <any>error    
            );    
        } else {    
          this.resturantService.updateResturant(p)    
            .subscribe(    
              () => this.onSaveComplete(),    
              (error: any) => this.errorMessage = <any>error    
            );    
        }    
      } else {    
        this.onSaveComplete();    
      }    
    } else {    
      this.errorMessage = 'Please correct the validation errors.';    
    }    
  }    
    
  onSaveComplete(): void {    
    this.resturantForm.reset();    
    this.router.navigate(['/resturants']);    
  }    
}    