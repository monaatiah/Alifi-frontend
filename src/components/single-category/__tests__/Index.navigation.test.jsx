import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Index from '../Index';
import en from '@/content/languages/en.json';
import { GET_CATEGORY_PRODUCTS } from '@/store/categories/actionTypes';

jest.mock('react-redux', () => ({ useSelector: jest.fn(), useDispatch: jest.fn() }));
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('swiper', () => ({ Navigation: {} }));
jest.mock('swiper/react', () => {
  const React = require('react');
  const Passthrough = ({ children }) => React.createElement('div', null, children);
  return { Swiper: Passthrough, SwiperSlide: Passthrough };
});
jest.mock('@/components/Shared/ProductBlock', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/Shared/Pagination', () => ({ __esModule: true, default: () => null }));
jest.mock('@/helpers/functions', () => ({ ImageWithFallback: () => null }));
jest.mock('../ShopSidebar', () => ({ __esModule: true, default: () => null }));

const storeFor = (slug, products) => ({
  categories: {
    loading: false,
    singleCategory: {
      id: slug.length,
      slug,
      name: slug,
      children: [],
      ...(products && { products: { data: products, meta: { last_page: 1 } } }),
    },
  },
});

const requestedSlugs = (dispatch) =>
  dispatch.mock.calls
    .map(([action]) => action)
    .filter((action) => action.type === GET_CATEGORY_PRODUCTS)
    .map((action) => action.payload.slug);

const page = () => (
  <IntlProvider locale="en" messages={en}>
    <Index />
  </IntlProvider>
);

describe('single-category Index navigation', () => {
  it('fetches the next category products when the page stays mounted across categories', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    let store = storeFor('alktt', [{ id: 1, name: 'Cat food' }]);
    useSelector.mockImplementation((select) => select(store));

    const view = render(page());
    expect(requestedSlugs(dispatch)).toEqual(['alktt']);

    // Next keeps the page mounted on client-side navigation; HYDRATE swaps in the
    // next category without its products.
    store = storeFor('taaam-alktt');
    view.rerender(page());

    expect(requestedSlugs(dispatch)).toEqual(['alktt', 'taaam-alktt']);
  });
});
