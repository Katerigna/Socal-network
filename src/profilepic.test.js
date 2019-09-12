import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test("renders image with source set to imageurl prop", () => {
    const { container } = render(<ProfilePic imageurl="/funkychicken.gif" />);

    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/funkychicken.gif"
    );
});

test("toggleModal prop gets called when img is clicked", () => {
    const toggleModal = jest.fn();
    const { container } = render(<ProfilePic toggleModal={toggleModal} />);

    fireEvent.click(container.querySelector("img"));

    expect(toggleModal.mock.calls.length).toBe(1);
});

test("renders img with src set to default.png when no url prop is present", () => {
    const { container } = render(<ProfilePic />);

    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/default.png"
    );
});
