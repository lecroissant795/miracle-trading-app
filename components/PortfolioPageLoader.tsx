import React from 'react';
import Logo from './Logo';

/**
 * Seamless skeleton loader that mirrors the Portfolio page layout.
 * Shown briefly when the user navigates to the portfolio page, then fades into real content.
 */
const PortfolioPageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fade-in">
      {/* Nav skeleton - matches PortfolioPage nav */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo showText={true} iconSize={32} />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-16 bg-slate-100 rounded skeleton-shimmer" style={{ animationDelay: `${i * 40}ms` }} />
            ))}
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded-full skeleton-shimmer" style={{ animationDelay: '120ms' }} />
        </div>
      </nav>

      {/* Main content - matches PortfolioView structure */}
      <div className="flex-1 pt-20 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="h-8 w-40 bg-slate-200 rounded-lg skeleton-shimmer mb-2" />
              <div className="h-4 w-72 bg-slate-100 rounded skeleton-shimmer" style={{ animationDelay: '60ms' }} />
            </div>
          </header>

          {/* Top row: Investment card + My Pies */}
          <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 rounded bg-slate-100 skeleton-shimmer" />
                <div className="h-4 w-44 bg-slate-100 rounded skeleton-shimmer" style={{ animationDelay: '80ms' }} />
              </div>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-full bg-slate-100 skeleton-shimmer shrink-0" style={{ animationDelay: '100ms' }} />
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <div className="h-3 w-24 bg-slate-100 rounded mb-2 skeleton-shimmer" style={{ animationDelay: '120ms' }} />
                    <div className="h-10 w-36 bg-slate-200 rounded skeleton-shimmer" style={{ animationDelay: '140ms' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-blue-50 rounded-2xl skeleton-shimmer" style={{ animationDelay: '160ms' }} />
                    <div className="h-20 bg-emerald-50 rounded-2xl skeleton-shimmer" style={{ animationDelay: '180ms' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <div className="h-5 w-24 bg-slate-100 rounded mb-4 skeleton-shimmer" />
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 skeleton-shimmer mb-4" style={{ animationDelay: '100ms' }} />
                <div className="h-4 w-32 bg-slate-100 rounded mb-2 skeleton-shimmer" style={{ animationDelay: '120ms' }} />
                <div className="h-3 w-48 bg-slate-50 rounded mb-6 skeleton-shimmer" style={{ animationDelay: '140ms' }} />
                <div className="h-10 w-full max-w-[200px] bg-slate-200 rounded-xl skeleton-shimmer" style={{ animationDelay: '160ms' }} />
              </div>
            </div>
          </section>

          {/* Analytics row - 3 cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="h-3 w-20 bg-slate-100 rounded mb-2 skeleton-shimmer" style={{ animationDelay: `${180 + i * 40}ms` }} />
                <div className="h-8 w-24 bg-slate-200 rounded mb-1 skeleton-shimmer" style={{ animationDelay: `${200 + i * 40}ms` }} />
                <div className="h-3 w-40 bg-slate-50 rounded skeleton-shimmer" style={{ animationDelay: `${220 + i * 40}ms` }} />
              </div>
            ))}
          </section>

          {/* Performance chart + risk */}
          <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1.2fr] gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="h-5 w-48 bg-slate-100 rounded mb-2 skeleton-shimmer" />
              <div className="h-4 w-56 bg-slate-50 rounded mb-6 skeleton-shimmer" style={{ animationDelay: '80ms' }} />
              <div className="h-56 w-full bg-slate-50 rounded-xl skeleton-shimmer" style={{ animationDelay: '120ms' }} />
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="h-5 w-36 bg-slate-100 rounded mb-4 skeleton-shimmer" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-full bg-slate-50 rounded-lg skeleton-shimmer" style={{ animationDelay: `${240 + i * 30}ms` }} />
                ))}
              </div>
            </div>
          </section>

          {/* All holdings table header */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="h-6 w-28 bg-slate-100 rounded mb-2 skeleton-shimmer" />
            <div className="h-4 w-64 bg-slate-50 rounded mb-6 skeleton-shimmer" style={{ animationDelay: '60ms' }} />
            <div className="flex gap-4 border-b border-slate-100 pb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-16 bg-slate-50 rounded skeleton-shimmer" style={{ animationDelay: `${280 + i * 20}ms` }} />
              ))}
            </div>
            <div className="space-y-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-full bg-slate-50 rounded-lg skeleton-shimmer" style={{ animationDelay: `${350 + i * 40}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPageLoader;
