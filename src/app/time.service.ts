import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  private baseUrl = 'https://timeapi.io/api/Time/current/zone?timeZone=';

  constructor(private readonly http: HttpClient) {}

  getTimeByZone(zone: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${zone}`);
  }
}
