import { useState, useEffect } from 'react'

const TodoPage = ({ todos }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>TODO Comments in Codebase</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Found {todos.length} TODO comment{todos.length !== 1 ? 's' : ''} across the project
      </p>
      
      {todos.length === 0 ? (
        <p>No TODO comments found in the codebase.</p>
      ) : (
        <div>
          {todos.map((todo, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.9rem', 
                color: '#0066cc',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                {todo.file}:{todo.line}
              </div>
              <div style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.95rem',
                padding: '0.5rem',
                backgroundColor: '#fff',
                borderLeft: '3px solid #ff6b6b',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {todo.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const fs = require('fs')
  const path = require('path')
  
  const todos = []
  
  // Function to recursively search for TODO comments
  const searchDirectory = (dir, baseDir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      // Skip node_modules, .git, .next, and other non-source directories
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', '.next', 'public', 'images', 'styles'].includes(entry.name)) {
          searchDirectory(fullPath, baseDir)
        }
      } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8')
          const lines = content.split('\n')
          
          lines.forEach((line, lineIndex) => {
            // Match TODO comments in various formats
            const todoMatch = line.match(/\/\/\s*TODO:?\s*(.+)/i) || 
                            line.match(/\/\*\s*TODO:?\s*(.+?)\*\//i)
            
            if (todoMatch) {
              const relativePath = path.relative(baseDir, fullPath)
              todos.push({
                file: relativePath,
                line: lineIndex + 1,
                text: todoMatch[1].trim()
              })
            }
          })
        } catch (err) {
          // Skip files that can't be read
          console.error(`Error reading ${fullPath}:`, err)
        }
      }
    }
  }
  
  // Start search from project root
  const projectRoot = process.cwd()
  searchDirectory(projectRoot, projectRoot)
  
  // Sort by file path for consistent display
  todos.sort((a, b) => {
    if (a.file === b.file) {
      return a.line - b.line
    }
    return a.file.localeCompare(b.file)
  })
  
  return {
    props: {
      todos
    }
  }
}

export default TodoPage
