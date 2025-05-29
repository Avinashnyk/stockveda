
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview = () => {
  const indices = [
    {
      name: 'NIFTY 50',
      value: '22,045.70',
      change: '+157.35',
      changePercent: '+0.72%',
      isPositive: true
    },
    {
      name: 'SENSEX',
      value: '72,458.15',
      change: '+468.22',
      changePercent: '+0.65%',
      isPositive: true
    },
    {
      name: 'BANK NIFTY',
      value: '46,127.80',
      change: '-234.55',
      changePercent: '-0.51%',
      isPositive: false
    },
    {
      name: 'NIFTY IT',
      value: '34,256.45',
      change: '+287.90',
      changePercent: '+0.85%',
      isPositive: true
    },
    {
      name: 'NIFTY AUTO',
      value: '18,967.32',
      change: '+156.78',
      changePercent: '+0.83%',
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {indices.map((index, i) => (
        <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-300 mb-2">{index.name}</h3>
              <div className="text-xl font-bold text-white mb-1">{index.value}</div>
              <div className={`flex items-center justify-center space-x-1 text-sm ${
                index.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {index.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{index.change}</span>
                <span>({index.changePercent})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketOverview;
