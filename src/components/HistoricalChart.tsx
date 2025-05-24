
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock } from 'lucide-react';

interface HistoricalChartProps {
  symbol: string;
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({ symbol }) => {
  const [timeRange, setTimeRange] = useState('1D');
  const [chartData, setChartData] = useState([]);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  // Check if market is open (simplified logic - real implementation would use actual market hours)
  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      
      // Simplified check: Market open on weekdays (Mon-Fri) between 9:30 AM and 4:00 PM ET
      // This is a simplified version - real implementation would account for holidays and exact timezone
      const isWeekday = day >= 1 && day <= 5;
      const isDuringMarketHours = hours >= 9 && hours < 16;
      
      setIsMarketOpen(isWeekday && isDuringMarketHours);
    };

    checkMarketStatus();
    const intervalId = setInterval(checkMarketStatus, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // Generate sample historical data
  useEffect(() => {
    const generateData = () => {
      const data = [];
      const basePrice = 150;
      let currentPrice = basePrice;
      
      const points = timeRange === '1D' ? 390 : timeRange === '1W' ? 35 : 30; // 1-minute intervals for 1D
      
      for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * 2;
        currentPrice += change;
        
        const time = timeRange === '1D' 
          ? new Date(Date.now() - (points - i) * 60000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
          : timeRange === '1W'
          ? new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
          : new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString();
        
        data.push({
          time,
          price: currentPrice.toFixed(2),
          volume: Math.floor(Math.random() * 1000000) + 500000,
          high: (currentPrice + Math.random() * 2).toFixed(2),
          low: (currentPrice - Math.random() * 2).toFixed(2),
        });
      }
      return data;
    };

    setChartData(generateData());
  }, [symbol, timeRange]);

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-white">
            <span>Historical Data - {symbol}</span>
            {isMarketOpen ? (
              <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-400 border-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                Market Open
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 bg-red-500/20 text-red-400 border-red-500">
                <Clock className="h-3 w-3 mr-1" />
                Market Closed
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            {['1D', '1W', '1M'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "outline"}
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "bg-blue-600" : "bg-gray-700 border-gray-600"}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar 
                dataKey="price" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Price"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-gray-400 text-sm">Avg Price</div>
            <div className="font-semibold text-lg text-white">
              ${chartData.length > 0 ? (chartData.reduce((sum: number, item: any) => sum + parseFloat(item.price), 0) / chartData.length).toFixed(2) : '0.00'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Range</div>
            <div className="font-semibold text-lg text-white">
              {chartData.length > 0 ? 
                `$${Math.max(...chartData.map((item: any) => parseFloat(item.price))).toFixed(2)} - $${Math.min(...chartData.map((item: any) => parseFloat(item.price))).toFixed(2)}` 
                : '$0.00 - $0.00'
              }
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Volatility</div>
            <div className="font-semibold text-lg text-yellow-400">Medium</div>
          </div>
        </div>
        
        {!isMarketOpen && (
          <div className="mt-4 p-3 bg-gray-700/50 border border-gray-600 rounded-md flex items-center text-amber-300">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Market is currently closed. Data shown reflects the most recent trading session.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
