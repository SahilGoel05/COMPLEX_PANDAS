import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import SignUp from '../../src/components/SignUp';

jest.mock('axios');

describe('SignUp Component', () => {
    test('renders SignUp component correctly', async () => {
        const { findByLabelText, findByText, findAllByText } = render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Check if the sign-up form is rendered
        await findByLabelText(/username/i);
        await findByLabelText(/email/i);
        await findByLabelText(/password/i);
        await findAllByText(/sign up/i);
    });

    test('handles user input and sign-up process', async () => {
        axios.post.mockResolvedValue({ data: { message: 'User registered successfully' } });

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        // Simulate sign-up button click
        fireEvent.click(await findByTestId('signup-button'));

        // Check if the axios post request is made with correct data
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/auth/signup', {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password'
        }));

        // Check if the user is navigated to the sign-in page
        await findByText('Sign In');
    });

    test('handles sign-up error with response', async () => {
        axios.post.mockRejectedValue({
            response: { data: { error: 'Username or email already exists' } }
        });

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        // Simulate sign-up button click
        fireEvent.click(await findByTestId('signup-button'));

        // Check if the error message is displayed
        await findByText('Username or email already exists');
    });

    test('handles sign-up error without response', async () => {
        axios.post.mockRejectedValue(new Error('An error occurred while signing up.'));

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        // Simulate sign-up button click
        fireEvent.click(await findByTestId('signup-button'));

        // Check if the fallback error message is displayed
        await findByText('An error occurred while signing up.');
    });
});
