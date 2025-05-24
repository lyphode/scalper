
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MarketDataCard } from './MarketDataCard';
import { HistoricalChart } from './HistoricalChart';
import { RiskSignals } from './RiskSignals';
import { FundamentalData } from './FundamentalData';
import { OptionsData } from './OptionsData';
import { Search, TrendingUp, AlertTriangle, Check, ChevronsUpDown } from 'lucide-react';

// Simple interface for stock data in the mini cards
interface MiniStockData {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

// Define market indices alongside individual stocks
const marketIndices = [
  { value: "^GDAXI", label: "DAX 40", type: "index" },
  { value: "^FTSE", label: "FTSE 100", type: "index" },
  { value: "^GSPC", label: "S&P 500", type: "index" },
  { value: "^DJI", label: "Dow Jones", type: "index" },
  { value: "^IXIC", label: "NASDAQ", type: "index" },
  { value: "^N225", label: "Nikkei 225", type: "index" },
  { value: "^HSI", label: "Hang Seng", type: "index" },
  { value: "AAPL", label: "Apple", type: "stock" },
  { value: "MSFT", label: "Microsoft", type: "stock" },
  { value: "GOOGL", label: "Google", type: "stock" },
  { value: "AMZN", label: "Amazon", type: "stock" },
  { value: "TSLA", label: "Tesla", type: "stock" },
  { value: "META", label: "Meta", type: "stock" },
  { value: "NVDA", label: "NVIDIA", type: "stock" },
];

export const TradingDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', '^GSPC', '^FTSE']);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [miniStocksData, setMiniStocksData] = useState<Record<string, MiniStockData>>({});
  
  // Generate random data for mini stock cards
  useEffect(() => {
    const generateData = () => {
      const newData: Record<string, MiniStockData> = {};
      
      watchlist.forEach(stock => {
        const isIndex = stock.startsWith('^');
        const basePrice = isIndex ? 1000 + Math.random() * 5000 : 100 + Math.random() * 200;
        const change = (Math.random() - 0.5) * (isIndex ? 50 : 10);
        const changePercent = (change / basePrice) * 100;
        
        newData[stock] = {
          price: basePrice,
          change: change,
          changePercent: changePercent,
          volume: Math.floor(Math.random() * 90000000) + 10000000
        };
      });
      
      return newData;
    };
    
    setMiniStocksData(generateData());
  }, [watchlist]);
  
  // Update data when selected stock changes
  useEffect(() => {
    if (selectedStock && !miniStocksData[selectedStock]) {
      const isIndex = selectedStock.startsWith('^');
      const basePrice = isIndex ? 1000 + Math.random() * 5000 : 100 + Math.random() * 200;
      const change = (Math.random() - 0.5) * (isIndex ? 50 : 10);
      const changePercent = (change / basePrice) * 100;
      
      setMiniStocksData(prev => ({
        ...prev,
        [selectedStock]: {
          price: basePrice,
          change: change,
          changePercent: changePercent,
          volume: Math.floor(Math.random() * 90000000) + 10000000
        }
      }));
    }
  }, [selectedStock]);

  const handleAddToWatchlist = (value: string) => {
    if (value && !watchlist.includes(value)) {
      const newWatchlist = [...watchlist, value];
      setWatchlist(newWatchlist);
      
      // Generate data for the new symbol if needed
      if (!miniStocksData[value]) {
        const isIndex = value.startsWith('^');
        const basePrice = isIndex ? 1000 + Math.random() * 5000 : 100 + Math.random() * 200;
        const change = (Math.random() - 0.5) * (isIndex ? 50 : 10);
        const changePercent = (change / basePrice) * 100;
        
        setMiniStocksData(prev => ({
          ...prev,
          [value]: {
            price: basePrice,
            change: change,
            changePercent: changePercent,
            volume: Math.floor(Math.random() * 90000000) + 10000000
          }
        }));
      }
    }
    setSelectedStock(value);
    setOpen(false);
  };

  // Format volume for display
  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toString();
  };

  // Format symbol for display (remove ^ prefix for indices)
  const formatDisplayName = (symbol: string) => {
    const index = marketIndices.find(item => item.value === symbol);
    if (index) {
      return index.label;
    }
    return symbol;
  };

  // Get filtered indices based on search query
  const filteredIndices = marketIndices.filter(item => 
    item.type === "index" && (
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get filtered stocks based on search query
  const filteredStocks = marketIndices.filter(item => 
    item.type === "stock" && (
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
            <CardTitle className="flex items-center space-x-2 text-white">
              <Search size={20} />
              <span>Market Symbol or Index</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    {selectedStock ? formatDisplayName(selectedStock) : "Search symbols..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
                  <Command className="bg-gray-800 text-white">
                    <CommandInput 
                      placeholder="Search stocks and indices..." 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="bg-gray-800 text-white"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Market Indices">
                        {filteredIndices.map(item => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(value) => handleAddToWatchlist(value)}
                            className="text-white hover:bg-gray-700"
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${selectedStock === item.value ? "opacity-100" : "opacity-0"}`}
                            />
                            {item.label}
                            <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500">
                              Index
                            </Badge>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup heading="Stocks">
                        {filteredStocks.map(item => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(value) => handleAddToWatchlist(value)}
                            className="text-white hover:bg-gray-700"
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${selectedStock === item.value ? "opacity-100" : "opacity-0"}`}
                            />
                            {item.label} ({item.value})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {searchQuery && (
                        <CommandGroup heading="Custom">
                          <CommandItem
                            value={searchQuery.toUpperCase()}
                            onSelect={(value) => handleAddToWatchlist(value)}
                            className="text-white hover:bg-gray-700"
                          >
                            Add "{searchQuery.toUpperCase()}"
                          </CommandItem>
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button 
                type="button" 
                onClick={() => handleAddToWatchlist(selectedStock)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add to Watchlist
              </Button>
            </div>
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
              {formatDisplayName(stock)}
              {stock.startsWith('^') && (
                <span className="ml-1 w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
              )}
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
