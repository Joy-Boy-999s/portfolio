import { cn } from "@/lib/utils";

interface GlassBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function GlassBox({ children, className, ...props }: GlassBoxProps) {
  return (
    <div className={cn("glassbox rounded-2xl", className)} {...props}>
      {children}
    </div>
  );
}
