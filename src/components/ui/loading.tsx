import { Loader2 } from "lucide-react";

export function LoaderSection() {
  return (
    <section
      id="search-results"
      className="py-16 brand-light-bg animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    </section>
  );
}
