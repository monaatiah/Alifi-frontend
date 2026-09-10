import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import Index from '../Index';
import { useProductFilters } from '../../../hooks/useProductFilters';
import en from '@/content/languages/en.json';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('swiper', () => ({ Navigation: {} }));
jest.mock('swiper/react', () => {
  const React = require('react');
  const Passthrough = ({ children }) => React.createElement('div', null, children);
  return { Swiper: Passthrough, SwiperSlide: Passthrough };
});
jest.mock('@/components/Shared/ProductBlock', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ item }) => React.createElement('article', { 'data-testid': 'product-block' }, item.name),
  };
});
jest.mock('@/components/Shared/Pagination', () => ({ __esModule: true, default: () => null }));
jest.mock('@/helpers/functions', () => ({ ImageWithFallback: () => null }));
jest.mock('../ShopSidebar', () => ({ __esModule: true, default: () => null }));
jest.mock('../../../hooks/useProductFilters', () => ({ useProductFilters: jest.fn() }));

const filterState = (overrides = {}) => ({
  searchText: '',
  setSearchText: jest.fn(),
  sortOrder: '',
  setSortOrder: jest.fn(),
  priceRange: { min: 0, max: 10000 },
  setPriceRange: jest.fn(),
  selectedBrand: null,
  setSelectedBrand: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
  resetFilters: jest.fn(),
  hasActiveFilters: false,
  ...overrides,
});

const categoryWith = (products) => ({
  id: 20,
  slug: 'alrml-omstlzmath',
  name: 'Litter and supplies',
  children: [
    { id: 21, slug: 'rml', name: 'Litter' },
    { id: 22, slug: 'ahoad', name: 'Litter boxes' },
  ],
  products: { data: products, meta: { current_page: 1, last_page: 1, total: products.length } },
});

const renderCategory = ({ singleCategory, loading = false, filters = filterState() }) => {
  useSelector.mockImplementation((select) => select({ categories: { singleCategory, loading } }));
  useProductFilters.mockReturnValue(filters);

  return render(
    <IntlProvider locale="en" messages={en}>
      <Index />
    </IntlProvider>,
  );
};

describe('single-category Index', () => {
  it('renders the empty state for a published category whose subtree has no products', () => {
    renderCategory({ singleCategory: categoryWith([]) });

    expect(
      screen.getByRole('heading', { name: 'No products in this category yet' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse all products' })).toHaveAttribute(
      'href',
      '/shop',
    );
    expect(screen.queryByTestId('product-block')).not.toBeInTheDocument();
  });

  it('renders the product grid when the category has products', () => {
    renderCategory({
      singleCategory: categoryWith([
        { id: 1, name: 'Clumping litter' },
        { id: 2, name: 'Covered litter box' },
      ]),
    });

    expect(screen.getAllByTestId('product-block')).toHaveLength(2);
    expect(screen.getByText('Clumping litter')).toBeInTheDocument();
    expect(screen.queryByText('No products in this category yet')).not.toBeInTheDocument();
  });

  it('shows the loading state instead of the empty state while products load', () => {
    renderCategory({ singleCategory: categoryWith([]), loading: true });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('No products in this category yet')).not.toBeInTheDocument();
  });

  it('offers to clear filters when active filters hide every product', () => {
    const filters = filterState({ hasActiveFilters: true });
    renderCategory({ singleCategory: categoryWith([]), filters });

    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(filters.resetFilters).toHaveBeenCalledTimes(1);
  });
});
