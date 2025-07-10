import { VideoVariantStyles } from './types';

export const getVariantStyles = (variant: 'default' | 'technology' | 'results'): VideoVariantStyles => {
  switch (variant) {
    case 'technology':
      return {
        container: "rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-accent/10 sm:shadow-accent/20",
        gradient: "bg-gradient-to-br from-accent/20 to-primary/20",
        video: "rounded-xl"
      };
    case 'results':
      return {
        container: "rounded-lg shadow-lg",
        gradient: "bg-gradient-to-br from-accent/20 to-primary/20",
        video: "rounded-lg"
      };
    default:
      return {
        container: "rounded-2xl shadow-2xl",
        gradient: "bg-gradient-to-br from-accent/20 to-primary/20",
        video: "rounded-xl"
      };
  }
};