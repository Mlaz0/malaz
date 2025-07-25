const endPoints = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",

  categories: "/categories/",
  deleteCategory: "/categories",

  addBlog: "/blog/posts/",
  blogs: "/blog/posts",
  uploadFIles: "upload/proxy",

  userProfile: "/users/me",
  updateUser: "/users/patients",

  doctors: "/users/doctors/",
  deleteDoctor: "/users/doctors",
  approvedDoctors: "/users/doctors?isApproved=true",
  pendingDoctors: "/users/doctors?isApproved=false",

  patients: "/users/patients/",

  posts: "community/posts",

  addComment: "comments/post",
  updateComment: "comments",
  deleteComment: "comments",

  chargeWallet: "payment/charge",

  userPayment: "payment/my",
  adminPayments: "payment/all",

  cancelSession: "payment/expire",

  completeSession: "payment/session",

  availability: "availability",
  availabilityDoctor: "availability/doctor",
  Analysis: "/ai/analysis/analysis-tool",

  /* Booking */

  booking: "booking",

  userBooking: "booking/patient/my",
  doctorBooking: "booking/doctor/my",

  reports: "reports/",

  diagnosis: "diagnosis",
  getDoctorDiagnosis: "diagnosis/my?bookingId=",
};

export default endPoints;
