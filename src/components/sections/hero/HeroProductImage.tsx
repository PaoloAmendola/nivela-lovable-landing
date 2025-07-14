import UnifiedImage from "@/components/ui/UnifiedImage";

interface HeroProductImageProps {
  shouldReduceAnimations: boolean;
}

const HeroProductImage = ({ shouldReduceAnimations }: HeroProductImageProps) => {
  return (
    <div className="relative max-w-sm mx-auto lg:max-w-none flex items-center justify-center">
      <UnifiedImage
        src="/lovable-uploads/a7abdd1a-341f-47f5-ac11-9963fecf6f84.png"
        alt="NIVELA® Retexturizador Hidro Nutritivo - Frasco 1kg BEM BEAUTY Professional"
        className="relative w-full h-auto object-contain max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        width={500}
        height={750}
        priority={true}
        quality={90}
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
      />
    </div>
  );
};

export default HeroProductImage;