import History from '../src/screens/History';

import '@typescript-eslint/parser';
import 'parse5'
import 'jest';
import '@testing-library/react'
import '@testing-library'
import '@testing-library/react'
import '@testing-library/jest-native'
import '@testing-library/react-native'
import { shallow } from 'enzyme'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';


test('renders a container', () => {
    const wrapper = shallow(React.createElement(History));
    expect(wrapper.find('View.container')).toHaveLength(1);
});



