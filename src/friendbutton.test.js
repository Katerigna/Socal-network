import React from "react";
import FriendButton from "./friendbutton";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

test("renders fine when no props passed", () => {
    const { container } = render(<FriendButton />);

    expect(container.querySelector("button").innerHTML).toBe("Add Friend");
});

test("renders fine when props passed", () => {
    const { container } = render(<FriendButton id="57" />);

    expect(container.querySelector("button").innerHTML).toBe("Add Friend");
});

test("gets user info based on id passed as props", async () => {
    axios.get.mockResolvedValue({
        response: {
            id: 57,
            first: "funky",
            last: "chicken",
            imageurl: "/funchicken.png",
            bio: "Wife. Mom. Blogger"
        }
    });

    const { container } = render(<FriendButton id="57" />);

    await waitForElement(() => getByText(container, ""));
});
