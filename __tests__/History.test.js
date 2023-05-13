import { History } from '../src/screens/index.js';
import React from 'react';
import expect from 'expect';

import '@testing-library/jest-native';
import '@testing-library/react-native';
import '@typescript-eslint/parser';
import { render } from '@testing-library/react-native';

describe("History page", () => {
        it('History component rendering', () => {
        const { getByText } = render(<History />);
        const element = getByText('History');
        expect(element).toBeDefined();
        });
    });
