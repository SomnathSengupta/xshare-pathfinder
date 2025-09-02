import { Link } from "react-router-dom";
import { 
  BookOpen, 
  MessageCircle, 
  Trophy, 
  Gift, 
  FileText,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Experience Library", href: "/experiences", icon: BookOpen },
        { label: "Q&A Forum", href: "/qna", icon: MessageCircle },
        { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
        { label: "Rewards Store", href: "/rewards", icon: Gift },
        { label: "Resources", href: "/resources", icon: FileText },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-white">X</span>
              </div>
              <span className="text-xl font-bold text-gradient-primary">XShare</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students with shared career experiences. Learn from others' journeys and share your own to help the community grow together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center space-x-2"
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="border-t border-card-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm">contact@xshare.edu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p className="text-sm">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card-border pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} XShare. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
            <span className="text-xs px-2 py-1 rounded-full bg-muted">
              Made with ❤️ for Students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;