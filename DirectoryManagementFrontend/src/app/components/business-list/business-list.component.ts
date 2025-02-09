import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  businesses: Business[] = [];
  filteredBusinesses: Business[] = [];
  searchQuery: string = '';

  currentPage: number = 1;
  pageSize: number = 10;  

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.loadBusinesses();
  }
  categories: { [key: string]: string } = {
    "1": "Restaurants"
    , '2': 'Electronics',
    '3': 'Healthcare',
    '4': 'Education',
    '5': 'Other'
  };

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
      this.filteredBusinesses = data;
      this.updatePaginatedBusinesses();
    });
  }

  searchBusinesses() {
    this.filteredBusinesses = this.businesses.filter(b =>
      b.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePaginatedBusinesses();
  }

  deleteBusiness(id: number) {
    if (confirm('Are you sure you want to delete this business?')) {
      this.businessService.deleteBusiness(id).subscribe(() => {
        this.loadBusinesses();
      });
    }
  }

  sortBy(property: string) {
    this.filteredBusinesses.sort((a: any, b: any) => {
      if (typeof a[property] === 'string' && typeof b[property] === 'string') {
        return a[property].localeCompare(b[property]);
      }
      return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
    });
    this.updatePaginatedBusinesses();
  }

  updatePaginatedBusinesses() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredBusinesses = this.businesses.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.currentPage = newPage;
      this.updatePaginatedBusinesses();
    }
  }

  totalPages(): number {
    return Math.ceil(this.businesses.length / this.pageSize);
  }

  minRecordIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  maxRecordIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.businesses.length);
  }
}
