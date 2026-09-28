/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import TodoPage from '../pages/todo'

describe('TodoPage', () => {
  it('renders the TODO page heading', () => {
    const todos = []
    const { container } = render(<TodoPage todos={todos} />)
    
    const heading = container.querySelector('h1')
    expect(heading).toBeTruthy()
    expect(heading.textContent).toBe('TODO Comments in Codebase')
  })

  it('displays message when no TODOs are found', () => {
    const todos = []
    const { container } = render(<TodoPage todos={todos} />)
    
    const text = container.textContent
    expect(text).toContain('No TODO comments found')
  })

  it('displays TODO count correctly', () => {
    const todos = [
      { file: 'utils.js', line: 1, text: 'Add proper pluralization' },
      { file: 'components/DashboardMap.js', line: 10, text: 'Remove duplicate console.log' }
    ]
    const { container } = render(<TodoPage todos={todos} />)
    
    const text = container.textContent
    expect(text).toContain('Found 2 TODO comments')
  })

  it('displays TODO items with file, line, and text', () => {
    const todos = [
      { file: 'utils.js', line: 1, text: 'Add proper pluralization' }
    ]
    const { container } = render(<TodoPage todos={todos} />)
    
    const text = container.textContent
    expect(text).toContain('utils.js:1')
    expect(text).toContain('Add proper pluralization')
  })

  it('handles singular TODO count', () => {
    const todos = [
      { file: 'utils.js', line: 1, text: 'Add proper pluralization' }
    ]
    const { container } = render(<TodoPage todos={todos} />)
    
    const text = container.textContent
    expect(text).toContain('Found 1 TODO comment')
    expect(text).not.toContain('Found 1 TODO comments')
  })
})
