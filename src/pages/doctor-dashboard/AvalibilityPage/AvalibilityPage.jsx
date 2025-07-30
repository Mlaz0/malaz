import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Save,
  X,
  Banknote,
} from "lucide-react";
import {
  useAddAvailability,
  useDeleteAvailability,
  useGetDoctorAvailability,
  useUpdateAvailability,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import * as Yup from "yup";
import EmptyAvalibility from "@/components/layout/dashboard/doctor-dashboard/AvalibilityPage/EmptyAvalibility";
import { formatDate, formatTime } from "@/utils/formatOperations";
import { calculateEndTime } from "@/utils/calcEndTime";

// Helper to compare times (HH:mm)
// const isTimeAfter = (start, end) => {
//   if (!start || !end) return false;
//   const [sh, sm] = start.split(":").map(Number);
//   const [eh, em] = end.split(":").map(Number);
//   if (eh > sh) return true;
//   if (eh === sh && em > sm) return true;
//   return false;
// };

// Helper to get minimum date (today)
const getMinDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const validationSchema = Yup.object({
  date: Yup.date()
    .required("التاريخ مطلوب")
    .test(
      "is-today-or-future",
      "لا يمكن أن يكون التاريخ في الماضي",
      (value) => {
        if (!value) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(value);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate >= today;
      }
    ),
  startTime: Yup.string()
    .required("وقت البداية مطلوب")
    .test("not-in-past", "لا يمكن اختيار وقت مضى", function (value) {
      const { date } = this.parent;
      if (!date || !value) return false;
      const today = new Date();
      const selectedDate = new Date(date);
      if (
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate()
      ) {
        // Date is today, check time
        const now = new Date();
        const [h, m] = value.split(":").map(Number);
        const inputTime = new Date();
        inputTime.setHours(h, m, 0, 0);
        return inputTime > now;
      }
      // Date is in the future
      return true;
    }),
  duration: Yup.string()
    .required("مدة الجلسة مطلوبة")
    .oneOf(["30m", "60m"], "يجب اختيار مدة صحيحة"),
});

const AvalibilityPage = () => {
  const [editingId, setEditingId] = useState(null);
  const { mutate } = useAddAvailability();
  const { data } = useGetDoctorAvailability(1, 50);
  const { mutate: updateMutate } = useUpdateAvailability();
  const { mutate: deleteMutate } = useDeleteAvailability();
  const { data: doctorData } = useGetUserProfile();
  const doctor = doctorData?.data?.data;

  // Get doctor's session fees
  const sessionFees = doctor?.doctorData?.sessionFee || [];

  const formik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      duration: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Calculate end time based on start time and duration
      const endTime = calculateEndTime(values.startTime, values.duration);

      // Get price based on duration
      const selectedSession = sessionFees.find(
        (session) => session.duration === values.duration
      );
      const price = selectedSession ? selectedSession.price : 0;

      const data = {
        date: values.date,
        startTime: values.startTime,
        endTime: endTime,
        price: price,
      };
      console.log("Sending data:", data);

      if (editingId) {
        // Update existing record
        updateMutate({ data, id: `/${editingId}` });
      } else {
        // Create new record
        mutate({ data });
      }
      resetForm();
      setEditingId(null);
    },
    onReset: () => {
      // When resetting, clear editing state
      setEditingId(null);
    },
  });

  // Update end time when start time or duration changes
  useEffect(() => {
    if (formik.values.startTime && formik.values.duration) {
      const endTime = calculateEndTime(
        formik.values.startTime,
        formik.values.duration
      );
      formik.setFieldValue("endTime", endTime);
    }
  }, [formik.values.startTime, formik.values.duration]);

  const handleDelete = (id) => {
    deleteMutate({ id });
  };

  const handleEdit = (record) => {
    // Extract date from ISO string
    const date = record.date ? new Date(record.date) : null;

    // Format times to HH:MM
    const startTime = record.startTime
      ? record.startTime.split("T")[1].split(".")[0]
      : "";
    const endTime = record.endTime
      ? record.endTime.split("T")[1].split(".")[0]
      : "";

    // Calculate duration based on start and end time
    let duration = "";
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      const diffMinutes = endTotalMinutes - startTotalMinutes;
      duration = diffMinutes === 30 ? "30m" : "60m";
    }

    // Set form values
    formik.setValues({
      date: date ? date.toISOString().split("T")[0] : "",
      startTime: startTime ? startTime : "",
      duration: duration,
    });

    // Set editing state
    setEditingId(record._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    formik.resetForm();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-eg", {
      style: "currency",
      currency: "egp",
    }).format(price);
  };

  // Get price for selected duration
  const getPriceForDuration = (duration) => {
    const selectedSession = sessionFees.find(
      (session) => session.duration === duration
    );
    return selectedSession ? selectedSession.price : 0;
  };

  // Get available durations based on doctor's session fees
  const getAvailableDurations = () => {
    return sessionFees.map((session) => ({
      value: session.duration,
      label: session.duration === "30m" ? "30 دقيقة" : "ساعة واحدة",
      price: session.price,
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      idle: { label: "متاح", variant: "default" },
      booked: { label: "محجوز", variant: "secondary" },
      expired: { label: "منتهي", variant: "destructive" },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: "secondary",
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              {editingId ? (
                <>
                  <Edit className="h-4 w-4 text-blue-600" />
                  تعديل الحدث
                </>
              ) : (
                <>
                  <Plus className="h-6 w-6 text-green-600" />
                  إنشاء حدث جديد
                </>
              )}
            </CardTitle>
            <CardDescription>
              {editingId
                ? "تحديث تفاصيل الحدث أدناه"
                : "املأ التفاصيل لإنشاء حدث جديد"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Calendar className="h-4 w-4 text-blue-600" />
                    التاريخ
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    min={getMinDate()}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`transition-all duration-200 ${
                      formik.touched.date && formik.errors.date
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.date && formik.errors.date && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-600"
                      >
                        {formik.errors.date}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Start Time Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="startTime"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Clock className="h-4 w-4 text-green-600" />
                    وقت البداية
                  </Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`transition-all duration-200 ${
                      formik.touched.startTime && formik.errors.startTime
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-green-500"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.startTime && formik.errors.startTime && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-600"
                      >
                        {formik.errors.startTime}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Duration Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Clock className="h-4 w-4 text-purple-600" />
                    مدة الجلسة
                  </Label>
                  <Select
                    value={formik.values.duration}
                    onValueChange={(value) =>
                      formik.setFieldValue("duration", value)
                    }
                  >
                    <SelectTrigger
                      className={`transition-all duration-200 ${
                        formik.touched.duration && formik.errors.duration
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-purple-500"
                      }`}
                    >
                      <SelectValue placeholder="اختر مدة الجلسة" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableDurations().map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{duration.label}</span>
                            <span className="text-sm text-green-600 font-medium">
                              {formatPrice(duration.price)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {formik.touched.duration && formik.errors.duration && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-600"
                      >
                        {formik.errors.duration}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Price Display */}
              {formik.values.duration && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        سعر الجلسة
                      </span>
                    </div>
                    <span className="text-xl font-bold text-green-700">
                      {formatPrice(getPriceForDuration(formik.values.duration))}
                    </span>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    editingId
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <Save className="h-4 w-4" />
                  {editingId ? "تحديث الحدث" : "إنشاء حدث جديد"}
                </Button>

                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Records List Section */}
      {data?.data?.data?.availability?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">قائمة الأحداث</CardTitle>
              <CardDescription>
                إجمالي {data?.data?.data?.availability?.length} حدث
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {data?.data?.data?.availability?.map((record, index) => (
                    <motion.div
                      key={record._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="group"
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Event Details */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm font-medium ">
                                    {formatDate(record.date)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(record.status)}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium ">
                                  {formatTime(record.startTime)} -{" "}
                                  {formatTime(record.endTime)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge
                                  // variant="secondary"
                                  className="text-lg font-bold"
                                >
                                  {formatPrice(record.price)}
                                </Badge>
                              </div>
                            </div>

                            <Separator />

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-slate-500">
                                تم الإنشاء في{" "}
                                {formatDate(new Date(record.createdAt))}
                              </div>

                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button
                                  size="sm"
                                  disabled={record.status !== "idle"}
                                  variant="outline"
                                  onClick={() => handleEdit(record)}
                                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(record?._id)}
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      {data?.data?.data?.availability?.length === 0 && <EmptyAvalibility />}
    </div>
  );
};

export default AvalibilityPage;
