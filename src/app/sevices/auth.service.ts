import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SingleResponseModel } from '../Models/SingleResponseModel';
import { AuthToken } from '../Models/authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = "https://localhost:44376/Api/Auths/";

  // Kullanıcı adı için BehaviorSubject
  private userNameSubject: BehaviorSubject<string | null>;
  public userName$;

  constructor(private httpClient: HttpClient) {
    const initialUserName = this.getUserNameFromToken();
    this.userNameSubject = new BehaviorSubject<string | null>(initialUserName);
    this.userName$ = this.userNameSubject.asObservable();
  }

  register(userData: any): Observable<SingleResponseModel<AuthToken>> {
    let registerapi = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<AuthToken>>(registerapi, userData);
  }

  login(credentials: any): Observable<SingleResponseModel<AuthToken>> {
    let loginApi = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<AuthToken>>(loginApi, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.updateUserInfoFromToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userNameSubject.next(null); // Çıkışta kullanıcı adını temizle
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Token decode hatası:', error);
      return null;
    }
  }

  // Kullanıcı adını token içinden çıkar
  private getUserNameFromToken(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    // Kullanıcı adı claim'i farklı isimlerde olabilir, örnek:
    return decoded['name'] || decoded['username'] || null;
  }

  // Token güncellendiğinde kullanıcı adını güncelle
  public updateUserInfoFromToken() {
    const userName = this.getUserNameFromToken();
    this.userNameSubject.next(userName);
  }

  // Rolleri token içinden al
  getUserRoles(): string[] {
    const decoded = this.getDecodedToken();
    if (!decoded) return ['misafir']; // tutarlı olarak misafir

    const roleClaimKey = Object.keys(decoded).find(key => key.toLowerCase().includes('role'));
    if (!roleClaimKey) return ['misafir'];

    const roles = decoded[roleClaimKey];
    if (typeof roles === 'string') return [roles];
    if (Array.isArray(roles)) return roles;

    return ['misafir'];
  }

  isGuest(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('misafir');
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }
}
