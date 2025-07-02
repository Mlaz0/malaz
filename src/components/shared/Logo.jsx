import React from "react";
import LogoSvg from "../../assets/Logo.svg";

export default function Logo({ className = "", ...props }) {
  return (
    <img
      src={LogoSvg}
      alt="ملاذ"
      className={`h-10 w-auto ${className}`}
      {...props}
    />
  );
}
