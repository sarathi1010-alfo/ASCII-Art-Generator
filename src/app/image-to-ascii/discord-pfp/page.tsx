import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Discord ascii pfp | ASCII Art Generator",
  description: "Create amazing discord ascii pfp using our free online Image To Ascii generator. Fast, secure, and runs entirely in your browser.",
};

export default function UseCasePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          discord ascii pfp Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create amazing <strong>discord ascii pfp</strong> using our free online tool. It&apos;s fast, secure, and completely client-side.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to create your discord ascii pfp?</h2>
        <p className="mb-6 text-muted-foreground">
          Use our powerful Image To Ascii tool to generate your art in seconds.
        </p>
        <Link href="/image-to-ascii">
          <Button size="lg" className="font-bold">
            Open Image To Ascii Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to make a discord ascii pfp</h2>
        <p>
          Making a discord ascii pfp has never been easier. With our <strong><Link href="/image-to-ascii">Image To Ascii</Link></strong>,
          you can transform your ideas into stunning ASCII art instantly.
        </p>
        <p>
          Unlike other tools, our generator runs entirely in your browser. This means your data is secure, and you don&apos;t have to wait for server uploads.
          Whether you need it for a professional project or just for fun, we&apos;ve got you covered.
        </p>

        <h2>Frequently Asked Questions</h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold">Is this discord ascii pfp generator free?</h3>
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
