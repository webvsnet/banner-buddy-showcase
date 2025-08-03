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
        return "bg-warning text-warning-foreground border-warning/20";
      case 'info':
        return "bg-info text-info-foreground border-info/20";
      case 'error':
        return "bg-destructive text-destructive-foreground border-destructive/20";
      default:
        return "bg-info text-info-foreground border-info/20";
    }
  };

  if (!show) return null;

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 flex items-center gap-3 shadow-soft animate-slide-in transition-all duration-300",
        getBannerStyles()
      )}
    >
      {getIcon()}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Banner;