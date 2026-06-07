import { Sparkles } from "lucide-react";

const RECENT_TOOLS = [
  { name: "ASCII Gen", url: "/" },
  { name: "Brand Forge", url: "https://brandforge.alfo.online" },
  { name: "Font Fusion", url: "https://fontfusion.alfo.online" },
  { name: "Pack Fit", url: "https://packfit.alfo.online" },
];

export function RecentTools() {
  return (
    <div className="w-full bg-primary/5 border-y border-primary/10 py-3 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-sm">
        <span className="font-bold flex items-center gap-1.5 text-primary">
          <Sparkles className="h-4 w-4" /> Just Launched
        </span>
        <div className="flex flex-wrap items-center gap-4">
          {RECENT_TOOLS.map((tool, idx) => (
            <div key={tool.name} className="flex items-center gap-4">
              <a
                href={tool.url}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                {...(tool.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {tool.name}
              </a>
              {idx < RECENT_TOOLS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30 hidden sm:block"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
