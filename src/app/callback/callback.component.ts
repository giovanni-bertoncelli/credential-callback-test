import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  jwt: string = '';
  renewIn: string = '';

  res1 = '';
  res1Ok = false;
  res2 = '';
  res2Ok = false;

  constructor(
    private currentRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const raw = this.currentRoute.snapshot.fragment;
    if (!raw) {
      alert('fragment not found');
      return;
    }
    const mapped: { [key: string]: string } = {};

    raw?.split(',').forEach((objRaw) => {
      const [key, value] = objRaw.split('=');
      mapped[key] = value;
    })
    this.jwt = mapped.jwt;
    this.renewIn = mapped.renewIn;
  }

  test() {
    this.http.get('http://test.local:8080/api/test', {
      headers: { 'Authorization': `Bearer ${this.jwt}` },
      withCredentials: true
    }).subscribe((res) => {
      this.res1Ok = true;
      this.res1 = `res: ${JSON.stringify(res)}`
    }, (err) => {
      this.res1Ok = false;
      this.res1 = 'error: ' + JSON.stringify(err)
    })
  }

  refresh() {
    this.http.get('http://test.local:8080/api/refresh', {
      headers: { 'Authorization': `Bearer ${this.jwt}` },
      withCredentials: true
    }).subscribe((res) => {
      this.res2Ok = true;
      this.res2 = `res: ${JSON.stringify(res)}`
    }, (err) => {
      this.res2Ok = false;
      this.res2 = 'error: ' + JSON.stringify(err)
    })
  }

}
