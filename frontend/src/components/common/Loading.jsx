const Loading = ({ type = 'spinner', rows = 5 }) => {
  if (type === 'spinner') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (type === 'skeleton-table') {
    return (
      <div className="space-y-3 p-4">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="skeleton h-4 w-1/4" />
            <div className="skeleton h-4 w-1/6" />
            <div className="skeleton h-4 w-1/6" />
            <div className="skeleton h-4 w-1/6" />
            <div className="skeleton h-4 w-1/12" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'skeleton-card') {
    return (
      <div className="card space-y-4">
        <div className="skeleton h-6 w-1/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    );
  }

  if (type === 'page') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Loading;
