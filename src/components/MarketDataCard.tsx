
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface MarketDataCardProps {
  symbol: string;
}

export const MarketDataCard: React.FC<MarketDataCardProps> = ({ symbol }) => {
  const [marketData, setMarketData] = useState({
    price: 150.23,
    change: 2.45,
    changePercent: 1.65,
    volume: 45234567,
    marketCap: 2.45e12,
    dayHigh: 152.10,
    dayLow: 148.90,
    pe_ratio: 28.5,
    avgVolume: 67234567
  });

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 2,
        change: prev.change + (Math.random() - 0.5) * 0.5,
        volume: prev.volume + Math.floor((Math.random() - 0.5) * 1000000)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [symbol]);

  const isPositive = marketData.change >= 0;
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold">{symbol}</span>
            <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
              {isPositive ? "BUY" : "SELL"} Signal
            </Badge>
          </div>
          {isPositive ? (
            <TrendingUp className="text-green-500" size={24} />
          ) : (
            <TrendingDown className="text-red-500" size={24} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Section */}
        <div className="text-center border-b border-gray-700 pb-4">
          <div className="text-4xl font-bold mb-2">
            ${marketData.price.toFixed(2)}
          </div>
          <div className={`text-lg flex items-center justify-center space-x-2 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <span>{isPositive ? '+' : ''}{marketData.change.toFixed(2)}</span>
            <span>({isPositive ? '+' : ''}{marketData.changePercent.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Day High</div>
              <div className="text-green-400 font-semibold">${marketData.dayHigh.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Volume</div>
              <div className="font-semibold">{formatVolume(marketData.volume)}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Market Cap</div>
              <div className="font-semibold">{formatNumber(marketData.marketCap)}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Day Low</div>
              <div className="text-red-400 font-semibold">${marketData.dayLow.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Avg Volume</div>
              <div className="font-semibold">{formatVolume(marketData.avgVolume)}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">P/E Ratio</div>
              <div className="font-semibold">{marketData.pe_ratio.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Trading Indicators */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Volatility</div>
            <Badge variant="outline" className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500">
              Medium
            </Badge>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Liquidity</div>
            <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500">
              High
            </Badge>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Trend</div>
            <Badge variant="outline" className={`text-xs ${
              isPositive 
                ? 'bg-green-500/20 text-green-400 border-green-500' 
                : 'bg-red-500/20 text-red-400 border-red-500'
            }`}>
              {isPositive ? 'Bullish' : 'Bearish'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
