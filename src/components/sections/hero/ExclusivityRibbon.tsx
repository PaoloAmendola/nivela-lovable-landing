import { Crown, Trophy } from "lucide-react";
import { motion } from "framer-motion";
const ExclusivityRibbon = () => {
  return <motion.div initial={{
    x: 100,
    opacity: 0
  }} animate={{
    x: 0,
    opacity: 1
  }} transition={{
    delay: 0.3,
    duration: 0.6
  }} className="fixed top-20 right-4 z-40 hidden lg:block">
      
    </motion.div>;
};
export default ExclusivityRibbon;