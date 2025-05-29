
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Bell, User, BarChart3, PieChart, Wallet } from 'lucide-react';
import MarketOverview from '@/components/MarketOverview';
import StockList from '@/components/StockList';
import Portfolio from '@/components/Portfolio';
import SectorAnalysis from '@/components/SectorAnalysis';
import StockChart from '@/components/StockChart';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const marketStatus = {
    isOpen: currentTime.getHours() >= 9 && currentTime.getHours() < 16,
    nextOpen: currentTime.getHours() >= 16 ? 'Tomorrow 9:15 AM' : 'Today 9:15 AM',
    lastUpdated: currentTime.toLocaleTimeString()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-green-400" />
                <h1 className="text-2xl font-bold text-white">StockVeda</h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
                <div className={`w-2 h-2 rounded-full ${marketStatus.isOpen ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span>{marketStatus.isOpen ? 'Market Open' : 'Market Closed'}</span>
                <span>•</span>
                <span>Last updated: {marketStatus.lastUpdated}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar onStockSelect={setSelectedStock} />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Market Overview */}
          <div className="lg:col-span-4">
            <MarketOverview />
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">Overview</TabsTrigger>
                <TabsTrigger value="stocks" className="data-[state=active]:bg-white data-[state=active]:text-black">Stocks</TabsTrigger>
                <TabsTrigger value="sectors" className="data-[state=active]:bg-white data-[state=active]:text-black">Sectors</TabsTrigger>
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-white data-[state=active]:text-black">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <StockChart selectedStock={selectedStock} />
                <StockList onStockSelect={setSelectedStock} selectedStock={selectedStock} />
              </TabsContent>

              <TabsContent value="stocks">
                <StockList onStockSelect={setSelectedStock} selectedStock={selectedStock} />
              </TabsContent>

              <TabsContent value="sectors">
                <SectorAnalysis />
              </TabsContent>

              <TabsContent value="portfolio">
                <Portfolio />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Market Pulse</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Advances</span>
                  <div className="flex items-center space-x-1 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">1,847</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Declines</span>
                  <div className="flex items-center space-x-1 text-red-400">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-semibold">1,234</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Unchanged</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </CardContent>
            </Card>

            {/* Top Gainers */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Top Gainers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'ADANIPORTS', change: '+8.45%', price: '₹847.30' },
                  { name: 'TATAMOTORS', change: '+6.78%', price: '₹645.20' },
                  { name: 'HINDALCO', change: '+5.92%', price: '₹456.85' }
                ].map((stock, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">{stock.name}</div>
                      <div className="text-xs text-gray-400">{stock.price}</div>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">
                      {stock.change}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market News */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Market News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'RBI keeps repo rate unchanged at 6.5%', time: '2h ago' },
                  { title: 'IT sector shows strong Q3 earnings', time: '4h ago' },
                  { title: 'Foreign investors turn bullish on Indian markets', time: '6h ago' }
                ].map((news, index) => (
                  <div key={index} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="text-sm font-medium mb-1">{news.title}</div>
                    <div className="text-xs text-gray-400">{news.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
