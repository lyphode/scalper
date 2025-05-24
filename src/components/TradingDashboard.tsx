
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketDataCard } from './MarketDataCard';
import { HistoricalChart } from './HistoricalChart';
import { RiskSignals } from './RiskSignals';
import { FundamentalData } from './FundamentalData';
import { OptionsData } from './OptionsData';
import { Search, TrendingUp, AlertTriangle } from 'lucide-react';

// Simple interface for stock data in the mini cards
interface MiniStockData {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export const TradingDashboard = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [miniStocksData, setMiniStocksData] = useState<Record<string, MiniStockData>>({});
  
  // Generate random data for mini stock cards
  useEffect(() => {
    const newData: Record<string, MiniStockData> = {};
    
    watchlist.forEach(stock => {
      const basePrice = 100 + Math.random() * 200;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / basePrice) * 100;
      
      newData[stock] = {
        price: basePrice,
        change: change,
        changePercent: changePercent,
        volume: Math.floor(Math.random() * 90000000) + 10000000
      };
    });
    
    setMiniStocksData(newData);
  }, [watchlist]);

  const handleSymbolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol && !watchlist.includes(symbol.toUpperCase())) {
      const newWatchlist = [...watchlist, symbol.toUpperCase()];
      setWatchlist(newWatchlist);
      
      // Generate data for the new symbol
      const basePrice = 100 + Math.random() * 200;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / basePrice) * 100;
      
      setMiniStocksData(prev => ({
        ...prev,
        [symbol.toUpperCase()]: {
          price: basePrice,
          change: change,
          changePercent: changePercent,
          volume: Math.floor(Math.random() * 90000000) + 10000000
        }
      }));
    }
    setSelectedStock(symbol.toUpperCase());
  };

  // Format volume for display
  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Scalping Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Real-time market data for 1-4 minute trades</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Live Data</span>
            </div>
          </div>
        </div>

        {/* Symbol Search */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search size={20} />
              <span>Market Symbol</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSymbolSubmit} className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter symbol (e.g., AAPL, GOOGL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white flex-1"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add to Watchlist
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Watchlist */}
        <div className="flex flex-wrap gap-2 mb-6">
          {watchlist.map((stock) => (
            <Button
              key={stock}
              onClick={() => setSelectedStock(stock)}
              variant={selectedStock === stock ? "default" : "outline"}
              className={`${
                selectedStock === stock 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
              }`}
            >
              {stock}
            </Button>
          ))}
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="signals">Risk Signals</TabsTrigger>
            <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketDataCard symbol={selectedStock} />
              </div>
              <div>
                <RiskSignals symbol={selectedStock} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {watchlist.slice(0, 4).map((stock) => (
                <Card key={stock} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{stock}</span>
                      <Badge variant="outline" className="text-xs">
                        Live
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className={miniStocksData[stock]?.change >= 0 ? "text-green-400" : "text-red-400"}>
                          ${miniStocksData[stock]?.price.toFixed(2) || '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Change:</span>
                        <span className={miniStocksData[stock]?.change >= 0 ? "text-green-400" : "text-red-400"}>
                          {miniStocksData[stock]?.change >= 0 ? '+' : ''}
                          {miniStocksData[stock]?.changePercent.toFixed(2) || '0.00'}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volume:</span>
                        <span>{formatVolume(miniStocksData[stock]?.volume || 0)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historical">
            <HistoricalChart symbol={selectedStock} />
          </TabsContent>

          <TabsContent value="signals">
            <RiskSignals symbol={selectedStock} detailed={true} />
          </TabsContent>

          <TabsContent value="fundamentals">
            <FundamentalData symbols={watchlist} />
          </TabsContent>

          <TabsContent value="options">
            <OptionsData symbol={selectedStock} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
