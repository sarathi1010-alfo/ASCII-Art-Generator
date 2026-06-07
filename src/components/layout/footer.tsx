import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold font-mono tracking-tight text-primary text-xl">
            ASCII<span className="text-foreground">Gen</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Built for ASCII enthusiasts. The fastest client-side generator. Part of the alfo.online ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Tools Hub</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://qrgenerator.alfo.online" className="hover:text-foreground transition-colors">QR Generator</a></li>
            <li><a href="https://resumeforge.alfo.online" className="hover:text-foreground transition-colors">Resume Forge</a></li>
            <li><a href="https://paletteflow.alfo.online" className="hover:text-foreground transition-colors">Palette Flow</a></li>
            <li><a href="https://pdfutility.app" className="hover:text-foreground transition-colors">PDF Utility</a></li>
            <li><a href="https://hub.alfo.online" className="hover:text-foreground transition-colors font-medium">All Tools &rarr;</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Legal & Info</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Social</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://twitter.com/alfo_online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter / X</a></li>
            <li><a href="https://github.com/alfo-online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} alfo.online — All rights reserved</p>
      </div>
    </footer>
  );
}
