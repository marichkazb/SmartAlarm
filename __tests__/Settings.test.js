import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Settings from '../src/screens/Settings';

describe('<Settings />', () => {
    it('relates to the Settings section', () => {
        const { getByText } = render(<Settings />);
        const element = getByText('Settings');
        expect(element).toBeDefined();
    });
    it('has 1 child', () => {
        const tree = renderer.create(<Settings />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});