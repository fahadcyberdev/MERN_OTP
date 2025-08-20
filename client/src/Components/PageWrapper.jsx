import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      className="flex h-screen items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
