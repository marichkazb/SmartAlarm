import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { NewPassword } from '../src/screens/index.js';

describe('<NewPassword/>', () => {
    it('asks for the old password', () => {
        const { getByText } = render(<NewPassword />);
        const element = getByText('Old Password');
        expect(element).toBeDefined();
    });
    it('asks for a new password', () => {
        const { getByText } = render(<NewPassword />);
        const element = getByText('New Password');
        expect(element).toBeDefined();
    });
    it('has 1 children (sanity check)', () => {
        const tree = renderer.create(<NewPassword />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});