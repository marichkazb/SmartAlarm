import 'jest';
import { sum } from '../sum';

import '@testing-library/react'
import '@typescript-eslint/parser'

test('sum function working', () => {
    let value = 7;
    let expected = sum(3, 4);

    expect(expected).toBe(value);
});