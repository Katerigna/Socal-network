import React from 'react';
import ProfilePic from './profilepic';
import {render, fireEvent} from '@testing-library/react';

test('renders img with src set to url prop', () => {
    const {container} = render(<ProfilePic url="/funkychicken.gif" />);

    expect(
        container.querySelector('img').getAttribute('src')
    ).toBe("/funkychicken.gif");
});

test('renders img with src set to default.jpg when no url prop is present', () => {
    const {container} = render(<ProfilePic />);

    expect(
        container.querySelector('img').getAttribute('src')
    ).toBe("/default.jpg");
});

test('renders first and last props in alt attribute', () => {
    const {container} = render(<ProfilePic first="Funky" last="Chicken" />);

    expect(
        container.querySelector('img').getAttribute('alt')
    ).toBe("Funky Chicken");
});

test('onClick prop gets called when img is clicked', () => {
    const onClick = jest.fn();
    const {container} = render(<ProfilePic onClick={onClick} />);

    fireEvent.click(
        container.querySelector('img')
    );

    fireEvent.click(
        container.querySelector('img')
    );

    expect(
        onClick.mock.calls.length
    ).toBe(2);
});
