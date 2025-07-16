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

  posts: "community/posts",

  addComment: "comments/post",
  updateComment: "comments",
  deleteComment: "comments",
};

export default endPoints;
