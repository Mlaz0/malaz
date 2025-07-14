import RegisterFormWrapper from "@/components/layout/auth/register/RegisterFormWrapper";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="grid lg:grid-cols-2 gap-8">
        <RegisterFormWrapper />
      </div>
    </div>
  );
}
