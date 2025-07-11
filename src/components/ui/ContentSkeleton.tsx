import { motion } from 'framer-motion';

interface ContentSkeletonProps {
  type?: 'article' | 'product' | 'profile' | 'card' | 'list';
  count?: number;
  className?: string;
}

const ContentSkeleton = ({ type = 'article', count = 1, className = '' }: ContentSkeletonProps) => {
  const ArticleSkeleton = () => (
    <div className="space-y-4 p-6 bg-card rounded-lg border border-border/50">
      <div className="h-6 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-4/6" />
      </div>
      <div className="flex space-x-2">
        <div className="h-8 w-16 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        <div className="h-8 w-16 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
      </div>
    </div>
  );

  const ProductSkeleton = () => (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border/50">
      <div className="aspect-square bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 rounded-lg animate-pulse" />
      <div className="space-y-2">
        <div className="h-5 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );

  const ProfileSkeleton = () => (
    <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border/50">
      <div className="w-16 h-16 bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 rounded-full animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-1/3" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-1/2" />
        <div className="h-3 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-2/3" />
      </div>
    </div>
  );

  const CardSkeleton = () => (
    <div className="p-6 bg-card rounded-lg border border-border/50 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-1/4" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse w-4/5" />
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 bg-card rounded border border-border/50">
          <div className="w-4 h-4 bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse flex-1" />
          <div className="h-4 w-16 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );

  const getSkeletonComponent = () => {
    switch (type) {
      case 'product': return <ProductSkeleton />;
      case 'profile': return <ProfileSkeleton />;
      case 'card': return <CardSkeleton />;
      case 'list': return <ListSkeleton />;
      default: return <ArticleSkeleton />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`space-y-4 ${className}`}
    >
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {getSkeletonComponent()}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentSkeleton;