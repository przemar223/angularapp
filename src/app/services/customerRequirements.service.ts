import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CustomerRequirements } from '../models/CustomerRequirements';
import { FinishCar } from '../models/FinishCar';
import { ResultsOut } from '../models/ResultsOut';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequirementsService {
  @Output() itemUploaded: EventEmitter<CustomerRequirements> = new EventEmitter();
  finishCars: FinishCar[];
  resultsOut: ResultsOut[];
  form: String = '';
  amount: String = '';

  constructor(private httpClient: HttpClient) { }

  send(customerRequirements: CustomerRequirements) {
    this.resultsOut = [];
    this.sendCustomerRequirements2(customerRequirements)
      .subscribe(sh => this.resultsOut = sh);
  }

  sendCustomerRequirements2(customerRequirements: CustomerRequirements): Observable<ResultsOut[]> {
    console.log('sendCustomerRequirements2');
    return this.httpClient.post<ResultsOut[]>(
      'http://localhost:8085/user_preferences/send_customerRequirements', customerRequirements);
  }
}
