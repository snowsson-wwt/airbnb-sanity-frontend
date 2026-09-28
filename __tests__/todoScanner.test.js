const fs = require('fs');
const path = require('path');
const { scanForTodos } = require('../utils/todoScanner');

describe('todoScanner', () => {
  let testDir;

  beforeEach(() => {
    // Create a temporary test directory
    testDir = path.join(__dirname, 'test-fixtures');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test('should find TODO comments in JavaScript files', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `
// TODO: Fix this bug
function test() {
  // TODO: Implement feature
  return true;
}
    `);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(2);
    expect(todos[0].text).toBe('Fix this bug');
    expect(todos[1].text).toBe('Implement feature');
    expect(todos[0].line).toBe(2);
  });

  test('should find TODO comments with colons', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO: Add validation here`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Add validation here');
  });

  test('should find TODO comments without colons', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO Refactor this code`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Refactor this code');
  });

  test('should find TODO comments in CSS files', () => {
    const testFile = path.join(testDir, 'test.css');
    fs.writeFileSync(testFile, `
/* TODO: Update color scheme */
.button {
  color: red;
}
    `);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Update color scheme');
  });

  test('should find TODO comments in markdown files', () => {
    const testFile = path.join(testDir, 'test.md');
    fs.writeFileSync(testFile, `
# Title
<!-- TODO: Add more documentation -->
Content here
    `);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toContain('Add more documentation');
  });

  test('should skip node_modules directory', () => {
    const nodeModulesDir = path.join(testDir, 'node_modules');
    fs.mkdirSync(nodeModulesDir);
    
    const testFile = path.join(nodeModulesDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO: This should be ignored`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(0);
  });

  test('should skip .next directory', () => {
    const nextDir = path.join(testDir, '.next');
    fs.mkdirSync(nextDir);
    
    const testFile = path.join(nextDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO: This should be ignored`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(0);
  });

  test('should handle files with no TODOs', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `
function test() {
  return true;
}
    `);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(0);
  });

  test('should return relative file paths', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO: Test relative path`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].file).not.toMatch(/^\\/|^[A-Z]:\\/);
    expect(typeof todos[0].file).toBe('string');
  });

  test('should handle nested directories', () => {
    const nestedDir = path.join(testDir, 'nested', 'deep');
    fs.mkdirSync(nestedDir, { recursive: true });
    
    const testFile = path.join(nestedDir, 'test.js');
    fs.writeFileSync(testFile, `// TODO: Nested todo`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Nested todo');
  });

  test('should be case insensitive for TODO keyword', () => {
    const testFile = path.join(testDir, 'test.js');
    fs.writeFileSync(testFile, `
// todo: lowercase
// TODO: uppercase
// Todo: mixed case
    `);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(3);
  });

  test('should handle empty directories gracefully', () => {
    const emptyDir = path.join(testDir, 'empty');
    fs.mkdirSync(emptyDir);

    const todos = scanForTodos(testDir);
    
    expect(todos).toEqual([]);
  });

  test('should only scan valid file extensions', () => {
    fs.writeFileSync(path.join(testDir, 'test.js'), `// TODO: Include this`);
    fs.writeFileSync(path.join(testDir, 'test.txt'), `// TODO: Exclude this`);
    fs.writeFileSync(path.join(testDir, 'test.json'), `// TODO: Exclude this`);

    const todos = scanForTodos(testDir);
    
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Include this');
  });
});
