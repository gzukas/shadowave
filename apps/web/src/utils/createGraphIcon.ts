import { createLucideIcon } from 'lucide-react';

const width = 24;
const height = 24;

/**
 * Creates a Lucide icon representing a graph based on the provided function.
 *
 * The function `getY` should map an x-coordinate to a y-coordinate within the icon's bounds.
 *
 * @param iconName - The name of the Lucide icon to create.
 * @param getY - A function that takes an x-coordinate (number) and returns a y-coordinate (number) for the graph.
 */
export function createGraphIcon(iconName: string, getY: (x: number) => number) {
  const points: number[] = [];
  for (let x = 0; x <= width; x++) {
    points.push(x, height / 2 + getY(x));
  }
  return createLucideIcon(iconName, [
    ['polyline', { key: 'points', points: points.join(' ') }]
  ]);
}
