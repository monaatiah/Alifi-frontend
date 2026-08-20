import { getFullDate, handleImageLink, getId, getComponentByIdentifier } from '../functions';

describe('Helper Functions', () => {
  describe('getFullDate', () => {
    it('returns formatted date for English locale', () => {
      const date = '2026-05-16';
      const result = getFullDate(date, 'en');
      expect(result).toMatch(/May|2026/);
    });

    it('returns formatted date for Arabic locale', () => {
      const date = '2026-05-16';
      const result = getFullDate(date, 'ar');
      expect(result).toBeDefined();
    });

    it('returns undefined for null/undefined date', () => {
      expect(getFullDate(null, 'en')).toBeUndefined();
      expect(getFullDate(undefined, 'en')).toBeUndefined();
    });
  });

  describe('handleImageLink', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
      process.env.NEXT_PUBLIC_STORAGE_URL = 'https://storage.example.com';
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('returns empty string for null/undefined image', () => {
      expect(handleImageLink(null)).toBe('');
      expect(handleImageLink(undefined)).toBe('');
    });

    it('returns object src property if image is object', () => {
      const imageObj = { src: '/path/to/image.jpg' };
      expect(handleImageLink(imageObj)).toBe('/path/to/image.jpg');
    });

    it('returns object path property as fallback', () => {
      const imageObj = { path: '/alternate/path.jpg' };
      expect(handleImageLink(imageObj)).toBe('/alternate/path.jpg');
    });

    it('returns full URL if image includes http', () => {
      const fullUrl = 'https://example.com/image.jpg';
      expect(handleImageLink(fullUrl)).toBe(fullUrl);
    });

    it('prepends storage URL for relative paths', () => {
      const relativePath = 'products/item.jpg';
      const result = handleImageLink(relativePath);
      expect(result).toBe('https://storage.example.com/products/item.jpg');
    });
  });

  describe('getId', () => {
    it('returns _id if present', () => {
      const obj = { _id: 'mongo-id', id: 'regular-id' };
      expect(getId(obj)).toBe('mongo-id');
    });

    it('returns id if _id not present', () => {
      const obj = { id: 'regular-id' };
      expect(getId(obj)).toBe('regular-id');
    });

    it('returns undefined for object without id or _id', () => {
      expect(getId({})).toBeUndefined();
      expect(getId(null)).toBeUndefined();
    });
  });

  describe('getComponentByIdentifier', () => {
    const components = [
      { component_identifier: 'hero', title: 'Hero Section' },
      { component_identifier: 'features', title: 'Features' },
      { component_identifier: 'cta', title: 'Call to Action' },
    ];

    it('finds component by identifier', () => {
      const result = getComponentByIdentifier(components, 'features');
      expect(result).toEqual({ component_identifier: 'features', title: 'Features' });
    });

    it('returns null if identifier not found', () => {
      const result = getComponentByIdentifier(components, 'nonexistent');
      expect(result).toBeNull();
    });

    it('returns null if pageComponents is not an array', () => {
      expect(getComponentByIdentifier(null, 'hero')).toBeNull();
      expect(getComponentByIdentifier(undefined, 'hero')).toBeNull();
      expect(getComponentByIdentifier({}, 'hero')).toBeNull();
    });

    it('returns null if pageComponents is empty', () => {
      expect(getComponentByIdentifier([], 'hero')).toBeNull();
    });
  });
});
