import { Link } from "react-router-dom";

export const CustomLink = ({
  to,
  text,
  variant = "primary",
  icon,
  className = "",
  width = "auto",
  height = "64px",
}) => {
  const baseClasses =
    "text-lg flex cursor-pointer items-center justify-center rounded-xl font-bold shadow-primary-lg";

  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white"
      : "bg-white text-primary shadow-lg";

  const paddingClass = icon ? "px-8 py-6" : "px-4 py-3";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variantClasses} ${paddingClass} ${className}`}
      style={{ width, height }}
    >
      <span className={icon ? "" : "text-center w-full"}>{text}</span>

      {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
    </Link>
  );
};
