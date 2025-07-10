import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { brazilianStates, benefits } from "./constants";
import { formatCNPJ } from "@/lib/formatters";

interface Step2Props {
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

const Step2 = ({ getFieldProps, setFieldValue }: Step2Props) => {
  return (
    <motion.div
      key="step2"
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Sua cidade"
            className="bg-secondary/20 border-accent/30 text-foreground"
            {...getFieldProps('city')}
          />
          {getFieldProps('city').error && (
            <p className="text-sm text-red-500">{getFieldProps('city').error}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select value={getFieldProps('state').value} onValueChange={(value) => setFieldValue('state', value)}>
            <SelectTrigger className="bg-secondary/20 border-accent/30">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              {brazilianStates.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldProps('state').error && (
            <p className="text-sm text-red-500">{getFieldProps('state').error}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          placeholder="00.000.000/0000-00"
          className="bg-secondary/20 border-accent/30 text-foreground"
          value={getFieldProps('cnpj').value}
          onChange={(e) => {
            const formatted = formatCNPJ(e.target.value);
            setFieldValue('cnpj', formatted);
          }}
          onBlur={getFieldProps('cnpj').onBlur}
        />
        {getFieldProps('cnpj').error && (
          <p className="text-sm text-red-500">{getFieldProps('cnpj').error}</p>
        )}
      </div>
      
      <Alert className="bg-secondary/20 border-accent/30">
        <AlertDescription className="text-xs text-muted">
          Trabalhamos exclusivamente com profissionais registrados no segmento de beleza.
        </AlertDescription>
      </Alert>

      {/* Benefits Preview */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-primary text-sm">Seus benefícios exclusivos:</h4>
        <div className="grid grid-cols-1 gap-2">
          {benefits.slice(0, 2).map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <benefit.icon className="w-3 h-3 text-primary" />
              <span className="text-muted">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Step2;