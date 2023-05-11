import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return <Loader2 className="h-12 w-12 animate-spin text-slate-300" />;
};

const LoadingPage = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export { LoadingPage, LoadingSpinner };
