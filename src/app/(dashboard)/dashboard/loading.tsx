export default function Loading() {
  return (
    <div className="space-y-12" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-3">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-11 w-72 max-w-full" />
        <div className="skeleton h-4 w-96 max-w-full" />
      </div>
      <div className="skeleton h-64 !rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-5 w-44" />
        <div className="skeleton h-40 !rounded-2xl" />
      </div>
    </div>
  );
}
