import React from "react";
import FriendButton from "./friendbutton";
import { render, fireEvent, wait } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

///RENDER BUTTON
test("renders fine when no props passed", () => {
    axios.get.mockResolvedValue({
        data: "Total strangers"
    });

    const { container } = render(<FriendButton />);

    expect(container.querySelector("input").value).toBe("Add Friend");
});

///GET PROPS
test("renders fine when props passed", () => {
    axios.get.mockResolvedValue({
        data: "Total strangers"
    });

    const { container } = render(<FriendButton id="57" />);

    expect(container.querySelector("input").value).toBe("Add Friend");
});

///STATUS OF BUTTON ON REQUEST RECEIVER PAGE
test("Button says 'Accept friend Request' when axios returns friend request on receiver's page", async () => {
    axios.get.mockResolvedValue({
        data: "Incoming friend request detected"
    });

    const { container } = render(<FriendButton id="57" />);

    await wait();

    expect(container.querySelector("input").value).toBe("Accept Request");
});

///STATUS OF BUTTON ON FRIEND'S PAGE
test("Button says 'Unfriend' when axios returns friend on sender's page", async () => {
    axios.get.mockResolvedValue({
        data: "Friend detected"
    });

    const { container } = render(<FriendButton id="57" />);

    await wait();

    expect(container.querySelector("input").value).toBe("Unfriend");
});

///STATUS OF BUTTON ON REQUEST RECEIVER'S PAGE AFTER CLICK
test("Button changes from accept request to unfriend when clicked by friend request receiver", async () => {
    axios.get.mockResolvedValue({
        data: "Incoming friend request detected"
    });
    const { container } = render(<FriendButton value="Accept Request" />);

    const handleFriendStatus = jest.fn();

    axios.get.mockResolvedValue({
        data: "Friend detected"
    });

    fireEvent.click(container.querySelector("input"));

    await wait();

    expect(container.querySelector("input").value).toBe("Unfriend");
});
