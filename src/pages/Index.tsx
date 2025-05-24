
import React from 'react';
import { TradingDashboard } from '@/components/TradingDashboard';
import { TooltipProvider } from '@/components/ui/tooltip';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <TooltipProvider>
        <TradingDashboard />
      </TooltipProvider>
    </div>
  );
};

export default Index;
