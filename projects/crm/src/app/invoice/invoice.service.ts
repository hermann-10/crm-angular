import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "./invoice";

@Injectable()
export class invoiceService {
    constructor(private http: HttpClient){}

    create(invoiceData: Invoice){
        return this.http.post<Invoice>(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/invoice', invoiceData
        );
    }

    update(invoiceData: Invoice){
        return this.http.put<Invoice>(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/invoice/' + invoiceData.id, invoiceData
        );
    }

    delete(id: number){
        return this.http.delete(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/invoice/'+ id)   
        }

        findAll() {
            return this.http.get<Invoice[]>(
              'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/invoice'
            );
        }

        find(id: number){
            return this.http.get(
              'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/invoice/'+ id
            );
        }
}