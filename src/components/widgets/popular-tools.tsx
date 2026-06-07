import Link from "next/link";
import { Flame } from "lucide-react";

const POPULAR_TOOLS = [
  { name: "Image to ASCII", url: "/image-to-ascii" },
  { name: "Text to ASCII", url: "/text-to-ascii" },
  { name: "Resume Forge", url: "https://resumeforge.alfo.online" },
  { name: "QR Generator", url: "https://qrgenerator.alfo.online" },
  { name: "PDF Utility", url: "https://pdfutility.app" },
  { name: "Palette Flow", url: "https://paletteflow.alfo.online" },
];

export function PopularTools() {
  return (
    <div className="bg-muted/30 border rounded-xl p-5">
      <h3 className="font-bold flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-orange-500" />
        Most Used This Month
      </h3>
      <ul className="space-y-3">
        {POPULAR_TOOLS.map((tool, idx) => (
          <li key={tool.name} className="flex items-center gap-3">
            <span className="text-muted-foreground font-mono text-sm">{idx + 1}.</span>
            {tool.url.startsWith("/") ? (
              <Link href={tool.url} className="text-sm font-medium hover:text-primary transition-colors">
                {tool.name}
              </Link>
            ) : (
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                {tool.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
