import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "../auth/auth.service";
import { Invoice } from "./invoice";

const API_URL = environment.API_URL;

@Injectable()
export class invoiceService {
    constructor(private http: HttpClient, private auth: AuthService){}

    create(invoiceData: Invoice){
        return this.auth.authToken.pipe(
          tap((token) => {
            if (!token) {
              throw new Error('Unauthenticated');
            }
          }),
          switchMap((token) => {
            return this.http.post<Invoice>(
              API_URL + '/invoice',
              invoiceData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          })
        );
    }

    update(invoiceData: Invoice){
        return this.http.put<Invoice>(
          API_URL + '/invoice/' + invoiceData.id, invoiceData
        );
    }

    delete(id: number){
        return this.http.delete(
          API_URL + '/invoice/'+ id)   
        }

        findAll() {
        
          return this.http.get<Invoice[]>(API_URL + '/invoice');
          
        }

        find(id: number){
            return this.http.get(
              API_URL + '/invoice/'+ id
            );
        }
}