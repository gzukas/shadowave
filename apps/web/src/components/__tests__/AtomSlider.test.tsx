import { atom, createStore, Provider as JotaiProvider } from 'jotai';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { AtomSlider } from '@/components/AtomSlider';

describe('AtomSlider', () => {
  const store = createStore();

  it('renders with label', () => {
    const valueAtom = atom(0);
    render(
      <JotaiProvider store={store}>
        <AtomSlider atom={valueAtom} label="Volume" />
      </JotaiProvider>
    );
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  describe('hotkeys', () => {
    const hotkeys: [string, string] = ['ctrl+arrowup', 'ctrl+arrowdown'];

    const ctrlUp = (user: UserEvent, times = 1) =>
      user.keyboard('{Control>}{ArrowUp}{/Control}'.repeat(times));

    const ctrlDown = (user: UserEvent, times = 1) =>
      user.keyboard('{Control>}{ArrowDown}{/Control}'.repeat(times));

    it('increments and decrements value on `hotkeys` using `hotkeysStep`', async () => {
      const valueAtom = atom(0);
      const min = 0;
      const max = 3;
      const hotkeyStep = Math.abs(max - min) * 0.25;
      const user = userEvent.setup();

      render(
        <JotaiProvider store={store}>
          <AtomSlider
            atom={valueAtom}
            label="Volume"
            hotkeys={hotkeys}
            hotkeysStep={hotkeyStep}
            min={min}
            max={max}
          />
        </JotaiProvider>
      );

      await ctrlUp(user);
      expect(store.get(valueAtom)).toBe(hotkeyStep);

      await ctrlUp(user, max + 1);
      expect(store.get(valueAtom)).toBe(max);

      await ctrlDown(user);
      expect(store.get(valueAtom)).toBe(max - hotkeyStep);

      await ctrlDown(user, max + 1);
      expect(store.get(valueAtom)).toBe(min);
    });

    it('does not react to hotkeys when disabled', async () => {
      const valueAtom = atom(50);
      const user = userEvent.setup();

      const { rerender } = render(
        <JotaiProvider store={store}>
          <AtomSlider
            atom={valueAtom}
            label="Volume"
            hotkeys={hotkeys}
            disabled
          />
        </JotaiProvider>
      );

      await ctrlUp(user, 2);
      await ctrlDown(user);
      expect(store.get(valueAtom)).toBe(50);

      rerender(
        <JotaiProvider store={store}>
          <AtomSlider atom={valueAtom} label="Volume" hotkeys={hotkeys} />
        </JotaiProvider>
      );

      await ctrlUp(user);
      expect(store.get(valueAtom)).toBe(51);
    });
  });
});
