
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileCTAProps {
  onClick: () => void;
}

const MobileCTA = ({ onClick }: MobileCTAProps) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;

  return (
    <div className="cta-fixed-mobile">
      <Button
        onClick={onClick}
        className="btn-premium w-full"
      >
        Quero conhecer o NIVELA®
      </Button>
    </div>
  );
};

export default MobileCTA;
