
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

interface StockChartProps {
  selectedStock: string;
}

const StockChart = ({ selectedStock }: StockChartProps) => {
  // Sample data for the chart
  const generateChartData = () => {
    const data = [];
    const basePrice = 2800;
    for (let i = 0; i < 30; i++) {
      const variation = (Math.random() - 0.5) * 100;
      data.push({
        day: i + 1,
        price: basePrice + variation + (i * 2),
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const currentPrice = chartData[chartData.length - 1]?.price || 2847;
  const previousPrice = chartData[chartData.length - 2]?.price || 2820;
  const priceChange = currentPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;

  const stockInfo = {
    RELIANCE: { name: 'Reliance Industries Ltd.', sector: 'Oil & Gas' },
    TCS: { name: 'Tata Consultancy Services', sector: 'IT Services' },
    HDFCBANK: { name: 'HDFC Bank Limited', sector: 'Banking' },
    INFY: { name: 'Infosys Limited', sector: 'IT Services' },
    ICICIBANK: { name: 'ICICI Bank Limited', sector: 'Banking' },
    HINDUNILVR: { name: 'Hindustan Unilever Ltd.', sector: 'FMCG' }
  };

  const info = stockInfo[selectedStock as keyof typeof stockInfo] || stockInfo.RELIANCE;

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
            <div className="font-semibold">₹2,820 - ₹2,895</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">52W Range</div>
            <div className="font-semibold">₹2,220 - ₹3,024</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">Volume</div>
            <div className="font-semibold">2.1M</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-gray-400">Avg Volume</div>
            <div className="font-semibold">1.8M</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
