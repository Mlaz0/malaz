import { DoctorReviews } from "@/components/layout/dashboard/doctor-dashboard/DoctorProfile/DoctorReviews";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import React from "react";

const Reviews = () => {
  const { data: doctorData } = useGetUserProfile();
  const doctor = doctorData?.data?.data;
  return (
    <>
      <DoctorReviews
        reviews={doctor?.doctorData?.ratings}
        ratingCount={doctor?.doctorData?.ratingCount}
        ratingNumber={doctor?.doctorData?.ratingNumber}
      />
    </>
  );
};

export default Reviews;
