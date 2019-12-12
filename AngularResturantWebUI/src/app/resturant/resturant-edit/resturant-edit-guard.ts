import { Injectable } from '@angular/core';    
import { CanDeactivate } from '@angular/router';    
import { Observable } from 'rxjs';    
import { ResturantEditComponent } from './resturant-edit.component';    
    
    
@Injectable({    
  providedIn: 'root'    
})    
export class ResturantEditGuard implements CanDeactivate<ResturantEditComponent> {    
  canDeactivate(component: ResturantEditComponent): Observable<boolean> | Promise<boolean> | boolean {    
    if (component.resturantForm.dirty) {    
      const name = component.resturantForm.get('name').value || 'New Resturant';    
      return confirm(`Navigate away and lose all changes to ${name}?`);    
    }    
    return true;    
  }    
}     