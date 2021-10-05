import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import APIS from '../../../../src/app/Globals';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient, private router: Router,
  ) {
  }

  login(credentials): Observable<any> {
    return this.http.post<any>(APIS.api_Login, credentials);
  }

  logOut() {

    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    // const headers = {'content-Type': 'application/json', Authorization: 'Token ' + token};

    // return this.http.post<any>('http://localhost:8000/api/logout/', {}, {'headers': headers});
  }

  isAuthenticated() {
    // this.logOut()
    // this.logOut().subscribe(
    //   (erro) => {
    //
    //   },
    //   (err) => {
    //     localStorage.removeItem('token');
    //     return !!localStorage.getItem('token');
    //   },
    // );
    return !!localStorage.getItem('token');
  }
}
