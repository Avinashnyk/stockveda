
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
    'BAJFINANCE', 'HCLTECH', 'AXISBANK', 'WIPRO', 'ULTRACEMCO', 'TITAN'
  ];

  const filteredStocks = stocks.filter(stock =>
    stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = (stock: string) => {
    onStockSelect(stock);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(searchTerm.length > 0)}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
        />
      </div>
      
      {isOpen && filteredStocks.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredStocks.slice(0, 10).map((stock) => (
            <button
              key={stock}
              onClick={() => handleStockSelect(stock)}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            >
              {stock}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
