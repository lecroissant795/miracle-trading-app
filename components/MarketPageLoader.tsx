import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Seamless skeleton loader that mirrors the Market Hub (Dashboard) layout.
 * Shown briefly when the user navigates to the market page, then fades into real content.
 */
const MarketPageLoader: React.FC = () => {
  return (
    <div className="p-0 h-full overflow-hidden bg-slate-50 animate-fade-in">
      {/* Header Bar skeleton */}
      <div className="sticky top-0 z-20 bg-white/90 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-slate-100">
            <ArrowLeft size={20} className="text-slate-300" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-28 bg-slate-200 rounded-md skeleton-shimmer" />
            <div className="h-4 w-24 bg-slate-100 rounded ml-2 skeleton-shimmer" style={{ animationDelay: '100ms' }} />
          </div>
        </div>
        <div className="h-8 w-24 bg-emerald-100 rounded-full skeleton-shimmer" style={{ animationDelay: '150ms' }} />
      </div>

      {/* Ticker strip skeleton */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-4">
        <div className="flex gap-8 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4 shrink-0">
              <div className="h-3 w-20 bg-slate-700 rounded skeleton-shimmer" style={{ animationDelay: `${i * 50}ms` }} />
              <div className="h-3 w-12 bg-slate-700/80 rounded skeleton-shimmer" style={{ animationDelay: `${i * 50 + 20}ms` }} />
              <div className="h-3 w-10 bg-slate-700/60 rounded skeleton-shimmer" style={{ animationDelay: `${i * 50 + 40}ms` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hero card skeleton */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl overflow-hidden bg-slate-200 aspect-[16/9] skeleton-shimmer" />
            {/* News cards skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="w-32 h-24 rounded-xl bg-slate-100 skeleton-shimmer shrink-0" style={{ animationDelay: `${100 + i * 80}ms` }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-100 rounded skeleton-shimmer" style={{ animationDelay: `${120 + i * 80}ms` }} />
                    <div className="h-4 w-full bg-slate-50 rounded skeleton-shimmer" style={{ animationDelay: `${140 + i * 80}ms` }} />
                    <div className="h-4 w-1/2 bg-slate-50 rounded skeleton-shimmer" style={{ animationDelay: `${160 + i * 80}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100">
              <div className="h-5 w-32 bg-slate-100 rounded mb-4 skeleton-shimmer" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div className="h-4 w-20 bg-slate-100 rounded skeleton-shimmer" style={{ animationDelay: `${200 + i * 50}ms` }} />
                    <div className="h-4 w-16 bg-slate-50 rounded skeleton-shimmer" style={{ animationDelay: `${220 + i * 50}ms` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100">
              <div className="h-5 w-40 bg-slate-100 rounded mb-4 skeleton-shimmer" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-full bg-slate-50 rounded-lg skeleton-shimmer" style={{ animationDelay: `${300 + i * 40}ms` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MarketPageLoader;
