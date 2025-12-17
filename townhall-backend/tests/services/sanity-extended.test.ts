import { sanityService } from '../../src/services/sanity';

describe('sanityService.portableTextToHtml', () => {
  it('should return empty string for null input', () => {
    const result = sanityService.portableTextToHtml(null as any);
    expect(result).toBe('');
  });

  it('should return empty string for undefined input', () => {
    const result = sanityService.portableTextToHtml(undefined as any);
    expect(result).toBe('');
  });

  it('should return empty string for empty array', () => {
    const result = sanityService.portableTextToHtml([]);
    expect(result).toBe('');
  });

  it('should convert simple block to paragraph', () => {
    const blocks = [
      {
        _type: 'block',
        children: [{ text: 'Hello world' }],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('<p>Hello world</p>');
  });

  it('should convert multiple blocks to multiple paragraphs', () => {
    const blocks = [
      {
        _type: 'block',
        children: [{ text: 'First paragraph' }],
      },
      {
        _type: 'block',
        children: [{ text: 'Second paragraph' }],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('<p>First paragraph</p>\n<p>Second paragraph</p>');
  });

  it('should join multiple children in a block', () => {
    const blocks = [
      {
        _type: 'block',
        children: [
          { text: 'Hello ' },
          { text: 'world' },
          { text: '!' },
        ],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('<p>Hello world!</p>');
  });

  it('should handle blocks with no children', () => {
    const blocks = [
      {
        _type: 'block',
        children: [],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('<p></p>');
  });

  it('should handle blocks with undefined children', () => {
    const blocks = [
      {
        _type: 'block',
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('<p></p>');
  });

  it('should ignore non-block types', () => {
    const blocks = [
      {
        _type: 'image',
        asset: { url: 'https://example.com/image.jpg' },
      },
      {
        _type: 'block',
        children: [{ text: 'Text content' }],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toBe('\n<p>Text content</p>');
  });

  it('should handle mixed content types', () => {
    const blocks = [
      {
        _type: 'block',
        children: [{ text: 'Before image' }],
      },
      {
        _type: 'image',
        asset: { url: 'https://example.com/image.jpg' },
      },
      {
        _type: 'block',
        children: [{ text: 'After image' }],
      },
    ];
    const result = sanityService.portableTextToHtml(blocks);
    expect(result).toContain('<p>Before image</p>');
    expect(result).toContain('<p>After image</p>');
  });
});
