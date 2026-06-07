const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'tools-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const toolsData = JSON.parse(rawData);

const baseDir = path.join(__dirname, '../src/app');

toolsData.forEach((toolData) => {
  const toolSlug = toolData.tool;
  const useCases = toolData.useCases || [];
  const keywords = toolData.keywords || [];
  const competitors = toolData.competitors || [];
  const templates = toolData.templates || [];

  const toolName = toolSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Generate Use Case Pages
  useCases.forEach((useCase, index) => {
    const pageDir = path.join(baseDir, toolSlug, useCase);

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const keyword = keywords[index % keywords.length] || useCase.replace(/-/g, ' ');
    const title = `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} | ASCII Art Generator`;

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
    console.log(`Generated Use Case page: ${pagePath}`);
  });

  // Generate Comparison Pages
  competitors.forEach((competitor) => {
    const pageDir = path.join(baseDir, toolSlug, 'vs', competitor);

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const compName = competitor.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = `${toolName} vs ${compName} | Best Free Alternative`;

    const pageContent = `import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "${title}",
  description: "Comparing ${toolName} with ${compName}. Find out why our free, client-side browser utility is the better choice.",
};

export default function ComparisonPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          ${toolName} vs ${compName}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Looking for a better alternative to ${compName}? See why our completely free, client-side tool is the right choice.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Try ${toolName} Now</h2>
        <p className="mb-6 text-muted-foreground">
          No signups. No server processing. Just instant results.
        </p>
        <Link href="/${toolSlug}">
          <Button size="lg" className="font-bold">
            Open ${toolName} Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Why Choose ${toolName}?</h2>
        <p>
          When comparing <strong>${toolName}</strong> to <strong>${compName}</strong>, the most important factor is privacy and speed.
        </p>
        <ul>
          <li><strong>Client-Side Processing:</strong> We don&apos;t send your data to a server. Everything happens in your browser.</li>
          <li><strong>100% Free:</strong> No paywalls or hidden fees.</li>
          <li><strong>Instant Results:</strong> Because there&apos;s no server upload, generation is immediate.</li>
        </ul>
      </div>
    </div>
  );
}
`;
    const pagePath = path.join(pageDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Generated Comparison page: ${pagePath}`);
  });

  // Generate Template Pages
  templates.forEach((template) => {
    const pageDir = path.join(baseDir, toolSlug, 'templates', template);

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const tempName = template.charAt(0).toUpperCase() + template.slice(1);
    const title = `Free ${tempName} Templates | ${toolName}`;

    const pageContent = `import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "${title}",
  description: "Browse our collection of free ${tempName} templates and use our ${toolName} to customize them instantly.",
};

export default function TemplatePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          ${tempName} Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with one of our free ${tempName} templates and customize it using the ${toolName}.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Customizing</h2>
        <p className="mb-6 text-muted-foreground">
          Bring your ideas to life. Open the tool to get started.
        </p>
        <Link href="/${toolSlug}">
          <Button size="lg" className="font-bold">
            Open ${toolName} Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>About These Templates</h2>
        <p>
          Our ${tempName} templates are designed to give you a head start. Combine them with the raw power of our client-side generator to produce stunning results in seconds.
        </p>
      </div>
    </div>
  );
}
`;
    const pagePath = path.join(pageDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Generated Template page: ${pagePath}`);
  });
});

console.log('Programmatic SEO page generation complete.');
