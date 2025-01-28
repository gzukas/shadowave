import { createLucideIcon } from 'lucide-react';

const width = 24;
const height = 24;

export function createGraphIcon(iconName: string, getY: (x: number) => number) {
  const points: number[] = [];

  for (let x = 0; x <= width; x++) {
    points.push(x, height / 2 + getY(x));
  }

  return createLucideIcon(iconName, [
    ['polyline', { points: points.join(' ') }]
  ]);
}
