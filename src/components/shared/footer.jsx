import {
  Facebook,
  Heart,
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
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ملاذ</span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed">
              رعاية صحة نفسية مهنية ومتاحة وحساسة ثقافياً للمجتمع المصري. رحلة
              صحتك النفسية تبدأ هنا.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>٠٢ ١٢٣٤ ٥٦٧٨</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@mlaz.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>١٢٣ ميدان التحرير، القاهرة، مصر</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors"
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
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="text-xl font-semibold mb-2">ابق محدثاً</h3>
              <p className="text-gray-300">
                احصل على نصائح الصحة النفسية والتحديثات في بريدك الإلكتروني
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-w-[250px]"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">اشترك</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} منصة ملاذ الطبية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
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
            <p className="text-white font-medium">دعم الأزمات متاح ٢٤/٧</p>
            <Button variant="secondary" size="sm">
              اتصل ٠٢ ٩٩٩٩ ٨٨٨٨
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
