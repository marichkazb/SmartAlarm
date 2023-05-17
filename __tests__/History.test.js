import React from 'react';
import expect from 'expect';
import '@testing-library/jest-native';
import '@typescript-eslint/parser';
import { render } from '@testing-library/react-native';

import { History } from '../src/screens/index.js';

//eslint-disable-next-line no-undef
describe('History page', () => {
    //eslint-disable-next-line no-undef
    it('History component rendering', () => {
        const { getByText } = render(<History />);
        const element = getByText('History');
        expect(element).toBeDefined();
    });
});
