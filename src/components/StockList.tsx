
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockListProps {
  onStockSelect: (stock: string) => void;
  selectedStock: string;
}

const StockList = ({ onStockSelect, selectedStock }: StockListProps) => {
  const stocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      price: '2,847.65',
      change: '+23.45',
      changePercent: '+0.83%',
      isPositive: true,
      volume: '2.1M',
      marketCap: '19.3L Cr',
      pe: '25.4',
      sector: 'Oil & Gas'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '3,567.20',
      change: '+45.80',
      changePercent: '+1.30%',
      isPositive: true,
      volume: '1.8M',
      marketCap: '13.0L Cr',
      pe: '27.8',
      sector: 'IT Services'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: '1,645.30',
      change: '-12.45',
      changePercent: '-0.75%',
      isPositive: false,
      volume: '3.2M',
      marketCap: '12.5L Cr',
      pe: '19.2',
      sector: 'Banking'
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: '1,789.45',
      change: '+34.20',
      changePercent: '+1.95%',
      isPositive: true,
      volume: '2.7M',
      marketCap: '7.4L Cr',
      pe: '24.6',
      sector: 'IT Services'
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Limited',
      price: '1,156.80',
      change: '+8.90',
      changePercent: '+0.78%',
      isPositive: true,
      volume: '4.1M',
      marketCap: '8.1L Cr',
      pe: '16.5',
      sector: 'Banking'
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Ltd.',
      price: '2,234.75',
      change: '-18.30',
      changePercent: '-0.81%',
      isPositive: false,
      volume: '1.5M',
      marketCap: '5.3L Cr',
      pe: '32.1',
      sector: 'FMCG'
    }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Top Stocks</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Star className="h-4 w-4 mr-1" />
              Watchlist
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 gap-3">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => onStockSelect(stock.symbol)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  selectedStock === stock.symbol 
                    ? 'bg-blue-500/20 border border-blue-400/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-lg">{stock.symbol}</div>
                    <div className="text-sm text-gray-400 truncate max-w-[200px]">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{stock.price}</div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stock.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{stock.change} ({stock.changePercent})</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-400">
                  <div>
                    <span className="block">Volume</span>
                    <span className="text-white font-medium">{stock.volume}</span>
                  </div>
                  <div>
                    <span className="block">Mkt Cap</span>
                    <span className="text-white font-medium">{stock.marketCap}</span>
                  </div>
                  <div>
                    <span className="block">P/E</span>
                    <span className="text-white font-medium">{stock.pe}</span>
                  </div>
                  <div>
                    <span className="block">Sector</span>
                    <span className="text-white font-medium">{stock.sector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockList;
