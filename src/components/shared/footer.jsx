import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "./Logo";

export function Footer() {
  const footerSections = [
    {
      title: "الخدمات",
      links: [
        { href: "/therapy", label: "العلاج الفردي" },
        { href: "/couples", label: "استشارات الأزواج" },
        { href: "/family", label: "العلاج الأسري" },
        { href: "/group", label: "الجلسات الجماعية" },
      ],
    },
    {
      title: "الموارد",
      links: [
        { href: "/blogs", label: "المدونة" },
        { href: "/faq", label: "الأسئلة الشائعة" },
        { href: "/resources", label: "موارد الصحة النفسية" },
        { href: "/crisis", label: "دعم الأزمات" },
      ],
    },
    {
      title: "الشركة",
      links: [
        { href: "/about", label: "من نحن" },
        { href: "/therapists", label: "معالجونا" },
        { href: "/careers", label: "الوظائف" },
        { href: "/contact", label: "تواصل معنا" },
      ],
    },
    {
      title: "قانوني",
      links: [
        { href: "/privacy", label: "سياسة الخصوصية" },
        { href: "/terms", label: "شروط الخدمة" },
        { href: "/hipaa", label: "امتثال HIPAA" },
        { href: "/cookies", label: "سياسة ملفات تعريف الارتباط" },
      ],
    },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "فيسبوك" },
    { href: "#", icon: Twitter, label: "تويتر" },
    { href: "#", icon: Instagram, label: "إنستغرام" },
    { href: "#", icon: Linkedin, label: "لينكد إن" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t border-border dark:bg-background dark:text-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-10 w-auto" />
              <span className="text-2xl font-bold text-foreground">ملاذ</span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed dark:text-foreground/80">
              رعاية صحة نفسية مهنية ومتاحة وحساسة ثقافياً للمجتمع المصري. رحلة
              صحتك النفسية تبدأ هنا.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 ">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="dark:text-foreground">٠٢ ١٢٣٤ ٥٦٧٨</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="dark:text-foreground">info@mlaz.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="dark:text-foreground">
                  ١٢٣ ميدان التحرير، القاهرة، مصر
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-secondary-foreground dark:text-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors dark:text-foreground/80 dark:hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-border bg-background dark:bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                ابق محدثاً
              </h3>
              <p className="text-muted-foreground dark:text-foreground/80">
                احصل على نصائح الصحة النفسية والتحديثات في بريدك الإلكتروني
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground min-w-[250px] dark:bg-background dark:text-foreground"
              />
              <Button variant="default">اشترك</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card dark:bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm dark:text-foreground/80">
              © {new Date().getFullYear()} منصة ملاذ الطبية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground dark:text-foreground/80">
              <span>🔒 متوافق مع HIPAA</span>
              <span>🛡️ مؤمن بـ SSL</span>
              <span>✓ معالجون مرخصون</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Banner */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-primary-foreground font-medium">
              دعم الأزمات متاح ٢٤/٧
            </p>
            <Button variant="secondary" size="sm">
              اتصل ٠٢ ٩٩٩٩ ٨٨٨٨
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
