// packages/react-frontend/test/components/CategorySidenav.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategorySidenav from '../../src/components/CategorySidenav';
import axios from 'axios';

jest.mock('axios');

describe('CategorySidenav Component', () => {
    const mockCategories = [
        { _id: '1', name: 'Work' },
        { _id: '2', name: 'Personal' },
    ];

    const mockFetchCategories = jest.fn().mockResolvedValue({ data: mockCategories });
    const mockSetSelectedCategory = jest.fn();

    beforeEach(() => {
        axios.get.mockImplementation(mockFetchCategories);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders CategorySidenav component correctly', async () => {
        const { findByText, findByTestId } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        await findByText('Categories');
        await findByTestId('all-tasks-button');
    });

    test('fetches categories on mount', async () => {
        render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        await waitFor(() => expect(mockFetchCategories).toHaveBeenCalled());
    });

    test('handles adding a new category', async () => {
        axios.post.mockResolvedValueOnce({ data: { _id: '3', name: 'New Category' } });

        const { findByText, findByPlaceholderText, findByTestId } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('add-category-button'));
        fireEvent.change(await findByPlaceholderText('Enter new category name'), { target: { value: 'New Category' } });
        fireEvent.click(await findByText('Confirm'));

        await waitFor(() => expect(mockFetchCategories).toHaveBeenCalled());
    });

    test('handles deleting a category', async () => {
        axios.delete.mockResolvedValueOnce({ data: { _id: '1', name: 'Work' } });

        const { findByText, findByTestId } = render(
            <CategorySidenav categories={mockCategories} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('delete-category-1'));

        fireEvent.click(await findByText('Confirm'));

        await waitFor(() => expect(mockFetchCategories).toHaveBeenCalled());
    });

    test('displays "No categories yet!" message when there are no categories', async () => {
        const { findByTestId } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        await findByTestId('no-categories-message');
    });

    test('handles selecting a category', async () => {
        const { findByTestId } = render(
            <CategorySidenav categories={mockCategories} setSelectedCategory={mockSetSelectedCategory} selectedCategory="1" />
        );

        fireEvent.click(await findByTestId('category-button-2'));

        await waitFor(() => expect(mockSetSelectedCategory).toHaveBeenCalledWith('2'));
    });

    test('handles error while adding a category with existing name', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { error: 'Category name already exists.' } }
        });

        const { findByText, findByPlaceholderText, findByTestId } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('add-category-button'));
        fireEvent.change(await findByPlaceholderText('Enter new category name'), { target: { value: 'Work' } });
        fireEvent.click(await findByText('Confirm'));

        await findByText('Category name already exists.');
    });

    test('handles error while deleting a category', async () => {
        axios.delete.mockRejectedValueOnce(new Error('Error deleting category'));

        const { findByText, findByTestId } = render(
            <CategorySidenav categories={mockCategories} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('delete-category-1'));

        fireEvent.click(await findByText('Confirm'));

        await waitFor(() => expect(mockFetchCategories).toHaveBeenCalled());
    });

    test('handles empty category name input', async () => {
        const { findByText, findByPlaceholderText, findByTestId } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('add-category-button'));
        fireEvent.change(await findByPlaceholderText('Enter new category name'), { target: { value: '' } });
        fireEvent.click(await findByText('Confirm'));

        await findByText('Category name is required.');
    });

    test('cancels adding a new category', async () => {
        const { findByText, findByPlaceholderText, findByTestId, queryByPlaceholderText } = render(
            <CategorySidenav categories={[]} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('add-category-button'));
        fireEvent.change(await findByPlaceholderText('Enter new category name'), { target: { value: 'New Category' } });

        fireEvent.click(await findByText('Cancel'));

        await waitFor(() => expect(queryByPlaceholderText('Enter new category name')).toBeNull());
    });

    test('cancels deleting a category', async () => {
        const { findByText, findByTestId, queryByText } = render(
            <CategorySidenav categories={mockCategories} setSelectedCategory={jest.fn()} selectedCategory="all" />
        );

        fireEvent.click(await findByTestId('delete-category-1'));

        fireEvent.click(await findByText('Cancel'));

        await waitFor(() => expect(queryByText('Are you sure you want to delete this category and all its tasks?')).toBeNull());
    });
});
