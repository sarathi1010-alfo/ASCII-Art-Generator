export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground">
          Last updated: {currentDate}
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>1. Client-Side Processing</h2>
        <p>
          ASCII Gen is designed as a fully client-side application. When you use our Text-to-ASCII or Image-to-ASCII tools, all processing happens locally within your web browser. We do not upload, store, or analyze your text inputs or images on any server.
        </p>

        <h2>2. Data Collection</h2>
        <p>
          We do not require user accounts, and we do not collect personal information. We may use standard, anonymized analytics to understand general website traffic and usage patterns, which helps us improve the platform.
        </p>

        <h2>3. Local Storage</h2>
        <p>
          We may use your browser&apos;s local storage (such as `localStorage`) to remember your preferences, like your selected theme (dark or light mode) or recently used fonts. This data remains on your device.
        </p>

        <h2>4. Third-Party Links</h2>
        <p>
          Our website may contain links to external sites (such as GitHub repositories or informative articles). We are not responsible for the privacy practices of these external sites.
        </p>

        <h2>5. Changes to this Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be reflected on this page.
        </p>
      </div>
    </div>
  );
}
