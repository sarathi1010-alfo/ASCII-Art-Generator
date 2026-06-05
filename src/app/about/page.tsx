import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About ASCII Gen</h1>
        <p className="text-xl text-muted-foreground">
          The fastest, client-side browser platform for generating stunning ASCII art from text and images.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Our Mission</h2>
        <p>
          ASCII Gen was created to bring the nostalgic art of ASCII into the modern web.
          Whether you need a quick text banner for a Readme file, a stylish piece of terminal art for your gaming profile, or a customized image conversion, our goal is to provide the best tools directly in your browser without the need for server-side processing or sign-ups.
        </p>

        <h2>Features</h2>
        <ul>
          <li><strong>Text to ASCII:</strong> Convert your text instantly using high-quality Figlet fonts.</li>
          <li><strong>Image to ASCII:</strong> Drag and drop any image to transform it into highly customizable text art.</li>
          <li><strong>Gallery:</strong> Browse and copy our collection of popular, pre-made ASCII art templates.</li>
          <li><strong>100% Client-Side:</strong> All rendering happens in your browser, ensuring maximum privacy and blazing-fast performance.</li>
        </ul>

        <h2>Privacy</h2>
        <p>
          Because ASCII Gen processes everything on your device, your images and text never leave your browser. We do not store, process, or analyze your inputs on any server.
        </p>

        <h2>Open Web</h2>
        <p>
          We believe in the open web. This tool is built to be fast, accessible, and respectful of your time.
          Check out our <Link href="/blog">blog</Link> to learn more about the history and techniques behind ASCII art.
        </p>
      </div>
    </div>
  );
}
