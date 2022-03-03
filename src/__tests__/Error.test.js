/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Error from '../components/Error';

describe('test error component', () => {
  test('error component displays correct error message', async () => {
    const errorAlert = 'Network error';
    const view = render(<Error errorAlert={errorAlert} />);

    const description = await view.findByTestId('error-alert');
    expect(description).toHaveTextContent(errorAlert);
  });
});
