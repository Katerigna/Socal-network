import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

test("App renders properly", async () => {
    axios.get.mockResolvedValue({
        response: {
            id: 420,
            first: "funky",
            last: "chicken",
            imageurl: "/funchicken.png",
            bio: "Wife. Mom. Blogger"
        }
    });

    const { container } = render(<App />);

    expect(container.children.length).toBe(3);

    console.log("container before: ", container.innerHTML);

    await waitForElement(() => {
        container.querySelector("div");
    });

    console.log("container after: ", container.innerHTML);

    expect(container.firstChild.tagName).toBe("DIV");
});
