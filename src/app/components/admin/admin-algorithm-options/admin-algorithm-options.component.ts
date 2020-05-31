import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { OptionDTO } from 'src/app/models/DTO/OptionDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';
import { ParameterInDTO } from 'src/app/models/DTO/ParameterInDTO';


@Component({
  selector: 'app-admin-algorithm-options',
  templateUrl: './admin-algorithm-options.component.html',
  styleUrls: ['./admin-algorithm-options.component.css']
})
export class AdminAlgorithmOptionsComponent implements OnInit, DoCheck {

  membershipFunctionControl = new FormControl('', [Validators.required]);
  algorithmControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required]);
  amountCarControl = new FormControl('', [Validators.required]);
  ratioControl = new FormControl('', [Validators.required]);
  membershipFunctions: OptionDTO[];
  algorithmFunctions: OptionDTO[];
  types: String[] = ['Tak', 'Nie'];
  //////////////////
  mf: OptionDTO;
  alg: OptionDTO;
  type: String;
  selectedAmountCars: String;
  ratioValue: String;
  ///////////////////
  isAllFields = true;
  parameterInDTO: ParameterInDTO = new ParameterInDTO;
  disabled = false;

  i = 1;
  constructor(private router: Router, public loginService: LoginService,
    public resourcer: StringResourcer, public algorithmService: AlgorithmService) {
  }

  ngOnInit() {
    console.log('begin ngOnInit');
    this.algorithmService.getParameters();
    console.log('end ngOnInit');
  }

  ngDoCheck() {
    if (this.i === 1 && this.algorithmService.parameterInDTO !== null) {
      this.parameterInDTO.membershipFunctions = this.algorithmService.parameterInDTO.membershipFunctions;
      this.parameterInDTO.membershipFunctions.forEach(element => {
        if (element.value === '1') {
          this.mf = element;
        }
      });

      this.parameterInDTO.algorithmFunctions = this.algorithmService.parameterInDTO.algorithmFunctions;
      this.parameterInDTO.algorithmFunctions.forEach(element => {
        if (element.value === '1') {
          this.alg = element;
        }
      });

      this.parameterInDTO.selectedAmountCars = this.algorithmService.parameterInDTO.selectedAmountCars;
      this.parameterInDTO.type = this.algorithmService.parameterInDTO.type;
      this.parameterInDTO.ratioValue = this.algorithmService.parameterInDTO.ratioValue;
      this.i = this.i + 1;
      console.log(this.parameterInDTO);
    }
    this.loginService.checkSession();
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveButton();
    }
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  approveButton() {
    this.type = this.parameterInDTO.type;
    this.selectedAmountCars = this.parameterInDTO.selectedAmountCars;
    this.ratioValue = this.parameterInDTO.ratioValue;
    console.log('mf: ' + this.mf.key);
    console.log('alg: ' + this.alg.key);
    console.log('type: ' + this.type);
    console.log('ratioValue: ' + this.ratioValue);
    console.log('selected amout cars: ' + this.selectedAmountCars);
    if (this.mf.key.trim() === '' || this.alg.key.trim() === '' || this.type.trim() === ''
      // || this.selectedAmountCars.trim() === '' || this.ratioValue.trim() === ''
      || this.selectedAmountCars === null || this.ratioValue === null
      || Number(this.ratioValue) > 100 || Number(this.ratioValue) < 0
      || Number(this.selectedAmountCars) > 99 || Number(this.selectedAmountCars) < 0) {
      this.isAllFields = false;
      return;
    } else {
      this.loginService.checkTimeLogin();
      this.algorithmService.sendNewParams(this.mf.key, this.alg.key, this.type, this.selectedAmountCars, this.ratioValue);
      this.loginService.isChangePassword = true;
      this.disabled = true;
      this.sleep(4000).then(() => {
        this.router.navigateByUrl('admin/menu');
      });
    }
  }

  isDisabled() {
    if (this.disabled === true) {
      return true;
    } else {
      return false;
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  logoutButton() {
    this.loginService.checkTimeLogin();
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }
}
