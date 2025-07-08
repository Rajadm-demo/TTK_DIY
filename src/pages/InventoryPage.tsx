import React, { useState, useMemo } from 'react';
import CarCard from '../components/customer/CarCard';
import FilterSidebar from '../components/customer/FilterSidebar';
import { Car, CarFilters } from '../types/Car';
import { Filter, Grid, List, Search } from 'lucide-react';

interface InventoryPageProps {
  cars: Car[];
  onNavigate: (page: string, carId?: string) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ cars, onNavigate }) => {
  const [filters, setFilters] = useState<CarFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'year-new' | 'year-old' | 'mileage-low'>('price-low');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => car.available);

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(car =>
        `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.make) {
      filtered = filtered.filter(car => car.make === filters.make);
    }
    
    if (filters.condition && filters.condition !== 'all') {
      filtered = filtered.filter(car => car.condition === filters.condition);
    }
    
    if (filters.type) {
      filtered = filtered.filter(car => car.type === filters.type);
    }
    
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(car => 
        car.price >= filters.priceRange![0] && car.price <= filters.priceRange![1]
      );
    }
    
    if (filters.yearRange) {
      filtered = filtered.filter(car => 
        car.year >= filters.yearRange![0] && car.year <= filters.yearRange![1]
      );
    }
    
    if (filters.mileageRange) {
      filtered = filtered.filter(car => 
        car.mileage >= filters.mileageRange![0] && car.mileage <= filters.mileageRange![1]
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'mileage-low':
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return filtered;
  }, [cars, filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vehicle Inventory</h1>
          <p className="text-lg text-gray-600">
            Find your perfect vehicle from our extensive inventory of quality cars.
          </p>
        </div>
        
        {/* Search and Controls */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by make, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="mileage-low">Mileage: Low to High</option>
              </select>
              
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredAndSortedCars.length} of {cars.filter(car => car.available).length} vehicles
          </div>
        </div>
        
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          
          {/* Results */}
          <div className="flex-1">
            {filteredAndSortedCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">No vehicles found matching your criteria.</p>
                <button
                  onClick={() => setFilters({})}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear filters to see all vehicles
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={(carId) => onNavigate('car-details', carId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;