const { useState, useEffect, useContext, useRef } = React;

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();


const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    },

    [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: Math.floor(Math.random() * 10), name: name, complete: false }]
    })
    todoNameRef.current.value = null; 
  }

  function handleClearTodos() {
    const newTodoList = [...todos]
    const filtered = newTodoList.filter(x => !x.complete)
    setTodos(filtered)
  }


  return (
    <>
    <TodoList todos = {todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type='text' />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{(todos.filter(x => !x.complete)).length} left to do</div>
    </>
  )
}

const TodoList = ({todos, toggleTodo}) => {
  return (
  todos.map(todo => {return <Todo toggleTodo={toggleTodo} key={todo.id} todo={todo}/>}
  ))
}

const Todo = ({todo, toggleTodo}) => {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type='checkbox' checked={todo.complete} onChange={handleTodoClick}></input>
        {todo.name}
      </label>
    </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
