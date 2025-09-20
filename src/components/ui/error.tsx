import { AlertTriangle } from "lucide-react";
export function ErrorSection({ error }: { error: string }) {
  return (
    <section
      id="search-results"
      className="py-16 brand-light-bg animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center gap-4">
          <AlertTriangle className="h-10 w-10 text-red-600" />
          <p className="text-red-600 font-semibold">
            Error loading properties: {error}
          </p>
        </div>
      </div>
    </section>
  );
}
