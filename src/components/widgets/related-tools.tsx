import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const RELATED_TOOLS = [
  {
    name: "QR Generator",
    description: "Create custom, trackable QR codes for links, text, and documents.",
    url: "https://qrgenerator.alfo.online",
  },
  {
    name: "Resume Forge",
    description: "Build ATS-friendly, professional resumes in minutes.",
    url: "https://resumeforge.alfo.online",
  },
  {
    name: "Palette Flow",
    description: "Generate and discover beautiful color palettes for your next project.",
    url: "https://paletteflow.alfo.online",
  },
  {
    name: "PDF Utility",
    description: "Compress, split, and merge PDF files quickly and securely.",
    url: "https://pdfutility.app",
  },
];

export function RelatedTools() {
  return (
    <section className="w-full py-12 mt-12 border-t">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-center md:text-left">
          You might also need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RELATED_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="p-5 h-full transition-all hover:border-primary hover:shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-primary opacity-80 group-hover:opacity-100">
                  Try it out <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
