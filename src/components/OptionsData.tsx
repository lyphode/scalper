
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OptionsDataProps {
  symbol: string;
}

export const OptionsData: React.FC<OptionsDataProps> = ({ symbol }) => {
  const [selectedExpiry, setSelectedExpiry] = useState('2024-01-19');
  
  const expiryDates = ['2024-01-19', '2024-01-26', '2024-02-02', '2024-02-16'];
  
  const callOptions = [
    { strike: 145, bid: 5.20, ask: 5.35, volume: 1250, openInterest: 3400, iv: 0.28 },
    { strike: 150, bid: 2.10, ask: 2.25, volume: 2100, openInterest: 5600, iv: 0.25 },
    { strike: 155, bid: 0.85, ask: 0.95, volume: 890, openInterest: 2300, iv: 0.32 },
    { strike: 160, bid: 0.25, ask: 0.35, volume: 450, openInterest: 1100, iv: 0.35 },
  ];
  
  const putOptions = [
    { strike: 145, bid: 0.15, ask: 0.25, volume: 320, openInterest: 1200, iv: 0.29 },
    { strike: 150, bid: 1.20, ask: 1.35, volume: 1450, openInterest: 4200, iv: 0.26 },
    { strike: 155, bid: 3.80, ask: 3.95, volume: 980, openInterest: 2800, iv: 0.31 },
    { strike: 160, bid: 7.20, ask: 7.40, volume: 560, openInterest: 1600, iv: 0.33 },
  ];

  const formatVolume = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getIVColor = (iv: number) => {
    if (iv < 0.25) return 'text-green-400';
    if (iv < 0.35) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Options Chain - {symbol}</CardTitle>
            <div className="flex space-x-2">
              {expiryDates.map((date) => (
                <Button
                  key={date}
                  size="sm"
                  variant={selectedExpiry === date ? "default" : "outline"}
                  onClick={() => setSelectedExpiry(date)}
                  className={selectedExpiry === date ? "bg-blue-600" : "bg-gray-700 border-gray-600"}
                >
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calls" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="calls">Call Options</TabsTrigger>
              <TabsTrigger value="puts">Put Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calls" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3">Strike</th>
                      <th className="text-right py-2 px-3">Bid</th>
                      <th className="text-right py-2 px-3">Ask</th>
                      <th className="text-right py-2 px-3">Volume</th>
                      <th className="text-right py-2 px-3">Open Int.</th>
                      <th className="text-right py-2 px-3">IV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {callOptions.map((option, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="py-3 px-3 font-semibold">${option.strike}</td>
                        <td className="text-right py-3 px-3 text-green-400">${option.bid.toFixed(2)}</td>
                        <td className="text-right py-3 px-3 text-red-400">${option.ask.toFixed(2)}</td>
                        <td className="text-right py-3 px-3">{formatVolume(option.volume)}</td>
                        <td className="text-right py-3 px-3">{formatVolume(option.openInterest)}</td>
                        <td className={`text-right py-3 px-3 ${getIVColor(option.iv)}`}>
                          {(option.iv * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="puts" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3">Strike</th>
                      <th className="text-right py-2 px-3">Bid</th>
                      <th className="text-right py-2 px-3">Ask</th>
                      <th className="text-right py-2 px-3">Volume</th>
                      <th className="text-right py-2 px-3">Open Int.</th>
                      <th className="text-right py-2 px-3">IV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {putOptions.map((option, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="py-3 px-3 font-semibold">${option.strike}</td>
                        <td className="text-right py-3 px-3 text-green-400">${option.bid.toFixed(2)}</td>
                        <td className="text-right py-3 px-3 text-red-400">${option.ask.toFixed(2)}</td>
                        <td className="text-right py-3 px-3">{formatVolume(option.volume)}</td>
                        <td className="text-right py-3 px-3">{formatVolume(option.openInterest)}</td>
                        <td className={`text-right py-3 px-3 ${getIVColor(option.iv)}`}>
                          {(option.iv * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Options Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Call Volume</span>
              <span className="text-green-400 font-semibold">4.7K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Put Volume</span>
              <span className="text-red-400 font-semibold">3.2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Put/Call Ratio</span>
              <span className="font-semibold">0.68</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <Badge variant="outline" className="text-green-400 bg-green-500/20 border-green-500">
                Bullish Sentiment
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Max Pain Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Max Pain Strike</span>
              <span className="font-semibold">$150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Price</span>
              <span className="font-semibold">$150.23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance</span>
              <span className="text-green-400 font-semibold">$0.23</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <Badge variant="outline" className="text-yellow-400 bg-yellow-500/20 border-yellow-500">
                Near Max Pain
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Implied Volatility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">30-Day IV</span>
              <span className="font-semibold">28.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">IV Rank</span>
              <span className="font-semibold">65%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">HV vs IV</span>
              <span className="text-red-400 font-semibold">-2.3%</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <Badge variant="outline" className="text-red-400 bg-red-500/20 border-red-500">
                High IV Environment
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
