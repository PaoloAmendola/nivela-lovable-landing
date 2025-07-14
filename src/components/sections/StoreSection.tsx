import React from "react";
import { motion } from "framer-motion";
import NuvemshopButton from "@/components/ui/NuvemshopButton";
import { ShoppingBag, Star, CheckCircle } from "lucide-react";

const StoreSection = () => {
  return (
    <section className="py-20 bg-background/50 backdrop-blur-sm border-y border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-full p-3 border border-primary/20">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-text-premium font-playfair">
              Adquira o NIVELA®
            </h2>
            
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Acesse nossa loja oficial e revolucione o seu salão com a tecnologia mais avançada em tratamentos capilares
            </p>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8"
          >
            <div className="flex items-center justify-center space-x-2 text-text-secondary">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm">Produto Exclusivo</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-text-secondary">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm">Garantia de Qualidade</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-text-secondary">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="text-sm">Entrega Rápida</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <NuvemshopButton
              productId="nivela"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-primary/20 backdrop-blur-sm min-h-[56px] text-lg"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6" />
                <span>Ir para a loja oficial</span>
              </div>
            </NuvemshopButton>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-2 text-text-secondary text-sm"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Loja oficial Bem Beauty Professional</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StoreSection;