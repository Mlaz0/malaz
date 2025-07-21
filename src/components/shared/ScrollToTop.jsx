import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component: scrolls to top on route change.
 * Place this at the top level of your app (inside MainLayout or App).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
