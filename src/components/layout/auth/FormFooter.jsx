import { Link } from "react-router-dom";

const FormFooter = ({ title, subtitle, link }) => {
  return (
    <div className="text-center text-sm text-gray-600">
      {title}
      <Link to={link} className="text-primary hover:text-primary font-medium">
        {subtitle}
      </Link>
    </div>
  );
};

export default FormFooter;
