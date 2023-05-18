import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { AdvicePage } from '../src/screens/index.js';

describe('<AdvicePage/>', () => {
    it('deals with customer-given advices', () => {
        const { getByText } = render(<AdvicePage />);
        const element = getByText('Advice');
        expect(element).toBeDefined();
    });
    it('features a video guide section', () => {
        const { getByText } = render(<AdvicePage />);
        const element = getByText('VIDEO GUIDE');
        expect(element).toBeDefined();
    });
    it('has 3 children', () => {
        const tree = renderer.create(<AdvicePage />).toJSON();
        expect(tree.children.length).toBe(3);
    });
});