import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    destinations: [
      { label: "Muscat", href: "#" },
      { label: "Salalah", href: "#" },
      { label: "Nizwa", href: "#" },
      { label: "Sur", href: "#" },
      { label: "Wahiba Sands", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Partners", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Safety Info", href: "#" },
      { label: "Cancellation Policy", href: "#" },
      { label: "Report Issue", href: "#" },
    ],
    legal: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-bold text-gradient-gold">
                GoOman
              </span>
            </a>
            <p className="text-cream/70 mb-6 max-w-sm">
              Your gateway to authentic Omani experiences. Discover the Sultanate's
              hidden treasures with trusted local guides.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+968-1234-5678" className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                +968 1234 5678
              </a>
              <a href="mailto:hello@gooman.com" className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                hello@gooman.com
              </a>
              <div className="flex items-start gap-3 text-cream/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                Muscat, Sultanate of Oman
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream/60">
              © {new Date().getFullYear()} GoOman. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-cream/10 hover:bg-gold/20 text-cream/70 hover:text-gold transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-sm text-cream/60">
              <button className="hover:text-gold transition-colors">English</button>
              <span>|</span>
              <button className="hover:text-gold transition-colors">العربية</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
