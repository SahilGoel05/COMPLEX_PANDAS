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

        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        fireEvent.click(await findByTestId('signin-button'));

        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/auth/signin', {
            username: 'testuser',
            password: 'password'
        }));

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

        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(await findByTestId('signin-button'));

        await findByText('Invalid credentials');
    });

    test('handles sign-in error without response', async () => {
        axios.post.mockRejectedValue(new Error('An error occurred while signing in.'));

        const { findByLabelText, findByTestId, findByText } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        fireEvent.change(await findByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(await findByLabelText(/password/i), { target: { value: 'password' } });

        fireEvent.click(await findByTestId('signin-button'));

        await findByText('An error occurred while signing in.');
    });

    test('displays tooltip message when user is registered successfully', async () => {
        const { findByText } = render(
            <MemoryRouter initialEntries={['/signin?signup=success']}>
                <SignIn />
            </MemoryRouter>
        );

        await findByText('User registered successfully');
    });
});
