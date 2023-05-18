import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Emergency } from '../src/screens/index.js';

describe('<Emergency/>', () => {
    it('relates to the Emergency section', () => {
        const { getByText } = render(<Emergency />);
        const element = getByText('Emergency');
        expect(element).toBeDefined();
    });
    it('features a emergency contact from SmartAlarm', () => {
        const { getByText } = render(<Emergency />);
        const element = getByText(' Smart Alarm emergency contact');
        expect(element).toBeDefined();
    });
    it('has 2 children', () => {
        const tree = renderer.create(<Emergency />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});