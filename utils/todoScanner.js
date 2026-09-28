const fs = require('fs');
const path = require('path');

/**
 * Scans a directory recursively for TODO comments in source files
 * @param {string} dir - Directory to scan
 * @param {Array<string>} fileList - Accumulator for found files
 * @returns {Array<Object>} Array of TODO items with file, line, and text
 */
function scanForTodos(dir = process.cwd(), fileList = []) {
  // Directories and files to skip
  const skipDirs = ['node_modules', '.git', '.next', 'out', 'build', 'dist', 'coverage', 'public'];
  const skipFiles = ['package-lock.json', 'yarn.lock'];
  
  // Extensions to scan
  const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md'];
  
  let todos = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (skipDirs.includes(file) || skipFiles.includes(file)) {
        return;
      }
      
      const filePath = path.join(dir, file);
      let stat;
      
      try {
        stat = fs.statSync(filePath);
      } catch (err) {
        // Skip files we can't stat
        return;
      }
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        todos = todos.concat(scanForTodos(filePath, fileList));
      } else if (stat.isFile()) {
        const ext = path.extname(file);
        
        if (validExtensions.includes(ext)) {
          // Read file and scan for TODO comments
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
              // Match TODO comments in various formats
              // Matches: // TODO, /* TODO, # TODO, <!-- TODO, etc.
              const todoMatch = line.match(/(?:\/\/|\/\*|#|<!--)\s*TODO:?\s*(.+?)(?:\*\/|-->)?$/i);
              
              if (todoMatch) {
                todos.push({
                  file: path.relative(process.cwd(), filePath),
                  line: index + 1,
                  text: todoMatch[1].trim(),
                });
              }
            });
          } catch (err) {
            // Skip files we can't read
            console.error(`Error reading ${filePath}:`, err.message);
          }
        }
      }
    });
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err.message);
  }
  
  return todos;
}

module.exports = { scanForTodos };
