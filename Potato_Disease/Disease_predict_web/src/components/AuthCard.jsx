import { motion } from "framer-motion"

export default function AuthCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md text-white"
    >
      {children}
    </motion.div>
  )
}
