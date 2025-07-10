import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatWhatsApp } from "@/lib/formatters";

interface Step1Props {
  getFieldProps: (name: string) => any;
  setFieldValue: (name: string, value: string) => void;
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const Step1 = ({ getFieldProps, setFieldValue }: Step1Props) => {
  return (
    <motion.div
      key="step1"
      custom={1}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="absolute inset-0 space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          placeholder="Digite seu nome"
          className="bg-secondary/20 border-accent/30 text-foreground"
          {...getFieldProps('name')}
        />
        {getFieldProps('name').error && (
          <p className="text-sm text-red-500">{getFieldProps('name').error}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="(00) 00000-0000"
          className="bg-secondary/20 border-accent/30 text-foreground"
          value={getFieldProps('whatsapp').value}
          onChange={(e) => {
            const formatted = formatWhatsApp(e.target.value);
            setFieldValue('whatsapp', formatted);
          }}
          onBlur={getFieldProps('whatsapp').onBlur}
        />
        {getFieldProps('whatsapp').error && (
          <p className="text-sm text-red-500">{getFieldProps('whatsapp').error}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Seu Perfil Profissional</Label>
        <RadioGroup
          value={getFieldProps('profile').value}
          onValueChange={(value) => setFieldValue('profile', value)}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center space-x-2 bg-secondary/10 p-3 rounded-lg">
            <RadioGroupItem value="salon" id="salon" />
            <Label htmlFor="salon" className="cursor-pointer text-sm">💼 Salão</Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-secondary/10 p-3 rounded-lg">
            <RadioGroupItem value="hairdresser" id="hairdresser" />
            <Label htmlFor="hairdresser" className="cursor-pointer text-sm">✂️ Autônomo</Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-secondary/10 p-3 rounded-lg">
            <RadioGroupItem value="distributor" id="distributor" />
            <Label htmlFor="distributor" className="cursor-pointer text-sm">🏢 Distribuidor</Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-secondary/10 p-3 rounded-lg">
            <RadioGroupItem value="training" id="training" />
            <Label htmlFor="training" className="cursor-pointer text-sm">🎓 Escola</Label>
          </div>
        </RadioGroup>
        {getFieldProps('profile').error && (
          <p className="text-sm text-red-500">{getFieldProps('profile').error}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Step1;