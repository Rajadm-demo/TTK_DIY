// Utility functions for localStorage operations
export const storage = {
  // Cars
  getCars: () => {
    const cars = localStorage.getItem('dealership_cars');
    return cars ? JSON.parse(cars) : [];
  },
  
  setCars: (cars: any[]) => {
    localStorage.setItem('dealership_cars', JSON.stringify(cars));
  },
  
  // Admin authentication
  getAdminAuth: () => {
    const auth = localStorage.getItem('admin_auth');
    return auth ? JSON.parse(auth) : { isAuthenticated: false };
  },
  
  setAdminAuth: (auth: any) => {
    localStorage.setItem('admin_auth', JSON.stringify(auth));
  },
  
  clearAdminAuth: () => {
    localStorage.removeItem('admin_auth');
  }
};