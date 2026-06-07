import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          Have a question, feedback, or feature request? We&apos;d love to hear from you.
        </p>
      </div>

      <form className="space-y-6" action="https://formspree.io/f/placeholder" method="POST">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
          <Input id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
          <Textarea id="message" name="message" placeholder="How can we help you?" className="min-h-[150px]" required />
        </div>
        <Button type="submit" size="lg">Send Message</Button>
      </form>
    </div>
  );
}
