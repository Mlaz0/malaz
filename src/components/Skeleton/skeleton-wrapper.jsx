import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonWrapper = ({ children }) => {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-bg)"
      highlightColor="var(--skeleton-highlight)"
    >
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonWrapper;
