import { Component, OnInit } from '@angular/core';
import { BM_TYPE } from 'src/app/interfaces/bm-type';
import { Row } from 'src/app/interfaces/rows';
import { Structure } from 'src/app/interfaces/structures';
import { DataService } from 'src/app/services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.css']
})
export class AnatomicalStructuresComponent implements OnInit {


  mergedRows!:Row;
  anatomical_structures!: Array<Structure>
  detailToDisplay!: any;
  closeResult = '';
  message = '';
  constructor(private dataService: DataService,private modalService: NgbModal) { }
  
  ngOnInit(): void {
    this.message = "Loading ...";
    this.dataService.getRows().subscribe(this.getStructures.bind(this), this.errorHandle);
  }

  getStructures(body:any){
    this.message = '';
    let filtered: any = [...body.data.flatMap((row:Row) => row.anatomical_structures)]
    this.anatomical_structures = filtered.filter((structure:any,i:number,array:any) => array.map((s:any)=>s.name).indexOf(structure.name) === i);
    
    let biomarkers: Array<Structure> = body.data.map((row:Row) => row.biomarkers);
    let cell_types: Array<Structure> = body.data.map((row:Row) => row.cell_types);
    this.mergedRows = {anatomical_structures: this.anatomical_structures, biomarkers, cell_types};
    
  }

  handleDetail(data:any){
    let response = data._embedded.terms[0]
    
    this.detailToDisplay = {description: response.description ? response.description: response.annotation.definition, name:response.label, ontologyLink: response.obo_id, iri: response.iri};
  }

  getDetail(id:any){
    let structuredId = id.split(':')[0]+"_"+id.split(':')[1]
  
    this.dataService.getDetails(structuredId).subscribe(this.handleDetail.bind(this),this.errorHandle.bind(this))
  }

  errorHandle(err:Error){
    this.cleanUpModal();
    throw new Error(err.message);
  }

  cleanUpModal(){
    this.detailToDisplay = {name:"",description:"",iri:"",ontologyLink:""}
  }
  open(content:any,id:any) {
    this.getDetail(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.detailToDisplay = {name:"loading ... ",description:"",iri:"",ontologyLink:""}
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
