export interface CreditApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  income: number;
  employment: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  downPayment: number;
  loanTerm: number;
  carId?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'email' | 'phone';
  carId?: string;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}