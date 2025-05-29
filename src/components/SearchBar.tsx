
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onStockSelect: (stock: string) => void;
}

const SearchBar = ({ onStockSelect }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const stocks = [
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'HINDUNILVR',
    'ITC', 'KOTAKBANK', 'LT', 'SBIN', 'ASIANPAINT', 'MARUTI',
    'BAJFINANCE', 'HCLTECH', 'AXISBANK', 'WIPRO', 'ULTRACEMCO', 'TITAN',
    'NESTLEIND', 'BHARTIARTL', 'POWERGRID', 'NTPC', 'COALINDIA', 'DRREDDY',
    'SUNPHARMA', 'TATASTEEL', 'JSWSTEEL', 'ADANIENT', 'ADANIPORTS'
  ];

  const filteredStocks = stocks.filter(stock =>
    stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = (stock: string) => {
    console.log('Stock selected:', stock);
    onStockSelect(stock);
    setSearchTerm(stock); // Show selected stock in search bar
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(searchTerm.length > 0)}
          onBlur={() => {
            // Delay closing to allow click on dropdown items
            setTimeout(() => setIsOpen(false), 200);
          }}
          className="pl-10 pr-8 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ×
          </button>
        )}
      </div>
      
      {isOpen && filteredStocks.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-md border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredStocks.slice(0, 10).map((stock) => (
            <button
              key={stock}
              onClick={() => handleStockSelect(stock)}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-b-0 flex justify-between items-center"
            >
              <span className="font-medium">{stock}</span>
              <span className="text-xs text-gray-400">Select</span>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && filteredStocks.length === 0 && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-md border border-gray-600 rounded-lg shadow-lg z-50 p-4">
          <div className="text-gray-400 text-center">No stocks found for "{searchTerm}"</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
