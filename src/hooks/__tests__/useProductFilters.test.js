import { act, renderHook } from '@testing-library/react';
import { useProductFilters } from '../useProductFilters';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({ useDispatch: () => mockDispatch }));

describe('useProductFilters', () => {
  beforeEach(() => mockDispatch.mockClear());

  it('fetches the first page of the category products on mount', () => {
    renderHook(() => useProductFilters({ categorySlug: 'alrml-omstlzmath' }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].payload).toEqual(
      expect.objectContaining({ slug: 'alrml-omstlzmath', page: 1 }),
    );
  });

  it('reports no active filters by default', () => {
    const { result } = renderHook(() => useProductFilters({ categorySlug: 'alktt' }));

    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('reports active filters once the price range narrows and clears them on reset', () => {
    const { result } = renderHook(() => useProductFilters({ categorySlug: 'alktt' }));

    act(() => result.current.setPriceRange({ min: 50, max: 10000 }));
    expect(result.current.hasActiveFilters).toBe(true);

    act(() => result.current.resetFilters());
    expect(result.current.hasActiveFilters).toBe(false);
  });
});
