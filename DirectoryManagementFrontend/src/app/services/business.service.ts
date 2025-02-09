import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = 'http://localhost:5027/api/business';

  constructor() { }

  getBusinesses(): Observable<Business[]> {
    return from(axios.get(this.apiUrl)).pipe(
      map((response: any) => {
        let data = response.data;
        if (!Array.isArray(data)) { data = [data]; }
        return data.map((item: any): Business => ({
          ...item,
          businessId: item.BusinessID !== undefined ? item.BusinessID : item.businessID
        }));
      })
    );
  }

  getBusinessById(id: number): Observable<Business> {
    return from(axios.get(`${this.apiUrl}/${id}`)).pipe(
      map((response: any) => {
        const item: any = response.data;
        return {
          ...item,
          businessId: item.BusinessID !== undefined ? item.BusinessID : item.businessID
        };
      })
    );
  }

  createBusiness(business: Business): Observable<Business> {
    return from(
      new Promise<Business>(async (resolve, reject) => {
        try {
          const payload = {
            ...business,
            categoryId: business.category?.categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
  
          if (payload.website && !payload.website.startsWith("http://") && !payload.website.startsWith("https://")) {
            payload.website = "http://" + payload.website;
          }
  
          console.log("Creating Business with Payload:", JSON.stringify(payload, null, 2));
  
          const response = await axios.post(this.apiUrl, payload);
          resolve(response.data as Business);
        } catch (error) {
          reject(error);
        }
      })
    );
  }

  updateBusiness(id: number, business: Business): Observable<Business> {
    const payload: any = {
      ...business,
      updatedAt: new Date().toISOString()
    };

    if (payload.website && !payload.website.startsWith("http://") && !payload.website.startsWith("https://")) {
      payload.website = "http://" + payload.website;
    }

    console.log("Updating Business with ID:", id, "Payload:", JSON.stringify(payload, null, 2));

    return from(axios.put(`${this.apiUrl}/${id}`, payload)).pipe(
      map((response: any) => {
        const data = response.data || {};
        return {
          ...data,
          businessId: data.BusinessID !== undefined ? data.BusinessID : data.businessId
        };
      })
    );
  }

  deleteBusiness(id: number): Observable<void> {
    return from(axios.delete(`${this.apiUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }
}
