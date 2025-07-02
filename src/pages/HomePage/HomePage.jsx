import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  MessageCircle,
  Shield,
  Users,
  Star,
  Play,
  Clock,
  Globe,
  Zap,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "خصوصية تامة",
      description: "جلسات سرية ومشفرة لحماية خصوصيتك الشخصية",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "أخصائيون معتمدون",
      description: "فريق من الأخصائيين النفسيين المعتمدين والمؤهلين",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "دعم 24/7",
      description: "دعم متواصل على مدار الساعة لمساعدتك في أي وقت",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "سجل حسابك",
      description: "أنشئ حسابك بسهولة في دقائق معدودة",
    },
    {
      number: "02",
      title: "اختر أخصائيك",
      description: "تصفح قائمة الأخصائيين واختر من يناسبك",
    },
    {
      number: "03",
      title: "ابدأ الجلسة",
      description: "ابدأ جلستك النفسية في الوقت المناسب لك",
    },
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "طالب جامعي",
      content:
        "ملاذ ساعدني في تخطي القلق والتوتر خلال فترة الامتحانات. الأخصائية كانت رائعة!",
      rating: 5,
    },
    {
      name: "فاطمة علي",
      role: "موظفة",
      content:
        "خدمة ممتازة وسهلة الاستخدام. ساعدتني في تحسين صحتي النفسية بشكل كبير.",
      rating: 5,
    },
    {
      name: "محمد أحمد",
      role: "مهندس",
      content:
        "أفضل منصة للاستشارات النفسية. الأخصائيون محترفون والجلسات مفيدة جداً.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10K+", label: "عميل راضٍ" },
    { number: "50+", label: "أخصائي معتمد" },
    { number: "24/7", label: "دعم متواصل" },
    { number: "4.9", label: "تقييم متوسط" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with theme gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,181,253,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                موثوق به من قبل 10,000+ عميل حول العالم
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                  صحتك النفسية
                  <span className="gradient-text block mt-2">أولوية لدينا</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  احصل على الدعم النفسي الذي تحتاجه من أخصائيين معتمدين في أي
                  وقت ومن أي مكان. رحلتك نحو الصحة النفسية تبدأ هنا.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 h-auto rounded-xl"
                  asChild
                >
                  <Link to="/auth/register">
                    ابدأ رحلتك
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto rounded-xl"
                  asChild
                >
                  <Link to="/blogs">
                    <Play className="ml-2 h-5 w-5" />
                    شاهد كيف يعمل
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background shadow-lg"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    +1000 عميل راضٍ
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    4.9/5 تقييم
                  </span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-scale">
              <div className="card-modern relative z-10 p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground text-lg">
                      جلسة استشارة نفسية
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      مع د. سارة أحمد
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      جلسة سرية ومشفرة
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      أخصائية معتمدة
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      دعم 24/7
                    </span>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-xl font-semibold">
                  احجز جلستك
                </Button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-float" />
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-float"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              لماذا تختارنا
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              لماذا تختار ملاذ؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              نقدم لك أفضل الخدمات النفسية مع ضمان الخصوصية والجودة العالية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-modern text-center p-10 rounded-3xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-primary-foreground">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">
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

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              عملية بسيطة
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              كيف يعمل ملاذ؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ثلاث خطوات بسيطة لبدء رحلتك نحو الصحة النفسية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 translate-y-[-50%] translate-x-full h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              قصص العملاء
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-card-foreground mb-6 leading-tight">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف العملاء الراضين الذين تحسنوا صحتهم النفسية مع ملاذ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-modern bg-background p-10 rounded-3xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Rated Doctors Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              أفضل الأطباء تقييماً
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              تعرف على نخبة الأطباء لدينا
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              أطباء معتمدون وذوو خبرة عالية في مختلف التخصصات النفسية
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "د. سارة أحمد",
                specialty: "استشاري الطب النفسي",
                rating: 5,
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                id: 2,
                name: "د. محمد علي",
                specialty: "أخصائي علاج سلوكي معرفي",
                rating: 5,
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                id: 3,
                name: "د. فاطمة حسن",
                specialty: "استشاري الصحة النفسية للأطفال",
                rating: 4,
                img: "https://randomuser.me/api/portraits/women/65.jpg",
              },
            ].map((doctor, idx) => (
              <div
                key={doctor.id}
                className="card-modern p-8 rounded-3xl flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {doctor.name}
                </h3>
                <p className="text-muted-foreground mb-3">{doctor.specialty}</p>
                <div className="flex justify-center mb-4">
                  {[...Array(doctor.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                  {[...Array(5 - doctor.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-muted-foreground" />
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg px-6 font-semibold mt-auto"
                >
                  احجز الآن
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-primary-foreground text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            ابدأ رحلتك اليوم
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            ابدأ رحلتك نحو الصحة النفسية اليوم
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            انضم إلى آلاف الأشخاص الذين تحسنوا صحتهم النفسية مع ملاذ. احجز جلستك
            الأولى مجاناً اليوم.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-6 h-auto rounded-xl font-semibold"
              asChild
            >
              <Link to="/auth/register">
                ابدأ مجاناً
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 h-auto rounded-xl font-semibold"
              asChild
            >
              <Link to="/blogs">تعرف على المزيد</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
