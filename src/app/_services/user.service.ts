import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { LoginUser,User } from '@app/_models';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    constructor(private http: HttpClient) { }

    getAll():Observable<LoginUser> {
        return this.http.get<LoginUser[]>(`${environment.apiUrl}/loginuser`).pipe(
            tap(user=>user),
            catchError((error: HttpErrorResponse): Observable<any> => {
                // we expect 404, it's not a failure for us.
                if (error.status === 404) {
                    return of(null); // or any other stream like of('') etc.
                }
    
                // other errors we don't know how to handle and throw them further.
                return throwError(error);
            },)
        );;
    }
    getAllUsers():Observable<User> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
            tap(user=>user),
            catchError((error: HttpErrorResponse): Observable<any> => {
                // we expect 404, it's not a failure for us.
                if (error.status === 404) {
                    return of(null); // or any other stream like of('') etc.
                }
    
                // other errors we don't know how to handle and throw them further.
                return throwError(error);
            },)
        );;
    }
    getSingleUser(id:number):Observable<User> {
        return this.http.get<User[]>(`${environment.apiUrl}/users/${id}`).pipe(
            tap(user=>user),
            catchError((error: HttpErrorResponse): Observable<any> => {
                // we expect 404, it's not a failure for us.
                if (error.status === 404) {
                    return of(null); // or any other stream like of('') etc.
                }
    
                // other errors we don't know how to handle and throw them further.
                return throwError(error);
            },)
        );
    }
    updateUser(user:User):Observable<User> {
        return this.http.put<User[]>(`${environment.apiUrl}/users/${user.id}`,JSON.stringify(user),this.httpOptions).pipe(
            tap(user=>user),
            catchError((error: HttpErrorResponse): Observable<any> => {
                // we expect 404, it's not a failure for us.
                if (error.status === 404) {
                    return of(null); // or any other stream like of('') etc.
                }
    
                // other errors we don't know how to handle and throw them further.
                return throwError(error);
            },)
        );
    }
    createUser(user:User) :Observable<User> {
        return this.http.post<User[]>(`${environment.apiUrl}/users`,JSON.stringify(user),this.httpOptions).pipe(
            tap(user=>user),
            catchError((error: HttpErrorResponse): Observable<any> => {
                // we expect 404, it's not a failure for us.
                if (error.status === 404) {
                    return of(null); // or any other stream like of('') etc.
                }
    
                // other errors we don't know how to handle and throw them further.
                return throwError(error);
            },)
        );
    }
    deleteUser(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`,this.httpOptions).pipe(
            tap(id =>id),
            catchError(this.errorHandler)
        );
    }

    errorHandler(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     }

}