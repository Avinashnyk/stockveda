import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Plus, Wallet, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';

const Portfolio = () => {
  const portfolioData = [
    {
      stock: 'RELIANCE',
      quantity: 50,
      avgPrice: 2650,
      currentPrice: 2847.65,
      investment: 132500,
      currentValue: 142382.5,
      gainLoss: 9882.5,
      gainLossPercent: 7.46
    },
    {
      stock: 'TCS',
      quantity: 25,
      avgPrice: 3400,
      currentPrice: 3567.20,
      investment: 85000,
      currentValue: 89180,
      gainLoss: 4180,
      gainLossPercent: 4.92
    },
    {
      stock: 'HDFCBANK',
      quantity: 75,
      avgPrice: 1700,
      currentPrice: 1645.30,
      investment: 127500,
      currentValue: 123397.5,
      gainLoss: -4102.5,
      gainLossPercent: -3.22
    },
    {
      stock: 'INFY',
      quantity: 40,
      avgPrice: 1650,
      currentPrice: 1789.45,
      investment: 66000,
      currentValue: 71578,
      gainLoss: 5578,
      gainLossPercent: 8.45
    }
  ];

  const totalInvestment = portfolioData.reduce((sum, item) => sum + item.investment, 0);
  const totalCurrentValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const pieData = portfolioData.map(item => ({
    name: item.stock,
    value: item.currentValue,
    percentage: ((item.currentValue / totalCurrentValue) * 100).toFixed(1)
  }));

  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Investment</span>
            </div>
            <div className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <PieChart className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-400">Current Value</span>
            </div>
            <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
              <span className="text-sm text-gray-400">Total P&L</span>
            </div>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString()} ({totalGainLossPercent.toFixed(2)}%)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Holdings List */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Holdings</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Stock
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.map((holding) => (
                <div key={holding.stock} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">{holding.stock}</div>
                      <div className="text-sm text-gray-400">
                        {holding.quantity} shares @ ₹{holding.avgPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{holding.currentValue.toLocaleString()}</div>
                      <div className={`text-sm ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}₹{holding.gainLoss.toLocaleString()} ({holding.gainLossPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <div>
                      <span className="block">Investment</span>
                      <span className="text-white">₹{holding.investment.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block">Current Price</span>
                      <span className="text-white">₹{holding.currentPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Allocation */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Value']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
