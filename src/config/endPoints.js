const endPoints = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",

  categories: "/categories",

  addBlog: "/blog/posts/",
  blogs: "/blog/posts",
  uploadFIles: "upload/proxy",

  userProfile: "/users/me",

  doctors: "/users/doctors/",
  approvedDoctors: "/users/doctors?isApproved=true",
  pendingDoctors: "/users/doctors?isApproved=false",
};

export default endPoints;
