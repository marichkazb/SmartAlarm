import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { LockScreen } from '../src/screens/index.js';

describe('<LockScreen/>', () => {
    it('gives the option to Unlock', () => {
        const { getByText } = render(<LockScreen />);
        const element = getByText('Unlock');
        expect(element).toBeDefined();
    });
    it('has 1 children (sanity check)', () => {
        const tree = renderer.create(<LockScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});