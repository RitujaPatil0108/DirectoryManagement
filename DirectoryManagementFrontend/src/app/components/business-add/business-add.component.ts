import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './business-add.component.html',
  styleUrls: ['./business-add.component.css']
})
export class BusinessAddComponent {
  @Output() refreshList = new EventEmitter<void>();

  business: Business = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    website: '',
    rating: 1,
    category: {
      categoryId: 3,
      name: ''
    },
    businessId: 0
  };

  categories: { [key: string]: string } = {
    "1": "Restaurants",
    "2": "Electronics",
    "3": "Healthcare",
    "4": "Education",
    "5": "Other"
  };

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  saveBusiness() {
    this.business.category.name = this.categories[String(this.business.category.categoryId)];

    this.businessService.createBusiness(this.business).subscribe(() => {
      this.router.navigate(['/business-list']);
    });
  }
}
