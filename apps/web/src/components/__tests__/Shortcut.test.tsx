import { render } from '@testing-library/react';
import { Shortcut } from '@/components/Shortcut';

interface ShortcutTestCase {
  keys: string;
  expectedOther: string[];
  expectedMacos: string[];
}

describe('Shortcut', () => {
  it.each`
    keys                 | expectedOther                | expectedMacos
    ${'ctrl'}            | ${['Ctrl']}                  | ${['⌃']}
    ${'mod'}             | ${['Ctrl']}                  | ${['⌘']}
    ${'ctrl+alt+delete'} | ${['Ctrl', 'Alt', 'delete']} | ${['⌃', '⌥', 'delete']}
    ${'mod+S'}           | ${['Ctrl', 'S']}             | ${['⌘', 'S']}
    ${'mod+shift+S'}     | ${['Ctrl', '⇧', 'S']}        | ${['⌘', '⇧', 'S']}
  `(
    'renders $keys correctly',
    ({ keys, expectedOther, expectedMacos }: ShortcutTestCase) => {
      const { rerender, container } = render(
        <Shortcut keys={keys} userAgent="Windows" />
      );
      expect(container).toHaveTextContent(expectedOther.join(''));

      rerender(<Shortcut keys={keys} userAgent="Macintosh" />);
      expect(container).toHaveTextContent(expectedMacos.join(''));
    }
  );

  it('renders with custom key display mapping', () => {
    const { container } = render(
      <Shortcut
        keys="ctrl+enter"
        keyDisplayMapping={{
          enter: '⏎'
        }}
      />
    );
    expect(container).toHaveTextContent('Ctrl⏎');
  });
});
