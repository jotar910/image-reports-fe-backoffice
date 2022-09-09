const AUTHENTICATION_STORAGE_KEY = 'user';

export default Symbol('Authentication provider identifier');

export class AuthenticationService {
  login(email: string) {
    localStorage.setItem(AUTHENTICATION_STORAGE_KEY, email);
  }

  logout() {
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTHENTICATION_STORAGE_KEY);
  }

  user(): string | null {
    return localStorage.getItem(AUTHENTICATION_STORAGE_KEY) ?? null;
  }
}
