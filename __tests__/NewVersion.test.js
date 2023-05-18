import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { NewVersion } from '../src/screens/index.js';

describe('<NewVersion/>', () => {
    it('relates to the upcoming changes for a new version', () => {
        const { getByText } = render(<NewVersion />);
        const element = getByText('New features include:');
        expect(element).toBeDefined();
    });
    it('has 4 children', () => {
        const tree = renderer.create(<NewVersion />).toJSON();
        expect(tree.children.length).toBe(4);
    });
});