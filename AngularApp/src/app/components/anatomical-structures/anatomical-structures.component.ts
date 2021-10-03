import { Component, OnInit } from '@angular/core';
import { BM_TYPE } from 'src/app/interfaces/bm-type';
import { Row } from 'src/app/interfaces/rows';
import { Structure } from 'src/app/interfaces/structures';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.css']
})
export class AnatomicalStructuresComponent implements OnInit {


  row!:Row;
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getRows().subscribe(this.getStructures, this.errorHandle);
  }

  getStructures(body:any){
    let anatomical_structures: Array<Structure> = body.data.map((row:Row) => row.anatomical_structures);
    let biomarkers: Array<Structure> = body.data.map((row:Row) => row.biomarkers);
    let cell_types: Array<Structure> = body.data.map((row:Row) => row.cell_types);
    this.row = {anatomical_structures, biomarkers, cell_types};
    console.log(this.row)
  }

  errorHandle(err:Error){
    throw new Error(err.message);
  }

}
