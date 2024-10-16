"use client";
import { HTMLMotionProps, motion } from "framer-motion";

export default function MotionWrapper(props: HTMLMotionProps<"div">) {
  return <motion.div {...props}>{props.children}</motion.div>;
}
