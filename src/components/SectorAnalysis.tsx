import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SectorAnalysis = () => {
  const sectorData = [
    {
      sector: 'IT Services',
      change: 2.45,
      marketCap: '12.5L Cr',
      stocks: ['TCS', 'INFY', 'WIPRO', 'HCLTECH'],
      topGainer: 'INFY (+3.2%)',
      topLoser: 'WIPRO (-0.8%)'
    },
    {
      sector: 'Banking',
      change: -0.85,
      marketCap: '25.3L Cr',
      stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK'],
      topGainer: 'ICICIBANK (+1.2%)',
      topLoser: 'HDFCBANK (-2.1%)'
    },
    {
      sector: 'Oil & Gas',
      change: 1.76,
      marketCap: '22.1L Cr',
      stocks: ['RELIANCE', 'ONGC', 'IOC', 'BPCL'],
      topGainer: 'RELIANCE (+2.3%)',
      topLoser: 'IOC (-0.5%)'
    },
    {
      sector: 'FMCG',
      change: -1.23,
      marketCap: '8.7L Cr',
      stocks: ['HINDUNILVR', 'ITC', 'NESTLEIND', 'BRITANNIA'],
      topGainer: 'BRITANNIA (+0.8%)',
      topLoser: 'HINDUNILVR (-2.1%)'
    },
    {
      sector: 'Automobiles',
      change: 3.21,
      marketCap: '6.9L Cr',
      stocks: ['MARUTI', 'TATAMOTORS', 'M&M', 'BAJAJ-AUTO'],
      topGainer: 'TATAMOTORS (+5.2%)',
      topLoser: 'M&M (-0.3%)'
    },
    {
      sector: 'Pharmaceuticals',
      change: 0.95,
      marketCap: '4.2L Cr',
      stocks: ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'DIVISLAB'],
      topGainer: 'DRREDDY (+2.1%)',
      topLoser: 'CIPLA (-0.8%)'
    }
  ];

  const chartData = sectorData.map(sector => ({
    name: sector.sector.replace(' & ', '\n& '),
    change: sector.change,
    absChange: Math.abs(sector.change)
  }));

  return (
    <div className="space-y-6">
      {/* Sector Performance Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Sector Performance Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(2)}%`, 'Change']}
                />
                <Bar dataKey="change" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sector Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectorData.map((sector) => (
          <Card key={sector.sector} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sector.sector}</CardTitle>
                <div className={`flex items-center space-x-1 ${
                  sector.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {sector.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-bold">
                    {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Market Cap</span>
                  <div className="font-semibold">{sector.marketCap}</div>
                </div>
                <div>
                  <span className="text-gray-400">Stocks</span>
                  <div className="font-semibold">{sector.stocks.length}</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Top Gainer:</span>
                  <span className="text-green-400 font-semibold">{sector.topGainer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Top Loser:</span>
                  <span className="text-red-400 font-semibold">{sector.topLoser}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {sector.stocks.map((stock) => (
                  <span
                    key={stock}
                    className="px-2 py-1 bg-white/10 rounded text-xs font-medium"
                  >
                    {stock}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SectorAnalysis;
