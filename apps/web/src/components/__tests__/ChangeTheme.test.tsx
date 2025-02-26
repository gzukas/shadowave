import { act, render, screen } from '@testing-library/react';
import { ChangeTheme } from '../ChangeTheme';
import { AppProvider } from '../AppProvider';

describe('ChangeTheme', () => {
  it('changes theme on click', async () => {
    render(
      <AppProvider>
        <ChangeTheme />
      </AppProvider>
    );

    expect(document.documentElement).toHaveClass('light');

    act(() => {
      screen.getByLabelText('Toggle theme').click();
    });

    expect(document.documentElement).toHaveClass('dark');
  });
});
