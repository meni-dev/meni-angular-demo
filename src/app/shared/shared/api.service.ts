import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  postemployee(data: any) {
    console.log(JSON.stringify(data))
    return this.http.post(this.domain + "/posts", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getemployee() {
    return this.http.get(this.domain + "/posts")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteEmployee(id: number) {

    console.log("http//localhost:3000/posts/" + id)

    let url = this.domain + "/posts/" + id;
    return this.http.delete(url)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateEmployee(data: any, id: number) {

    return this.http.put(this.domain + "/posts/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }
}