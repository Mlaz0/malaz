import heroImg from "@/assets/hero-bg.jpg";
import { CustomLink } from "@/components/shared/CustomLink";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowLeft, Sparkles, Star, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HeroSVG from "./HeroSVG";
import { bestDoctors, features, steps, testimonials } from "./homePageData";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const [ctaInView, setCtaInView] = useState(false);
  const ctaRef = useRef(null);

  const { token } = useAuth();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setCtaInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Hero Image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Supportive mental health illustration"
            className="w-full h-full object-cover opacity-80"
            style={{ zIndex: 1, objectPosition: "70% center" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-primary/30"
            style={{ zIndex: 2 }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 sm:py-28 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Textual content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-right space-y-8 animate-fade-in-up">
            {/* Trust badge */}
            {/* <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-base font-semibold shadow shadow-primary/10 mb-2">
              <Sparkles className="h-5 w-5" />
              موثوق به من قبل آلاف المرضى
            </div> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              راحة بالك تبدأ من هنا
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              منصة ملاذ توفر لك الدعم النفسي من أخصائيين معتمدين في بيئة آمنة
              وسرية. أنت لست وحدك، نحن هنا من أجلك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start mt-2">
              <CustomLink to="#cta" text={"ابدأ رحلتك"} icon={<ArrowDown />} />
              {!token && (
                <CustomLink
                  variant="secondary"
                  text={"تسجيل الدخول"}
                  icon={<ArrowLeft />}
                  to="/auth/login"
                />
              )}
            </div>
            {/* Testimonial/comfort quote */}
            <div className="mt-8 max-w-md mx-auto lg:mx-0 bg-card/80 border border-border/60 rounded-2xl p-5 flex items-center gap-4 shadow-md animate-fade-in-up">
              <Star className="h-6 w-6 fill-primary text-primary" />
              <span className="text-base text-muted-foreground font-medium">
                "وجدت الراحة والدعم الذي أحتاجه في ملاذ. شكراً لكم!"
              </span>
            </div>
          </div>
          {/* Right: Decorative/hero image for large screens only */}
          <div className="flex-1 hidden lg:flex items-center justify-center animate-fade-in-scale">
            <HeroSVG />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full  border border-primary/20 text-primary text-sm font-medium mb-6">
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
                className="bg-card shadow-lg text-center p-10 rounded-3xl group animate-fade-in-up"
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
      <section className="py-24 bg-secondary-foreground">
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
                className="text-center bg-card shadow-lg p-10 rounded-3xl relative group animate-fade-in-up"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-24 ">
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
      </section> */}

      {/* Best Rated Doctors Section */}
      {/* <section className="py-24 bg-secondary-foreground">
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
            {bestDoctors.map((doctor, idx) => (
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
      </section> */}

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            ابدأ رحلتك اليوم
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            ابدأ رحلتك نحو الصحة النفسية اليوم
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            انضم إلى آلاف الأشخاص الذين تحسنوا صحتهم النفسية مع ملاذ. احجز جلستك
            الأولى مجاناً اليوم.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {!token && (
              <CustomLink
                to="/auth/register"
                text="ابدأ رحلتك اليوم"
                variant="primary"
                width="auto"
                height="64px"
                icon={<Sparkles />}
              />
            )}
            <CustomLink
              to="/doctors"
              text="تعرف على نخبة الأطباء"
              variant="secondary"
              width="auto"
              icon={<User />}
              height="64px"
            />
          </div>
        </div>
      </section>

      {/* Fixed CTA Jump Button */}
      {/* {!ctaInView && (
        <a
          href="#cta"
          className="fixed bottom-6 right-6 z-50"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("cta");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{}}
        >
          <Button
            size="lg"
            className="text-lg px-6 py-4 h-auto rounded-xl font-bold shadow-primary-lg opacity-70 hover:opacity-100"
          >
            الانتقال إلى البدأ
          </Button>
        </a>
      )} */}
    </main>
  );
};

export default HomePage;
