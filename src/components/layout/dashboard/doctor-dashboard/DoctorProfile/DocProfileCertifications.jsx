import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";

const DocProfileCertifications = ({ doctorData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    الشهادات
                </CardTitle>
            </CardHeader>
            <CardContent>
                {doctorData?.doctorData?.certifications.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {doctorData?.doctorData?.certifications.map((cert, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div className="cursor-pointer group">
                                        <div className="relative overflow-hidden rounded-lg border-2 border-muted hover:border-primary transition-colors">
                                            <img
                                                src={cert.url || "/placeholder.svg"}
                                                alt={doctorData?.name}
                                                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <h4 className="font-medium text-sm truncate">
                                                {cert.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {cert.institution}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {cert.year}
                                            </p>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>{cert.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <img
                                            src={cert.url || "/placeholder.svg"}
                                            alt={doctorData?.name}
                                            className="w-full h-auto rounded-lg border"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">لا يوجد شهادات</p>
                )}
            </CardContent>
        </Card>
    );
};

export default DocProfileCertifications;
