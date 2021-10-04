import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Row } from '../interfaces/rows';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRows():Observable<Row>{
    return this.http.get<Row>(environment.baseUrl);
  }

  getDetails(id:String):any {
    console.log(environment.secondBaseUrl+id)
    return this.http.get(environment.secondBaseUrl+id);
  }


}
