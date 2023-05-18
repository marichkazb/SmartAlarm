import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { History } from '../src/screens/index.js';

describe('<History/>', () => {
    it('has component rendering', () => {
        const { getByText } = render(<History />);
        const element = getByText('History');
        expect(element).toBeDefined();
    });
    it('has 2 children', () => {
        const tree = renderer.create(<History />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});