import { AlertTriangle, Info, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerProps {
  type: 'warning' | 'info' | 'error';
  message: string;
  show: boolean;
}

const Banner = ({ type, message, show }: BannerProps) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'error':
        return <User className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getBannerStyles = () => {
    switch (type) {
      case 'warning':
        return "bg-amber-50 text-amber-800 border-amber-200";
      case 'info':
        return "bg-blue-50 text-blue-800 border-blue-200";
      case 'error':
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  if (!show) return null;

  return (
    <div 
      className={cn(
        "border rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm animate-fade-in transition-all duration-200",
        getBannerStyles()
      )}
    >
      {getIcon()}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Banner;