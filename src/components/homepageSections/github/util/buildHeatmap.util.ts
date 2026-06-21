export const buildHeatmap = () => {
  let seed = 17;
  const colors = [
    'bg-portfolio-faint/15',
    'bg-portfolio-green/30',
    'bg-portfolio-green/50',
    'bg-portfolio-green/75',
    'bg-portfolio-green',
  ];
  return Array.from({ length: 52 * 7 }, () => {
    seed = (seed * 9301 + 49297) % 233280;
    const value = seed / 233280;
    const level = value < 0.55 ? 0 : value < 0.74 ? 1 : value < 0.88 ? 2 : value < 0.96 ? 3 : 4;
    return colors[level];
  });
};
