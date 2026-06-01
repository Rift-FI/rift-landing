import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export const Reveal = ({ children, delay = 0, y = 24, className, once = true }: RevealProps) => {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.05, margin: "0px 0px -5% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export const StaggerGroup = ({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) => {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -5% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};
