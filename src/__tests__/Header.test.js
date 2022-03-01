/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import Header from '../components/Header';

describe('renders Header component and its children', () => {
  test('renders Heading', async () => {
    const view = render(<Header />);

    const heading = view.getByText(/spacestagram/i);
    expect(heading).toBeInTheDocument();

    const github = await view.findByTestId('github-link');
    expect(github).toBeInTheDocument();

    const colormode = await view.findByTestId('colormode');
    expect(colormode).toBeInTheDocument();

    const randomFeed = await view.findByTestId('random-feed');
    expect(randomFeed).toBeInTheDocument();
  });
});
