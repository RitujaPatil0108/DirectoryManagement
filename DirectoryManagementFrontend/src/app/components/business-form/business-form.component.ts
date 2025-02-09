import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit, OnChanges {
  @Input() business: Business = {
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
    businessId: 1
  };

  @Output() refreshList = new EventEmitter<void>();

  isEdit: boolean = false;

  categories: { [key: string]: string } = {
    "1": "Restaurants"
    , '2': 'Electronics',
    '3': 'Healthcare',
    '4': 'Education',
    '5': 'Other'
  };

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  businesses: Business[] = [];
  loadBusinesses() {
    this.businessService.getBusinesses().subscribe(data => {
      data.forEach(b => {
        if (b.categoryId !== undefined) {
          b.category = { categoryId: b.categoryId, name: this.categories[String(b.categoryId)] };
        } else {
          b.category = { categoryId: 0, name: 'Unknown' }; 
        }
      })
      console.log("Loaded businesses:", data);
      this.businesses = data;
    });
  }

  async ngOnInit() {
    this.loadBusinesses();
    setTimeout(() => {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam && idParam !== "undefined") {
        const id = +idParam;
        this.businesses.forEach(b => {
          if (b.businessId === id) {
            this.business = b;
          }
        })
        console.log('Fetched business for editing:', this.business);
        this.isEdit = true;
      }
    }, 1000);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['business']) {
      this.isEdit = !!this.business.businessId;
      console.log('ngOnChanges: isEdit:', this.isEdit, ' business:', this.business);
    }
  }

  updateBusiness() {
    this.business.category.name = this.categories[String(this.business.category.categoryId)];

    if (this.isEdit) {
      this.businessService.updateBusiness(this.business.businessId, this.business).subscribe(() => {
        this.router.navigate(['/business-list']); 
      });
    } 
  }
}
