
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

interface StockChartProps {
  selectedStock: string;
}

const StockChart = ({ selectedStock }: StockChartProps) => {
  // Generate unique data for each stock based on stock name
  const generateChartData = (stockSymbol: string) => {
    const data = [];
    // Use stock symbol to create a seed for consistent but different data per stock
    const seed = stockSymbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Different base prices for different stocks
    const stockPrices: { [key: string]: number } = {
      'RELIANCE': 2847,
      'TCS': 3421,
      'HDFCBANK': 1654,
      'INFY': 1789,
      'ICICIBANK': 987,
      'HINDUNILVR': 2543,
      'ITC': 456,
      'KOTAKBANK': 1876,
      'LT': 3234,
      'SBIN': 623,
      'ASIANPAINT': 3456,
      'MARUTI': 9876,
      'BAJFINANCE': 7234,
      'HCLTECH': 1432,
      'AXISBANK': 1098,
      'WIPRO': 543,
      'ULTRACEMCO': 8765,
      'TITAN': 3210,
      'NESTLEIND': 23456,
      'BHARTIARTL': 876,
      'POWERGRID': 234,
      'NTPC': 345,
      'COALINDIA': 432,
      'DRREDDY': 5678,
      'SUNPHARMA': 1234,
      'TATASTEEL': 987,
      'JSWSTEEL': 765,
      'ADANIENT': 2345,
      'ADANIPORTS': 1432
    };
    
    const basePrice = stockPrices[stockSymbol] || 1000 + (seed % 2000);
    
    for (let i = 0; i < 30; i++) {
      // Create more realistic price movements
      const trend = Math.sin((seed + i) * 0.1) * 50; // Overall trend
      const volatility = (Math.sin((seed * 2 + i) * 0.3) * 30) + (Math.random() - 0.5) * 40; // Daily volatility
      const price = basePrice + trend + volatility + (i * (seed % 10 - 5)); // Some growth/decline over time
      
      data.push({
        day: i + 1,
        price: Math.max(price, basePrice * 0.7), // Prevent negative prices
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    return data;
  };

  const chartData = generateChartData(selectedStock);
  const currentPrice = chartData[chartData.length - 1]?.price || 1000;
  const previousPrice = chartData[chartData.length - 2]?.price || 1000;
  const priceChange = currentPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;

  const stockInfo = {
    RELIANCE: { name: 'Reliance Industries Ltd.', sector: 'Oil & Gas' },
    TCS: { name: 'Tata Consultancy Services', sector: 'IT Services' },
    HDFCBANK: { name: 'HDFC Bank Limited', sector: 'Banking' },
    INFY: { name: 'Infosys Limited', sector: 'IT Services' },
    ICICIBANK: { name: 'ICICI Bank Limited', sector: 'Banking' },
    HINDUNILVR: { name: 'Hindustan Unilever Ltd.', sector: 'FMCG' },
    ITC: { name: 'ITC Limited', sector: 'FMCG' },
    KOTAKBANK: { name: 'Kotak Mahindra Bank', sector: 'Banking' },
    LT: { name: 'Larsen & Toubro Ltd.', sector: 'Construction' },
    SBIN: { name: 'State Bank of India', sector: 'Banking' },
    ASIANPAINT: { name: 'Asian Paints Limited', sector: 'Paints' },
    MARUTI: { name: 'Maruti Suzuki India Ltd.', sector: 'Automobile' },
    BAJFINANCE: { name: 'Bajaj Finance Limited', sector: 'Financial Services' },
    HCLTECH: { name: 'HCL Technologies Ltd.', sector: 'IT Services' },
    AXISBANK: { name: 'Axis Bank Limited', sector: 'Banking' },
    WIPRO: { name: 'Wipro Limited', sector: 'IT Services' },
    ULTRACEMCO: { name: 'UltraTech Cement Ltd.', sector: 'Cement' },
    TITAN: { name: 'Titan Company Limited', sector: 'Jewelry' },
    NESTLEIND: { name: 'Nestle India Limited', sector: 'FMCG' },
    BHARTIARTL: { name: 'Bharti Airtel Limited', sector: 'Telecom' },
    POWERGRID: { name: 'Power Grid Corporation', sector: 'Power' },
    NTPC: { name: 'NTPC Limited', sector: 'Power' },
    COALINDIA: { name: 'Coal India Limited', sector: 'Mining' },
    DRREDDY: { name: 'Dr. Reddys Laboratories', sector: 'Pharmaceuticals' },
    SUNPHARMA: { name: 'Sun Pharmaceutical Ind.', sector: 'Pharmaceuticals' },
    TATASTEEL: { name: 'Tata Steel Limited', sector: 'Steel' },
    JSWSTEEL: { name: 'JSW Steel Limited', sector: 'Steel' },
    ADANIENT: { name: 'Adani Enterprises Ltd.', sector: 'Diversified' },
    ADANIPORTS: { name: 'Adani Ports & SEZ Ltd.', sector: 'Infrastructure' }
  };

  const info = stockInfo[selectedStock as keyof typeof stockInfo] || { name: selectedStock, sector: 'Unknown' };

  // Calculate day range and 52-week range based on chart data
  const prices = chartData.map(d => d.price);
  const dayHigh = Math.max(...prices.slice(-5)); // Last 5 days high
  const dayLow = Math.min(...prices.slice(-5)); // Last 5 days low
  const weekHigh52 = Math.max(...prices) * 1.15; // Simulate 52-week high
  const weekLow52 = Math.min(...prices) * 0.85; // Simulate 52-week low

  console.log(`Updated chart for ${selectedStock} - Current Price: ₹${currentPrice.toFixed(2)}`);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{selectedStock}</CardTitle>
            <p className="text-gray-400">{info.name}</p>
            <p className="text-sm text-gray-500">{info.sector}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{currentPrice.toFixed(2)}</div>
            <div className={`flex items-center space-x-1 ${
              priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {priceChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span className="text-lg font-semibold">
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="bg-green-600 hover:bg-green-700 border-green-500 text-white">
            <Plus className="h-4 w-4 mr-1" />
            Buy
          </Button>
          <Button variant="outline" size="sm" className="bg-red-600 hover:bg-red-700 border-red-500 text-white">
            Sell
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            Add to Watchlist
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '3M', '6M', '1Y'].map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                className={`text-white hover:bg-white/10 ${period === '1M' ? 'bg-white/20' : ''}`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`₹${value.toFixed(2)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">Day's Range</div>
            <div className="font-semibold">₹{dayLow.toFixed(0)} - ₹{dayHigh.toFixed(0)}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">52W Range</div>
            <div className="font-semibold">₹{weekLow52.toFixed(0)} - ₹{weekHigh52.toFixed(0)}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">Volume</div>
            <div className="font-semibold">{(chartData[chartData.length - 1]?.volume / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">Avg Volume</div>
            <div className="font-semibold">{(chartData.reduce((acc, d) => acc + d.volume, 0) / chartData.length / 1000000).toFixed(1)}M</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
