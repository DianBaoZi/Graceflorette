import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen">
      <section className="pt-8 pb-20 sm:pt-12 sm:pb-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-xs text-warm-gray-light mb-8">
              <Link href="/" className="hover:text-dark transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-dark">{title}</span>
            </nav>

            <h1 className="font-heading text-3xl sm:text-4xl text-dark mb-3">
              {title}
            </h1>
            <p className="text-xs text-warm-gray-light mb-10">
              Last updated: {lastUpdated}
            </p>

            <div className="prose-florette space-y-6 text-warm-gray text-[15px] leading-relaxed [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-dark [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-dark [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-primary-dark [&_a]:underline [&_a]:hover:text-dark [&_strong]:text-dark [&_strong]:font-medium">
              {children}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
