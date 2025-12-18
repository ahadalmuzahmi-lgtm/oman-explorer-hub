import { Shield, Sparkles, Users, Globe, CreditCard, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments and personal data are protected with bank-level encryption",
  },
  {
    icon: Sparkles,
    title: "Curated Experiences",
    description: "Every listing is verified for quality and authenticity by our local team",
  },
  {
    icon: Users,
    title: "Local Guides",
    description: "Connect with passionate locals who share their insider knowledge",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Browse and book in English or Arabic with full localization",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Pay securely online with multiple payment options available",
  },
  {
    icon: HeartHandshake,
    title: "Community Impact",
    description: "Your booking directly supports local businesses and communities",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-3">
            Why GoOman
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Travel with Confidence
          </h2>
          <p className="text-lg text-muted-foreground">
            We're committed to making your Oman adventure seamless, safe, and unforgettable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-gold/50 hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
