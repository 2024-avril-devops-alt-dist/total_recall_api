import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Loader = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <Loader2
      size={size}
      className={cn("mr-2 h-4 w-4 animate-spin", className)}
    />
  );
};
