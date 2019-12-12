import { Component, OnInit } from '@angular/core';    
import { Resturant } from '../resturant';  
import { ResturantService } from '../resturant.service';  
    
@Component({    
  selector: 'app-resturant-list',    
  templateUrl: './resturant-list.component.html',    
  styleUrls: ['./resturant-list.component.css']    
})    
export class ResturantListComponent implements OnInit {    
  pageTitle = 'Resturants';    
  filteredResturants: Resturant[] = [];    
  resturants: Resturant[] = [];    
  errorMessage = '';    
    
  _listFilter = '';    
  get listFilter(): string {    
    return this._listFilter;    
  }    
  set listFilter(value: string) {    
    this._listFilter = value;    
    this.filteredResturants = this.listFilter ? this.performFilter(this.listFilter) : this.resturants;    
  }    
    
  constructor(private resturantService: ResturantService) { }    
    
  performFilter(filterBy: string): Resturant[] {    
    filterBy = filterBy.toLocaleLowerCase();    
    return this.resturants.filter((resturant: Resturant) =>    
    resturant.name.toLocaleLowerCase().indexOf(filterBy) !== -1);    
  }    
    
  ngOnInit(): void {    
    this.resturantService.getResturants().subscribe(    
      resturants => {    
        this.resturants = resturants;    
        this.filteredResturants = this.resturants;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    
    
  deleteResturant(id: string, name: string, zipCode: string): void {    
    if (id === '') {    
      this.onSaveComplete();    
    } else {    
      if (confirm(`Are you sure want to delete this Resturant: ${name}?`)) {    
        this.resturantService.deleteResturant(id, zipCode)    
          .subscribe(    
            () => this.onSaveComplete(),    
            (error: any) => this.errorMessage = <any>error    
          );    
      }    
    }    
  }    
    
  onSaveComplete(): void {    
    this.resturantService.getResturants().subscribe(    
      resturants => {    
        this.resturants = resturants;    
        this.filteredResturants = this.resturants;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    
    
}    