import { Component, OnInit } from '@angular/core';    
import { ActivatedRoute, Router } from '@angular/router';    
import { Resturant } from '../resturant';  
import { ResturantService } from '../resturant.service';  
    
@Component({    
  selector: 'app-resturant-detail',    
  templateUrl: './resturant-detail.component.html',    
  styleUrls: ['./resturant-detail.component.css']    
})    
export class ResturantDetailComponent implements OnInit {    
  pageTitle = 'Resturant Detail';    
  errorMessage = '';    
  resturant: Resturant | undefined;    
    
  constructor(private route: ActivatedRoute,    
    private router: Router,    
    private resturantService: ResturantService) { }    
    
  ngOnInit() {    
    const id = this.route.snapshot.paramMap.get('id');    
    const zipCode = this.route.snapshot.paramMap.get('zipCode');    
    if (id && zipCode) {    
      this.getResturant(id, zipCode);    
    }    
  }    
    
  getResturant(id: string, zipCode: string) {    
    this.resturantService.getResturant(id, zipCode).subscribe(    
      resturant => this.resturant = resturant,    
      error => this.errorMessage = <any>error);    
  }    
    
  onBack(): void {    
    this.router.navigate(['/resturants']);    
  }    
}    