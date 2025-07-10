const ErrorMsg = ({ formik, type }) => {
  const typeInput = type;
  return (
    <>
      {formik.errors[typeInput] && formik.touched[typeInput] ? (
        <span className="error text-destructive">
          {formik.errors[typeInput]}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default ErrorMsg;
