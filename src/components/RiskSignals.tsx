
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface RiskSignalsProps {
  symbol: string;
  detailed?: boolean;
}

export const RiskSignals: React.FC<RiskSignalsProps> = ({ symbol, detailed = false }) => {
  const signals = [
    {
      type: 'Technical',
      signal: 'RSI Oversold',
      risk: 'Low',
      description: 'RSI indicates oversold conditions - potential buy opportunity',
      confidence: 85,
      timeframe: '1min'
    },
    {
      type: 'Volume',
      signal: 'High Volume Spike',
      risk: 'Medium',
      description: 'Unusual volume activity detected',
      confidence: 72,
      timeframe: '4min'
    },
    {
      type: 'Price Action',
      signal: 'Support Break',
      risk: 'High',
      description: 'Price broke below key support level',
      confidence: 91,
      timeframe: '2min'
    },
    {
      type: 'Momentum',
      signal: 'MACD Bullish Cross',
      risk: 'Low',
      description: 'MACD signal line crossed above zero',
      confidence: 78,
      timeframe: '3min'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-500';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 'High': return 'text-red-400 bg-red-500/20 border-red-500';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <TrendingUp size={16} />;
      case 'Medium': return <Activity size={16} />;
      case 'High': return <AlertTriangle size={16} />;
      default: return <Activity size={16} />;
    }
  };

  if (!detailed) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle size={20} />
            <span>Risk Signals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {signals.slice(0, 3).map((signal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {getRiskIcon(signal.risk)}
                <div>
                  <div className="font-semibold text-sm">{signal.signal}</div>
                  <div className="text-xs text-gray-400">{signal.timeframe}</div>
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${getRiskColor(signal.risk)}`}>
                {signal.risk}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Active Signals - {symbol}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {signals.map((signal, index) => (
            <div key={index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getRiskIcon(signal.risk)}
                  <span className="font-semibold text-blue-300">{signal.signal}</span>
                </div>
                <Badge variant="outline" className={`text-xs ${getRiskColor(signal.risk)}`}>
                  {signal.risk} Risk
                </Badge>
              </div>
              <div className="text-sm text-gray-300 mb-2">{signal.description}</div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{signal.type} • {signal.timeframe}</span>
                <span>Confidence: {signal.confidence}%</span>
              </div>
              <div className="mt-2 bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${signal.confidence}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Risk Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span>Overall Risk Level</span>
              <Badge variant="outline" className="text-yellow-400 bg-yellow-500/20 border-yellow-500">
                Medium
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Low Risk Signals</span>
                  <span className="text-green-400">2</span>
                </div>
                <div className="bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Medium Risk Signals</span>
                  <span className="text-yellow-400">1</span>
                </div>
                <div className="bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>High Risk Signals</span>
                  <span className="text-red-400">1</span>
                </div>
                <div className="bg-gray-600 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-sm font-semibold text-blue-400 mb-1">Scalping Recommendation</div>
              <div className="text-xs text-gray-300">
                Current conditions favor short-term bullish positions with tight stop-losses. 
                Monitor volume for confirmation signals.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
