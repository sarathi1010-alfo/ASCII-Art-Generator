import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold font-mono tracking-tight text-primary text-xl">
            ASCII<span className="text-foreground">Forge</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Built for ASCII enthusiasts. The fastest client-side generator. Part of the alfo.online ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Tools Hub</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://qr.alfo.online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">QR Generator</a></li>
            <li><a href="https://resumeforge.alfo.online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Resume Forge</a></li>
            <li><a href="https://paletteflow.alfo.online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Palette Flow</a></li>
            <li><Link href="/tools" className="hover:text-foreground transition-colors font-medium inline-flex items-center min-h-[44px]">All Tools &rarr;</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Legal & Info</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Contact</Link></li>
            <li><Link href="/about" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">About Us</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Social</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">Alfo Online</a></li>
            <li><a href="https://github.com/sarathi1010-alfo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center min-h-[44px]">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} alfo.online — All rights reserved</p>
      </div>
    </footer>
  );
}
