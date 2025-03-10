import { CheckCheck, X } from 'lucide-react';
import { render, screen } from '@testing-library/react';
import { LoadableIcon } from '@/components/LoadableIcon';
import { LoadableState } from '@/types';

describe('LoadableIcon', () => {
  it.each<[LoadableState | null | undefined, string]>([
    ['loading', 'lucide-loader-circle'],
    ['hasData', 'lucide-check'],
    ['hasError', 'lucide-ban'],
    [null, 'lucide-x'],
    [undefined, 'lucide-x']
  ])('renders the correct icon for state: %s', (state, expectedIcon) => {
    render(<LoadableIcon state={state} fallback={X} role="image" />);
    expect(screen.getByRole('image')).toHaveClass(expectedIcon);
  });

  it('uses a custom icon mapping if provided', () => {
    render(
      <LoadableIcon
        state="hasData"
        fallback={X}
        iconMapping={{ hasData: CheckCheck }}
        role="image"
      />
    );
    expect(screen.getByRole('image')).toHaveClass('lucide-check-check');
  });
});
