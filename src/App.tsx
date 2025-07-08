import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import CarDetailPage from './pages/CarDetailPage';
import CreditPage from './pages/CreditPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CarForm from './components/admin/CarForm';
import { Car } from './types/Car';
import { AdminUser } from './types/User';
import { mockCars } from './utils/mockData';
import { storage } from './utils/localStorage';

type Page = 'home' | 'inventory' | 'car-details' | 'credit' | 'contact' | 'admin' | 'admin-dashboard' | 'admin-add-car' | 'admin-edit-car';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>();
  const [cars, setCars] = useState<Car[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser>({ username: '', isAuthenticated: false });
  const [editingCarId, setEditingCarId] = useState<string | undefined>();

  // Initialize data
  useEffect(() => {
    initializeData();
    checkAdminAuth();
  }, []);

  const initializeData = () => {
    const storedCars = storage.getCars();
    
    // Always ensure we have at least the mock cars
    if (storedCars.length === 0) {
      // No stored cars, use mock data
      storage.setCars(mockCars);
      setCars(mockCars);
    } else {
      // Check if stored cars include mock cars, if not, merge them
      const mockCarIds = mockCars.map(car => car.id);
      const storedCarIds = storedCars.map(car => car.id);
      const missingMockCars = mockCars.filter(car => !storedCarIds.includes(car.id));
      
      if (missingMockCars.length > 0) {
        const mergedCars = [...storedCars, ...missingMockCars];
        storage.setCars(mergedCars);
        setCars(mergedCars);
      } else {
        setCars(storedCars);
      }
    }
  };

  const checkAdminAuth = () => {
    const adminAuth = storage.getAdminAuth();
    if (adminAuth.isAuthenticated) {
      setAdminUser(adminAuth);
    }
  };

  const handleNavigate = (page: Page, carId?: string) => {
    setCurrentPage(page);
    if (carId) {
      setSelectedCarId(carId);
    }
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      const adminAuth = { username: 'admin', isAuthenticated: true };
      setAdminUser(adminAuth);
      storage.setAdminAuth(adminAuth);
      setCurrentPage('admin-dashboard');
    }
  };

  const handleAdminLogout = () => {
    setAdminUser({ username: '', isAuthenticated: false });
    storage.clearAdminAuth();
    setCurrentPage('home');
  };

  const handleAddCar = () => {
    setEditingCarId(undefined);
    setCurrentPage('admin-add-car');
  };

  const handleEditCar = (carId: string) => {
    setEditingCarId(carId);
    setCurrentPage('admin-edit-car');
  };

  const handleSaveCar = (carData: Omit<Car, 'id'>) => {
    if (editingCarId) {
      // Update existing car
      const updatedCars = cars.map(car => 
        car.id === editingCarId ? { ...carData, id: editingCarId } : car
      );
      setCars(updatedCars);
      storage.setCars(updatedCars);
    } else {
      // Add new car with timestamp-based ID
      const newCar = { ...carData, id: `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
      const updatedCars = [...cars, newCar];
      setCars(updatedCars);
      storage.setCars(updatedCars);
    }
    setCurrentPage('admin-dashboard');
  };

  const handleDeleteCar = (carId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    storage.setCars(updatedCars);
    
    // Force re-render to ensure UI updates
    window.location.reload();
  };

  const handleContactAboutCar = (carId: string) => {
    setSelectedCarId(carId);
    setCurrentPage('contact');
  };

  const selectedCar = selectedCarId ? cars.find(car => car.id === selectedCarId) : undefined;

  // Admin pages - Check if user is trying to access admin
  if (currentPage === 'admin') {
    if (!adminUser.isAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    } else {
      // If already authenticated, go directly to dashboard
      setCurrentPage('admin-dashboard');
      return null;
    }
  }

  if (currentPage === 'admin-dashboard' && adminUser.isAuthenticated) {
    return (
      <AdminDashboard
        cars={cars}
        onAddCar={handleAddCar}
        onEditCar={handleEditCar}
        onDeleteCar={handleDeleteCar}
        onLogout={handleAdminLogout}
      />
    );
  }

  if ((currentPage === 'admin-add-car' || currentPage === 'admin-edit-car') && adminUser.isAuthenticated) {
    const editingCar = editingCarId ? cars.find(car => car.id === editingCarId) : undefined;
    return (
      <CarForm
        car={editingCar}
        onSave={handleSaveCar}
        onCancel={() => setCurrentPage('admin-dashboard')}
      />
    );
  }

  // If trying to access admin pages without authentication, redirect to login
  if ((currentPage === 'admin-dashboard' || currentPage === 'admin-add-car' || currentPage === 'admin-edit-car') && !adminUser.isAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Customer pages
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage cars={cars} onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'inventory' && (
          <InventoryPage cars={cars} onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'car-details' && selectedCar && (
          <CarDetailPage
            car={selectedCar}
            onNavigate={handleNavigate}
            onContactAboutCar={handleContactAboutCar}
          />
        )}
        
        {currentPage === 'credit' && (
          <CreditPage
            selectedCarId={selectedCarId}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage
            selectedCarId={selectedCarId}
            onNavigate={handleNavigate}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;