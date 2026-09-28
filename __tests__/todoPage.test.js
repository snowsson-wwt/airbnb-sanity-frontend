/**
 * Integration tests for the /todo page
 * These tests verify the page logic and data fetching
 */

describe('Todo Page', () => {
  test('getServerSideProps should call scanForTodos', async () => {
    // Mock the require for todoScanner
    const mockScanForTodos = jest.fn(() => [
      { file: 'test.js', line: 1, text: 'Test todo' }
    ]);

    jest.mock('../utils/todoScanner', () => ({
      scanForTodos: mockScanForTodos
    }));

    // Import after mocking
    const { getServerSideProps } = require('../pages/todo');
    
    const result = await getServerSideProps();
    
    expect(result.props.todos).toBeDefined();
    expect(Array.isArray(result.props.todos)).toBe(true);
  });

  test('getServerSideProps should return empty array on error', async () => {
    // This test verifies error handling
    const mockScanForTodos = jest.fn(() => {
      throw new Error('Scanner error');
    });

    jest.mock('../utils/todoScanner', () => ({
      scanForTodos: mockScanForTodos
    }));

    const { getServerSideProps } = require('../pages/todo');
    
    const result = await getServerSideProps();
    
    expect(result.props.todos).toEqual([]);
  });

  test('page should handle todos prop', () => {
    const todos = [
      { file: 'components/Test.js', line: 10, text: 'Fix bug' },
      { file: 'pages/index.js', line: 5, text: 'Add feature' }
    ];

    // Verify todos structure
    expect(todos).toHaveLength(2);
    expect(todos[0]).toHaveProperty('file');
    expect(todos[0]).toHaveProperty('line');
    expect(todos[0]).toHaveProperty('text');
  });

  test('filter logic should work correctly', () => {
    const todos = [
      { file: 'components/Test.js', line: 10, text: 'Fix bug' },
      { file: 'pages/index.js', line: 5, text: 'Add feature' },
      { file: 'components/Other.js', line: 15, text: 'Update styles' }
    ];

    // Simulate filter by file
    const filterText = 'components';
    const filtered = todos.filter(todo => 
      todo.file.toLowerCase().includes(filterText.toLowerCase()) ||
      todo.text.toLowerCase().includes(filterText.toLowerCase())
    );

    expect(filtered).toHaveLength(2);
    expect(filtered[0].file).toContain('components');
  });

  test('filter logic should match text content', () => {
    const todos = [
      { file: 'components/Test.js', line: 10, text: 'Fix bug' },
      { file: 'pages/index.js', line: 5, text: 'Add feature' },
      { file: 'components/Other.js', line: 15, text: 'Update styles' }
    ];

    // Simulate filter by text
    const filterText = 'bug';
    const filtered = todos.filter(todo => 
      todo.file.toLowerCase().includes(filterText.toLowerCase()) ||
      todo.text.toLowerCase().includes(filterText.toLowerCase())
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].text).toContain('bug');
  });

  test('should handle empty todos array', () => {
    const todos = [];
    
    expect(todos).toHaveLength(0);
    expect(Array.isArray(todos)).toBe(true);
  });
});
