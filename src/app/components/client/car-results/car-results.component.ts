import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { FinishCar } from 'src/app/models/FinishCar';
import { ResultsOut } from 'src/app/models/ResultsOut';
import { CustomerRequirementsService } from 'src/app/services/customerRequirements.service';
import { AlgorithmService } from 'src/app/services/algorithm.service';

import { Router } from '@angular/router';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-car-results',
  templateUrl: './car-results.component.html',
  styleUrls: ['./car-results.component.css']
})
export class CarResultsComponent implements OnInit, DoCheck {

  finishCars: FinishCar[];
 
  myAlgorithmCars: FinishCar[];
  maxCars: FinishCar[];
  minCars: FinishCar[];
  xx: { [key: string]: FinishCar[] };
  resultsOut: ResultsOut[];
  panelOpenState = false;
  i = 1;

  constructor(public algorithmService: AlgorithmService,
  public customerRequirementsService: CustomerRequirementsService,
    private router: Router, public resourcer: StringResourcer) { }

  ngOnInit() {
    console.log('ongOnInint');
    this.finishCars = [];
    
    this.myAlgorithmCars = [];
    this.maxCars = [];
    this.minCars = [];

    this.resultsOut = [];
  }

  ngDoCheck() {
    console.log('ngDoCheck');
    if (this.customerRequirementsService.resultsOut && this.customerRequirementsService.resultsOut.length > 0 && this.i === 1) {
      this.resultsOut = this.customerRequirementsService.resultsOut;
      console.log(this.resultsOut);
      this.i = this.i + 1;
    }
  }

  selectAlgorithmButton(buttonName){
    this.myAlgorithmCars = [];
    this.minCars = [];
    this.maxCars = [];
    console.log('selectAlgorithmButton');
    this.resultsOut.forEach(element => {
       if (element.name === buttonName) {
        this.xx = element.data;
        console.log(this.xx);
        this.myAlgorithmCars = (element.data['MyAlgorithm']);
        this.minCars = (element.data['Minimum']);
        this.maxCars = (element.data['Maximum']);
      }
    });
  }

  menuButton() {
    this.i = 1;
    this.router.navigateByUrl('main');
  }

  backButton() {
    this.i = 1;
    this.router.navigateByUrl('user-preferences');
  }
}
