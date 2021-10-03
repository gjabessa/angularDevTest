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


  mergedRows!:Row;
  anatomical_structures!: Array<Structure>
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getRows().subscribe(this.getStructures.bind(this), this.errorHandle);
  }

  getStructures(body:any){
    this.anatomical_structures = body.data.flatMap((row:Row) => row.anatomical_structures);
    console.log(this.anatomical_structures);
    let biomarkers: Array<Structure> = body.data.map((row:Row) => row.biomarkers);
    let cell_types: Array<Structure> = body.data.map((row:Row) => row.cell_types);
    this.mergedRows = {anatomical_structures: this.anatomical_structures, biomarkers, cell_types};
    
  }

  errorHandle(err:Error){
    throw new Error(err.message);
  }

}
