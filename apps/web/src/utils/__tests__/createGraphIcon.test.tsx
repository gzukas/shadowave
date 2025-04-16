import { render } from '@testing-library/react';
import { createGraphIcon } from '../createGraphIcon';

describe('createGraphIcon', () => {
  it('should create the vertically centered polyline for a linear function', () => {
    const Icon = createGraphIcon('Linear', x => x);
    const { container } = render(<Icon />);

    const polyline = container.querySelector('polyline');
    expect(polyline).toBeDefined();

    const actualPoints = [...polyline!.points].map(p => [p.x, p.y]);
    const expectedPoints = Array.from({ length: 24 }, (_, i) => [i, i + 12]);

    expect(actualPoints).toEqual(expectedPoints);
  });
});
