import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

export default function TodoPage({ todos }) {
  const [filter, setFilter] = useState('');

  const filteredTodos = todos.filter(todo => 
    todo.file.toLowerCase().includes(filter.toLowerCase()) ||
    todo.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="todo-page">
      <NavBar />
      <div className="todo-container">
        <h1>TODO Comments</h1>
        <p className="todo-description">
          This page shows all TODO comments found in the codebase.
        </p>
        
        <div className="todo-stats">
          <p>Total TODOs: <strong>{todos.length}</strong></p>
        </div>

        <div className="todo-filter">
          <input
            type="text"
            placeholder="Filter by file or text..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
        </div>

        {filteredTodos.length === 0 ? (
          <p className="no-todos">
            {filter ? 'No TODOs match your filter.' : 'No TODO comments found in the codebase.'}
          </p>
        ) : (
          <div className="todo-list">
            {filteredTodos.map((todo, index) => (
              <div key={index} className="todo-item">
                <div className="todo-file">
                  {todo.file}:<span className="todo-line">{todo.line}</span>
                </div>
                <div className="todo-text">{todo.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .todo-page {
          min-height: 100vh;
          background: #f7f7f7;
        }

        .todo-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #222;
        }

        .todo-description {
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .todo-stats {
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .todo-stats p {
          margin: 0;
          font-size: 1rem;
          color: #555;
        }

        .todo-stats strong {
          color: #FF385C;
          font-size: 1.2rem;
        }

        .todo-filter {
          margin-bottom: 30px;
        }

        .filter-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.2s;
        }

        .filter-input:focus {
          outline: none;
          border-color: #FF385C;
        }

        .todo-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .todo-item {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #FF385C;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .todo-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .todo-file {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .todo-line {
          color: #FF385C;
          margin-left: 5px;
        }

        .todo-text {
          font-size: 1rem;
          color: #222;
          line-height: 1.5;
        }

        .no-todos {
          text-align: center;
          padding: 60px 20px;
          color: #999;
          font-size: 1.1rem;
          background: white;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .todo-container {
            padding: 20px 15px;
          }

          h1 {
            font-size: 2rem;
          }

          .todo-item {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { scanForTodos } = require('../utils/todoScanner');
  
  try {
    const todos = scanForTodos();
    
    return {
      props: {
        todos,
      },
    };
  } catch (error) {
    console.error('Error scanning for TODOs:', error);
    return {
      props: {
        todos: [],
      },
    };
  }
}
