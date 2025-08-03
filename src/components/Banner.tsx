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
        return <AlertTriangle className="h-6 w-6" />;
      case 'info':
        return <Info className="h-6 w-6" />;
      case 'error':
        return <User className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getBannerStyles = () => {
    switch (type) {
      case 'warning':
        return "bg-amber-100 text-amber-900 border-amber-300 shadow-lg";
      case 'info':
        return "bg-blue-100 text-blue-900 border-blue-300 shadow-lg";
      case 'error':
        return "bg-red-100 text-red-900 border-red-300 shadow-lg";
      default:
        return "bg-blue-100 text-blue-900 border-blue-300 shadow-lg";
    }
  };

  if (!show) return null;

  return (
    <div 
      className={cn(
        "border-2 rounded-xl px-6 py-4 flex items-center gap-4 animate-fade-in transition-all duration-200 font-semibold text-lg",
        getBannerStyles()
      )}
    >
      {getIcon()}
      <span className="font-bold">{message}</span>
    </div>
  );
};

export default Banner;