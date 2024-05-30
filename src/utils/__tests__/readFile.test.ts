import { readFile } from '../readFile';

describe('readFile', () => {
  it('should resolve with the result on successful read', async () => {
    const expected = 'file content';
    const actual = await readFile(reader => {
      reader.readAsText(new Blob([expected], { type: 'text/plain' }));
    });
    expect(actual).toBe(expected);
  });

  it('should reject with an error on read failure', async () => {
    await expect(
      readFile(reader => {
        reader.dispatchEvent(new ProgressEvent('error'));
      })
    ).rejects.toBeInstanceOf(ProgressEvent);
  });
});
