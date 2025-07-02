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

const bestDoctors = [
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
];

export { features, steps, testimonials, stats, bestDoctors };
