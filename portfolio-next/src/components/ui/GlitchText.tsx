import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function GlitchText({ text, className, as: Component = "h1" }: GlitchTextProps) {
  return (
    <Component className={cn("glitch-text font-outfit uppercase font-bold text-4xl text-white md:text-5xl", className)}>
      <span aria-hidden="true">{text}</span>
      {text}
      <span aria-hidden="true">{text}</span>
    </Component>
  );
}
