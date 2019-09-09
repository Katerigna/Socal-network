import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

test("App shows nothing at first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 420,
            first: "funky",
            last: "chicken",
            url: "/funchicken.png"
        }
    });

    const { container } = render(<App />);

    expect(container.children.length).toBe(0);

    console.log("container before: ", container.innerHTML);

    await waitForElement(() => {
        container.querySelector("div");
    });

    console.log("container after: ", container.innerHTML);

    expect(container.firstChild.tagName).toBe("DIV");
});
