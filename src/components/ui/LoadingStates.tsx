export function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 w-24 bg-slate-800 rounded" />
        <div className="h-8 w-8 bg-slate-800 rounded-xl" />
      </div>
      <div className="h-8 w-20 bg-slate-800 rounded mb-2" />
      <div className="h-2.5 w-28 bg-slate-800 rounded" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 animate-pulse flex items-center gap-4">
      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full shrink-0" />
      <div className="h-6 w-24 bg-slate-800 rounded shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 bg-slate-800 rounded" />
        <div className="h-3 w-20 bg-slate-800 rounded" />
      </div>
      <div className="h-5 w-16 bg-slate-800 rounded-full shrink-0" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 overflow-hidden animate-pulse">
      <div className="px-5 py-4 border-b border-slate-800/80">
        <div className="h-4 w-32 bg-slate-800 rounded mb-2" />
        <div className="h-3 w-24 bg-slate-800 rounded" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-800/40">
            <div className="h-5 w-24 bg-slate-800 rounded" />
            <div className="h-4 w-16 bg-slate-800 rounded" />
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-5 w-16 bg-slate-800 rounded-full" />
            <div className="h-3 w-12 bg-slate-800 rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
      </div>
      <p className="text-sm text-slate-400">Loading...</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-300 mb-1">Something went wrong</p>
      <p className="text-xs text-slate-500 mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
