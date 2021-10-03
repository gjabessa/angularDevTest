import { Component, OnInit } from '@angular/core';
import { Row } from 'src/app/interfaces/rows';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.css']
})
export class AnatomicalStructuresComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getRows().subscribe(this.getStructures, this.errorHandle);
  }

  getStructures(row:Row){
    console.log(row);
  }

  errorHandle(err:Error){
    throw new Error(err.message);
  }

}
