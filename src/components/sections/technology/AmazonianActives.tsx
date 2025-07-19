
import StyledIcon from "@/components/ui/StyledIcon";
import { Droplet, Sparkles, Leaf } from "lucide-react";

const AmazonianActives = () => {
  const amazonianActives = [
    {
      name: "Murumuru",
      description: "Rico em ácidos graxos essenciais, proporciona hidratação profunda e proteção natural",
      icon: Leaf,
      colorClass: "text-green-600",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      name: "Cupuaçu",
      description: "Antioxidante poderoso que nutre intensamente e fortalece a fibra capilar",
      icon: Droplet,
      colorClass: "text-blue-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      name: "Extrato de Romã",
      description: "Proteção molecular avançada e brilho intenso com propriedades regenerativas",
      icon: Sparkles,
      colorClass: "text-purple-600",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header com hierarquia tipográfica clara */}
      <div className="text-center">
        <h3 className="tech-section-title">
          Ativos Amazônicos
        </h3>
        <p className="tech-section-subtitle">
          O poder da biodiversidade brasileira
        </p>
      </div>
      
      {/* Amazonian Actives Cards com hierarquia melhorada */}
      <div className="space-y-4">
        {amazonianActives.map((active, index) => (
          <div key={index} className={`group relative bg-gradient-to-br ${active.bgGradient} backdrop-blur-sm border border-accent/30 rounded-xl p-4 lg:p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-300`}>
            {/* Floating Icon */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <active.icon className={`w-6 h-6 ${active.colorClass}`} />
            </div>
            
            <div className="pr-8">
              <h4 className="tech-card-title group-hover:text-high-contrast transition-colors">
                {active.name}
              </h4>
              <p className="tech-description">
                {active.description}
              </p>
            </div>
            
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 ${active.colorClass} opacity-5 rounded-xl group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmazonianActives;
