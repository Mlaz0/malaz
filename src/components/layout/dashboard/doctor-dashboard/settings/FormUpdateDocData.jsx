
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Phone, MapPin, Info } from "lucide-react"


const FormUpdateDocData = ({ formik }) => {
    return (

        <form id="myForm" onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="rounded-xl shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl flex-row-reverse">
                        <User className="h-5 w-5 text-muted-foreground" />
                        المعلومات الأساسية
                    </CardTitle>
                    <CardDescription className="text-right">تحديث تفاصيلك الشخصية.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium flex-row-reverse">
                                <User className="h-4 w-4 text-muted-foreground" />
                                الاسم
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="أدخل اسمك الكامل"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.name && formik.errors.name ? "border-red-500 text-right" : "text-right"}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-sm text-red-500 text-right">{formik.errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium flex-row-reverse">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                رقم الهاتف
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="أدخل رقم هاتفك"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.phone && formik.errors.phone ? "border-red-500 text-right" : "text-right"}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-sm text-red-500 text-right">{formik.errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium flex-row-reverse">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            السيرة الذاتية
                        </Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="أخبرنا عن نفسك..."
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows={4}
                            className={formik.touched.bio && formik.errors.bio ? "border-red-500 text-right" : "text-right"}
                        />
                        {formik.touched.bio && formik.errors.bio && (
                            <p className="text-sm text-red-500 text-right">{formik.errors.bio}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="yearsOfExperience"
                                className="flex items-center gap-2 text-sm font-medium flex-row-reverse"
                            >
                                سنوات الخبرة
                            </Label>
                            <Input
                                id="yearsOfExperience"
                                name="yearsOfExperience"
                                type="number"
                                placeholder="مثال: 5"
                                value={formik.values.yearsOfExperience ?? ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.yearsOfExperience && formik.errors.yearsOfExperience
                                        ? "border-red-500 text-right"
                                        : "text-right"
                                }
                            />
                            {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                                <p className="text-sm text-red-500 text-right">{formik.errors.yearsOfExperience}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="clinicLocation"
                                className="flex items-center gap-2 text-sm font-medium flex-row-reverse"
                            >
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                موقع العيادة
                            </Label>
                            <Input
                                id="clinicLocation"
                                name="clinicLocation"
                                placeholder="أدخل عنوان عيادتك"
                                value={formik.values.clinicLocation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </div>
                    </div>


                </CardContent>
            </Card>



        </form>
    )
}

export default FormUpdateDocData