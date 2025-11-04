import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">
            Careers Builder
          </div>
          <Link href="/login">
            <Button variant="ghost">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <span>✨</span>
              <span>Build Stunning Career Pages</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Create Beautiful
              <br />
              Careers Pages
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empower your team to build stunning, customizable career pages that attract top talent.
              No design skills required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/login">
                <Button size="lg">
                  Get Started →
                </Button>
              </Link>
              <Button variant="ghost" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Custom Themes',
                description: 'Fully customizable colors, logos, and branding to match your company identity.',
              },
              {
                icon: '📄',
                title: 'Flexible Sections',
                description: 'Add, remove, and reorder content sections to create the perfect page layout.',
              },
              {
                icon: '👁️',
                title: 'Live Preview',
                description: 'See your changes in real-time before publishing to your audience.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-muted-foreground">
            <p>© 2024 Careers Builder. Built with ❤️ for recruiters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
