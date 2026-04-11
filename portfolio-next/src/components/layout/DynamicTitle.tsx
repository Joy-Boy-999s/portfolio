"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
  useEffect(() => {
    let title = "Hi there, I'm B.Neeraj Kumar. Welcome to my portfolio !           ";
    let position = 0;
    
    // We update the title on an interval to create the scrolling marquee effect
    const interval = setInterval(() => {
      document.title = title.substring(position, title.length) + title.substring(0, position);
      position++;
      if (position > title.length) {
        position = 0;
      }
    }, 270);

    return () => clearInterval(interval);
  }, []);

  return null;
}
