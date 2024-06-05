import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import SignIn from '../../src/components/SignIn';

jest.mock('axios');

describe('SignIn Component', () => {
    test('renders SignIn component correctly', async () => {
        const { findByLabelText, findByText, findAllByText } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Check if the sign-in form is rendered
        await findByLabelText(/username/i)
        await findByLabelText(/password/i)
        await findAllByText(/sign in/i)
    });

    test('handles user input and sign-in process', async () => {
        axios.post.mockResolvedValue({ data: { token: 'testtoken' } });

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        // Simulate sign-in button click
        fireEvent.click(await findByTestId('signin-button'));

        // Check if the axios post request is made with correct data
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/auth/signin', {
            username: 'testuser',
            password: 'password'
        }));

        // Check if the token is stored in localStorage
        expect(localStorage.getItem('token')).toBe('testtoken');
    });

    test('handles sign-in error with response', async () => {
        axios.post.mockRejectedValue({
            response: { data: { error: 'Invalid credentials' } }
        });

        const { findByLabelText, findByText, findByTestId } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'wrongpassword' } });

        // Simulate sign-in button click
        fireEvent.click(await findByTestId('signin-button'));

        // Check if the error message is displayed
        await findByText('Invalid credentials');
    });

    test('handles sign-in error without response', async () => {
        axios.post.mockRejectedValue(new Error('An error occurred while signing in.'));

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        // Simulate sign-in button click
        fireEvent.click(await findByTestId('signin-button'));

        // Check if the fallback error message is displayed
        await findByText('An error occurred while signing in.');
    });

    test('displays tooltip message when user is registered successfully', async () => {
        const { findByText } = render(
            <MemoryRouter initialEntries={['/signin?signup=success']}>
                <SignIn />
            </MemoryRouter>
        );

        // Check if the tooltip message is displayed
        await findByText('User registered successfully');
    });
});
