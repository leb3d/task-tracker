import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, set_tasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      return [];
    }
    return [];
  });
  
  const [new_task, set_new_task] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const add_task = (e) => {
    e.preventDefault();
    if (!new_task.trim()) return;
    set_tasks([...tasks, { id: crypto.randomUUID(), text: new_task, completed: false }]);
    set_new_task('');
  };

  const toggle_task = (id) => {
    set_tasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const delete_task = (id) => {
    set_tasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Tracker MVP</h1>
        <form onSubmit={add_task} className="flex gap-2 mb-6">
          <input
            type="text"
            value={new_task}
            onChange={(e) => set_new_task(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Нове завдання..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Додати
          </button>
        </form>
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 border rounded bg-gray-50">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggle_task(task.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => delete_task(task.id)} className="text-red-500 hover:text-red-700">
                Видалити
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <p className="text-center text-gray-500 mt-4">Немає завдань</p>}
      </div>
    </div>
  );
}

export default App;