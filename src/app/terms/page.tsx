export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-xl text-muted-foreground">
          Last updated: October 2023
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using ASCII Gen, you accept and agree to be bound by the terms and provisions of this agreement.
        </p>

        <h2>2. Use of the Service</h2>
        <p>
          ASCII Gen provides tools to generate ASCII art from text and images. You are free to use the generated output for both personal and commercial purposes. However, you may not use the service to generate illegal, offensive, or harmful content.
        </p>

        <h2>3. Disclaimer of Warranties</h2>
        <p>
          The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the service.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall ASCII Gen or its developers be liable for any damages arising out of the use or inability to use the materials on the website.
        </p>

        <h2>5. Modifications</h2>
        <p>
          We reserve the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.
        </p>
      </div>
    </div>
  );
}
