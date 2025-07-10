import registerImg from "../../../../assets/registerImg.jpg";

const RegisterImg = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center order-1 lg:order-2 min-h-screen w-full relative rounded-2xl shadow-2xl overflow-hidden sticky top-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImg})` }}
      />

      <div className="absolute inset-0 bg-primary opacity-30" />

      <div className="relative z-10 px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          انضم إلى مجتمع الرعاية الصحية
        </h1>
        <p className="text-lg max-w-md mx-auto">
          تواصل مع المرضى والمختصين في الرعاية الصحية في منصة آمنة وحديثة مصممة
          لرعاية أفضل.
        </p>
      </div>
    </div>
  );
};

export default RegisterImg;
