"use client";

import { useState, useEffect } from "react";

const useDevice = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    mediaQuery.addEventListener("change", (e) => {
      setIsDesktop(e.matches);
    });

    setIsDesktop(mediaQuery.matches);
  }, []);

  return { isDesktop };
};

export default useDevice;
