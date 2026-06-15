import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, Type, Image as ImageIcon, Briefcase, QrCode, FileText, Palette, Box } from "lucide-react";

const ECOSYSTEM_TOOLS = [
  {
    category: "Design & Media",
    tools: [
      { name: "Image to ASCII", url: "/image-to-ascii", desc: "Convert images to text art.", icon: <ImageIcon className="h-5 w-5" /> },
      { name: "Text to ASCII", url: "/text-to-ascii", desc: "Generate text banners.", icon: <Type className="h-5 w-5" /> },
      { name: "Palette Flow", url: "https://paletteflow.alfo.online", desc: "Color palette generator.", icon: <Palette className="h-5 w-5" /> },
      { name: "Brand Forge", url: "https://brandforge.alfo.online", desc: "Brand kit creator.", icon: <Box className="h-5 w-5" /> },
    ]
  },
  {
    category: "Documents & Professional",
    tools: [
      { name: "Resume Forge", url: "https://resumeforge.alfo.online", desc: "ATS-friendly resume builder.", icon: <Briefcase className="h-5 w-5" /> },
      { name: "PDF Utility", url: "https://pdfutility.app", desc: "Compress and merge PDFs.", icon: <FileText className="h-5 w-5" /> },
    ]
  },
  {
    category: "Utilities",
    tools: [
      { name: "QR Generator", url: "https://qrgenerator.alfo.online", desc: "Create custom QR codes.", icon: <QrCode className="h-5 w-5" /> },
      { name: "Pack Fit", url: "https://packfit.alfo.online", desc: "Luggage packing calculator.", icon: <Briefcase className="h-5 w-5" /> },
    ]
  }
];

import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "All Free Tools | alfo.online Ecosystem Hub",
  description: "A directory of free, client-side browser utilities for design, productivity, and document management.",
  slug: "/tools",
}));

export default function ToolsHubPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Free Tools</h1>
        <p className="text-xl text-muted-foreground">
          Explore the complete <a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">alfo.online</a> ecosystem. Fast, secure, and purely client-side browser utilities.
        </p>
      </div>

      <div className="space-y-12">
        {ECOSYSTEM_TOOLS.map((group) => (
          <section key={group.category}>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{group.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.tools.map((tool) => {
                const isInternal = tool.url.startsWith("/");
                const CardWrapper = isInternal ? Link : 'a';

                return (
                  <CardWrapper
                    key={tool.name}
                    href={tool.url}
                    {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
                    className="block group h-full"
                  >
                    <Card className="p-5 h-full transition-all hover:border-primary hover:shadow-md flex flex-col items-start">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {tool.desc}
                      </p>
                      <div className="flex items-center text-xs font-medium text-primary opacity-80 group-hover:opacity-100">
                        Open Tool <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </Card>
                  </CardWrapper>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
