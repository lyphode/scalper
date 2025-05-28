
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FundamentalDataProps {
  symbols: string[];
}

export const FundamentalData: React.FC<FundamentalDataProps> = ({ symbols }) => {
  const fundamentalData = symbols.map(symbol => ({
    symbol,
    pe_ratio: Math.random() * 40 + 10,
    market_cap: Math.random() * 2000 + 100,
    revenue_growth: (Math.random() - 0.5) * 50,
    profit_margin: Math.random() * 30 + 5,
    debt_to_equity: Math.random() * 2,
    roe: Math.random() * 25 + 5,
    dividend_yield: Math.random() * 5,
    beta: Math.random() * 2 + 0.5,
    book_value: Math.random() * 50 + 10,
    eps: Math.random() * 10 + 1
  }));

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  const formatMarketCap = (num: number) => {
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}T`;
    return `$${num.toFixed(1)}B`;
  };

  const getValueColor = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      return value > 0 ? 'text-green-400' : 'text-red-400';
    }
    return 'text-white';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle>Fundamental Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-3">Symbol</th>
                  <th className="text-right py-2 px-3">P/E Ratio</th>
                  <th className="text-right py-2 px-3">Market Cap</th>
                  <th className="text-right py-2 px-3">Revenue Growth</th>
                  <th className="text-right py-2 px-3">Profit Margin</th>
                  <th className="text-right py-2 px-3">ROE</th>
                </tr>
              </thead>
              <tbody>
                {fundamentalData.map((data, index) => (
                  <tr key={data.symbol} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="py-3 px-3 font-semibold">{data.symbol}</td>
                    <td className="text-right py-3 px-3">{formatNumber(data.pe_ratio)}</td>
                    <td className="text-right py-3 px-3">{formatMarketCap(data.market_cap)}</td>
                    <td className={`text-right py-3 px-3 ${getValueColor(data.revenue_growth)}`}>
                      {data.revenue_growth > 0 ? '+' : ''}{formatNumber(data.revenue_growth)}%
                    </td>
                    <td className="text-right py-3 px-3">{formatNumber(data.profit_margin)}%</td>
                    <td className="text-right py-3 px-3">{formatNumber(data.roe)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundamentalData.slice(0, 6).map((data) => (
          <Card key={data.symbol} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{data.symbol}</span>
                <Badge variant="outline" className="text-xs">
                  Fundamentals
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-400 text-xs mb-1">P/E Ratio</div>
                  <div className="font-semibold">{formatNumber(data.pe_ratio)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">EPS</div>
                  <div className="font-semibold">${formatNumber(data.eps)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Beta</div>
                  <div className="font-semibold">{formatNumber(data.beta)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Dividend Yield</div>
                  <div className="font-semibold">{formatNumber(data.dividend_yield)}%</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Debt/Equity</div>
                  <div className="font-semibold">{formatNumber(data.debt_to_equity)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Book Value</div>
                  <div className="font-semibold">${formatNumber(data.book_value)}</div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Valuation</span>
                  <Badge variant="outline" className={`text-xs ${
                    data.pe_ratio < 20 ? 'text-green-400 bg-green-500/20 border-green-500' :
                    data.pe_ratio < 30 ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500' :
                    'text-red-400 bg-red-500/20 border-red-500'
                  }`}>
                    {data.pe_ratio < 20 ? 'Undervalued' : data.pe_ratio < 30 ? 'Fair' : 'Overvalued'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
