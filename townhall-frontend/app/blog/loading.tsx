export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-swiss-white animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6">
              <div className="w-12 h-1 bg-swiss-light mb-6" />
              <div className="h-16 bg-swiss-light w-32 mb-6" />
            </div>
            <div className="lg:col-span-6 flex items-end">
              <div className="h-6 bg-swiss-light w-full max-w-md" />
            </div>
          </div>
        </div>
        
        {/* Featured Article skeleton */}
        <div className="max-w-swiss mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-0 bg-swiss-light overflow-hidden h-[400px]">
            <div className="lg:col-span-5 bg-neutral-200" />
            <div className="lg:col-span-7 p-12">
              <div className="w-12 h-1 bg-neutral-300 mb-6" />
              <div className="h-4 bg-neutral-300 w-32 mb-4" />
              <div className="h-10 bg-neutral-300 w-3/4 mb-4" />
              <div className="h-4 bg-neutral-300 w-full mb-2" />
              <div className="h-4 bg-neutral-300 w-2/3 mb-6" />
              <div className="flex gap-6">
                <div className="h-4 bg-neutral-300 w-24" />
                <div className="h-4 bg-neutral-300 w-24" />
                <div className="h-4 bg-neutral-300 w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="border-y border-swiss-border">
        <div className="max-w-swiss mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-swiss-white p-6 lg:p-8 text-center">
                <div className="h-10 bg-swiss-light w-16 mx-auto mb-2" />
                <div className="h-4 bg-swiss-light w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog grid skeleton */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="w-12 h-1 bg-swiss-light mb-6" />
              <div className="h-8 bg-swiss-light w-40" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-swiss-white border border-swiss-border">
                <div className="aspect-video bg-swiss-light" />
                <div className="p-6">
                  <div className="h-4 bg-swiss-light w-16 mb-4" />
                  <div className="h-6 bg-swiss-light w-3/4 mb-3" />
                  <div className="h-4 bg-swiss-light w-full mb-2" />
                  <div className="h-4 bg-swiss-light w-2/3 mb-6" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-swiss-light w-24" />
                    <div className="h-4 bg-swiss-light w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
