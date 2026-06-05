import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built for ASCII enthusiasts. The fastest client-side generator.
        </p>
        <div className="flex gap-4 items-center">
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
