import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  User,
  XCircle,
} from "lucide-react";

export default function DoctorProfile() {
  const { data: doctorData } = useGetUserProfile();
  console.log(doctorData);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={doctorData?.userImg?.url || "/placeholder.svg"}
                alt={doctorData?.name}
              />
              <AvatarFallback className="text-2xl">
                {doctorData?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{doctorData?.name}</CardTitle>
                <div className="flex gap-2">
                  {doctorData?.doctorData?.isApproved ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending Approval
                    </Badge>
                  )}

                  {doctorData?.isEmailVerified ? (
                    <Badge
                      variant="default"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-red-200 text-red-600"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                </div>
              </div>

              <CardDescription className="text-base">
                {doctorData?.role.charAt(0).toUpperCase() +
                  doctorData?.role.slice(1)}{" "}
                •
                {doctorData?.gender.charAt(0).toUpperCase() +
                  doctorData?.gender.slice(1)}{" "}
                • Age {calculateAge(doctorData?.dateOfBirth)}
              </CardDescription>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < doctorData?.doctorData?.ratingNumber
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {doctorData?.doctorData?.ratingNumber > 0
                    ? `${doctorData?.doctorData?.ratingNumber}/5 (${doctorData?.doctorData?.ratingCount} reviews)`
                    : "No reviews yet"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{doctorData?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{doctorData?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{doctorData?.doctorData?.clinicLocation}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Born: {formatDate(doctorData?.dateOfBirth)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {doctorData?.doctorData?.specializations.length > 0 ? (
              <div className="space-y-3">
                {doctorData?.doctorData?.specializations.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <span className="font-medium">{spec.name}</span>
                    <Badge variant="secondary">{spec.level}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No specializations listed</p>
            )}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Certifications
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
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.name}
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
                          alt={cert.name}
                          className="w-full h-auto rounded-lg border"
                        />
                        <div className="space-y-2">
                          <p>
                            <span className="font-medium">Institution:</span>{" "}
                            {cert.institution}
                          </p>
                          <p>
                            <span className="font-medium">Year:</span>{" "}
                            {cert.year}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No certifications listed</p>
            )}
          </CardContent>
        </Card>

        {/* Practice Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Practice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Availability</h4>
              {doctorData?.doctorData?.availability.length > 0 ? (
                <div className="space-y-2">
                  {doctorData?.doctorData?.availability.map((slot, index) => (
                    <Badge key={index} variant="outline">
                      {slot}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No availability set
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Session Fees
              </h4>
              {doctorData?.doctorData?.sessionFee.length > 0 ? (
                <div className="space-y-2">
                  {doctorData?.doctorData?.sessionFee.map((fee, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-muted rounded"
                    >
                      <span>{fee.type}</span>
                      <span className="font-semibold">${fee.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No session fees set
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Account ID:</span>
              <span className="ml-2 font-mono text-muted-foreground">
                {doctorData?._id}
              </span>
            </div>
            <div>
              <span className="font-medium">Member since:</span>
              <span className="ml-2">{formatDate(doctorData?.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
