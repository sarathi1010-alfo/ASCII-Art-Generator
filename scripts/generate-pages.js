const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'tools-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const toolsData = JSON.parse(rawData);

const baseDir = path.join(__dirname, '../src/app');

toolsData.forEach((toolData) => {
  const toolSlug = toolData.tool;
  const useCases = toolData.useCases;
  const keywords = toolData.keywords;

  useCases.forEach((useCase, index) => {
    const pageDir = path.join(baseDir, toolSlug, useCase);

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const keyword = keywords[index % keywords.length] || useCase.replace(/-/g, ' ');
    const title = `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} | ASCII Art Generator`;

    // Convert toolSlug back to a readable name for internal linking
    const toolName = toolSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const pageContent = `import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "${title}",
  description: "Create amazing ${keyword} using our free online ${toolName} generator. Fast, secure, and runs entirely in your browser.",
};

export default function UseCasePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          ${keyword} Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create amazing <strong>${keyword}</strong> using our free online tool. It&apos;s fast, secure, and completely client-side.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to create your ${keyword}?</h2>
        <p className="mb-6 text-muted-foreground">
          Use our powerful ${toolName} tool to generate your art in seconds.
        </p>
        <Link href="/${toolSlug}">
          <Button size="lg" className="font-bold">
            Open ${toolName} Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to make a ${keyword}</h2>
        <p>
          Making a ${keyword} has never been easier. With our <strong><Link href="/${toolSlug}">${toolName}</Link></strong>,
          you can transform your ideas into stunning ASCII art instantly.
        </p>
        <p>
          Unlike other tools, our generator runs entirely in your browser. This means your data is secure, and you don&apos;t have to wait for server uploads.
          Whether you need it for a professional project or just for fun, we&apos;ve got you covered.
        </p>

        <h2>Frequently Asked Questions</h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold">Is this ${keyword} generator free?</h3>
            <p>Yes, all of our tools on ASCII Gen are 100% free to use.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Do you store my data?</h3>
            <p>No, everything is processed locally in your web browser. Check our <Link href="/privacy-policy">Privacy Policy</Link> for more details.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Where can I find more tools?</h3>
            <p>We are part of the <a href="https://hub.alfo.online" target="_blank" rel="noopener noreferrer">alfo.online ecosystem</a>. Check out the hub for more free web utilities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

    const pagePath = path.join(pageDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Generated page: ${pagePath}`);
  });
});

console.log('Programmatic SEO page generation complete.');
