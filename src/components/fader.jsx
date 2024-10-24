"use client";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function Fader({ classStyle, children, delay, duration }) {
  let ref = useRef(null);
  let isInView = useInView(ref);
  let [isVisble, setVisible] = useState(false);

  useEffect(() => {
    if (isInView && !isInView) {
      setVisible(true);
    }
  }, [isInView, isVisble]);
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={classStyle}
      transition={{ delay, type: "spring", duration: duration }}
    >
      {children}
    </motion.div>
  );
}
