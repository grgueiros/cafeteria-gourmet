import { test, expect, vi } from 'vitest'
import { render,screen } from '@testing-library/react'
import Button from './button'
import userEvent from '@testing-library/user-event'



test('Button should call on click', async () => {

    const mockCb = vi.fn()
    render(<Button onClick={mockCb}>Teste</Button>)

    const button = screen.getByText('Teste');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(mockCb).toBeCalledTimes(1);
})