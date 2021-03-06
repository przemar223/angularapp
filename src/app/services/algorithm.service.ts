import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OptionDTO } from '../models/DTO/OptionDTO';
import { LoginService } from './login.service';
import { ParameterInDTO } from '../models/DTO/ParameterInDTO';

@Injectable({
  providedIn: 'root'
})

export class AlgorithmService {
  checkbox1 = false;
  checkbox2 = false;

  membershipFunctions: OptionDTO[];
  algorithms: OptionDTO[];
  type: String;
  amountCars: String;

  parameterInDTO: ParameterInDTO;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  sendNewParams(mf: String, alg: String, type: String, selectedAmountCars: String, ratioValue: String) {
    this.sendNewParamsToDb(mf, alg, type, selectedAmountCars, ratioValue)
      .subscribe(x => this.parameterInDTO = x);
  }

  getParameters() {
    this.getParametersFromDb()
      .subscribe(x => this.parameterInDTO = x);
  }

  getMembershipFunctionsClient() {
    this.getMembershipFunctionsForClient()
      .subscribe(x => this.membershipFunctions = x);
  }

  getParametersFromDb(): Observable<ParameterInDTO> {
    this.parameterInDTO = null;
    if (this.loginService.login !== '') {
      return this.httpClient.get<ParameterInDTO>('http://localhost:8085/admin/get_parameters/' + this.loginService.login);
    }
  }

  sendNewParamsToDb(mf: String, alg: String, type: String, selectedAmountCars: String, ratioValue: String): Observable<ParameterInDTO> {
    this.parameterInDTO = null;
    console.log(selectedAmountCars);
    console.log('sendNewParamsToDb');
    if (this.loginService.login !== '') {
      return this.httpClient.get<ParameterInDTO>('http://localhost:8085/admin/send_parameters/'
      + mf + '/' + alg + '/' + type + '/' + selectedAmountCars + '/' + ratioValue + '/' + this.loginService.login);
    }
  }

  getMembershipFunctionsForClient(): Observable<OptionDTO[]> {
    this.membershipFunctions = [];
    return this.httpClient.get<OptionDTO[]>('http://localhost:8085/admin/membership_functions_client');
  }
}