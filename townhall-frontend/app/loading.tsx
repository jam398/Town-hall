export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero Skeleton */}
      <section className="bg-swiss-white relative overflow-hidden">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 min-h-[90vh]">
            <div className="lg:col-span-7 flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              <div className="w-16 h-1 bg-swiss-border mb-8 animate-pulse" />
              <div className="h-6 w-48 bg-swiss-border mb-6 animate-pulse" />
              <div className="space-y-4 mb-8">
                <div className="h-16 w-full max-w-md bg-swiss-border animate-pulse" />
                <div className="h-16 w-3/4 max-w-md bg-swiss-border animate-pulse" />
              </div>
              <div className="h-6 w-full max-w-lg bg-swiss-border mb-12 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-14 w-40 bg-swiss-border animate-pulse" />
                <div className="h-14 w-32 bg-swiss-border animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-5 bg-swiss-light hidden lg:block animate-pulse" />
          </div>
        </div>
        
        {/* Stats Skeleton */}
        <div className="border-y border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-swiss-white p-6 lg:p-8 text-center">
                  <div className="h-10 w-20 mx-auto bg-swiss-border mb-2 animate-pulse" />
                  <div className="h-4 w-24 mx-auto bg-swiss-border animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section Skeleton */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-border mb-6 animate-pulse" />
              <div className="h-12 w-48 bg-swiss-border animate-pulse" />
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4 mb-12">
                <div className="h-8 w-full bg-swiss-border animate-pulse" />
                <div className="h-8 w-5/6 bg-swiss-border animate-pulse" />
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-swiss-border animate-pulse flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-5 w-24 bg-swiss-border mb-2 animate-pulse" />
                      <div className="h-4 w-full bg-swiss-border animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section Skeleton */}
      <section className="py-24 lg:py-32 bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-12 h-1 bg-swiss-border mb-6 animate-pulse" />
            <div className="h-12 w-64 bg-swiss-border animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-swiss-border p-6">
                <div className="h-4 w-24 bg-swiss-border mb-4 animate-pulse" />
                <div className="h-6 w-full bg-swiss-border mb-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-swiss-border mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-swiss-border animate-pulse" />
                  <div className="h-4 w-40 bg-swiss-border animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
