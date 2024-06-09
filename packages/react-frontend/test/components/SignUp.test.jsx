import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SignUp from "../../src/components/SignUp";

jest.mock("axios");

describe("SignUp Component", () => {
  test("renders SignUp component correctly", async () => {
    const { findByLabelText, findByText, findAllByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    await findByLabelText(/username/i);
    await findByLabelText(/email/i);
    await findByLabelText(/password/i);
    await findAllByText(/sign up/i);
  });

  test("handles user input and sign-up process", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User registered successfully" },
    });

    const { findByLabelText, findByTestId, findByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(await findByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(await findByLabelText(/email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(await findByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(await findByTestId("signup-button"));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "https://cp-backend-90532c6e461f.herokuapp.com/auth/signup",
        {
          username: "testuser",
          email: "testuser@example.com",
          password: "password",
        },
      ),
    );

    await findByText("Sign In");
  });

  test("handles sign-up error with response", async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: "Username or email already exists" } },
    });

    const { findByLabelText, findByTestId, findByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(await findByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(await findByLabelText(/email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(await findByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(await findByTestId("signup-button"));

    await findByText("Username or email already exists");
  });

  test("handles sign-up error without response", async () => {
    axios.post.mockRejectedValue(
      new Error("An error occurred while signing up."),
    );

    const { findByLabelText, findByTestId, findByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(await findByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(await findByLabelText(/email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(await findByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(await findByTestId("signup-button"));

    await findByText("An error occurred while signing up.");
  });
});
