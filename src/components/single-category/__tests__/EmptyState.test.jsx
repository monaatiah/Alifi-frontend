import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import EmptyState from '../EmptyState';
import ar from '@/content/languages/ar.json';
import en from '@/content/languages/en.json';

const MESSAGE_IDS = [
  'categoryEmptyTitle',
  'categoryEmptyHint',
  'browseAllProducts',
  'noMatchingProductsTitle',
  'noMatchingProductsHint',
  'clearFilters',
];

const renderIn = (locale, messages, props = {}) =>
  render(
    <IntlProvider locale={locale} messages={messages}>
      <EmptyState {...props} />
    </IntlProvider>,
  );

describe('single-category EmptyState', () => {
  it('says the category has no products yet and links back to the shop', () => {
    renderIn('en', en);

    expect(
      screen.getByRole('heading', { name: 'No products in this category yet' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse all products' })).toHaveAttribute(
      'href',
      '/shop',
    );
  });

  it('renders the Arabic copy for the default locale', () => {
    renderIn('ar', ar);

    expect(
      screen.getByRole('heading', { name: 'لا توجد منتجات في هذا التصنيف بعد' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'تصفّح جميع المنتجات' })).toHaveAttribute(
      'href',
      '/shop',
    );
  });

  it('offers to clear filters when active filters hide every product', () => {
    const onResetFilters = jest.fn();
    renderIn('en', en, { hasActiveFilters: true, onResetFilters });

    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    expect(screen.queryByText('No products in this category yet')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onResetFilters).toHaveBeenCalledTimes(1);
  });

  it.each(MESSAGE_IDS)('defines "%s" in both the Arabic and English catalogues', (id) => {
    expect(ar[id]).toEqual(expect.any(String));
    expect(en[id]).toEqual(expect.any(String));
    expect(ar[id]).not.toBe(en[id]);
  });
});
