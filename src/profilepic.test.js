import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test("renders image with source set to url prop", () => {
    const { container } = render(<ProfilePic url="/funkychicken.gif" />);

    expect(
        container.querySelector("img").src.endsWith("/funkychicken.gif")
    ).toBe(true);

    //alternatively
    expect(
        container
            .querySelector("img")
            .getAttribute("src")
            .toBe("/funkychicken.gif")
    );
});

test("onClick prop gets called when img is clicked", () => {
    const onClick = jest.fn();
    const { container } = render(<ProfilePic onClick={onCLick} />);

    fireEvent.click(container.querySelector("img"));

    expect(onCLick.mock.calls.length).toBe(1);
});
