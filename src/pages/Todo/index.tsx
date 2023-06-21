import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface UserProps {
  id: number;
  name: string;
  userId: number;
}

function Todo() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [user, setUser] = useState<UserProps | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({
    id: 0,
    todo: "",
    isCompleted: false,
    userId: 0,
  });

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const api = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: TodoProps = {
      id: todos.length + 1,
      todo: newTodo,
      isCompleted: false,
      userId: user?.userId ?? 0,
    };

    try {
      await api.post("/todos", newTodoItem);
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    try {
      await api.put(
        `/todos/${id}`,
        updatedTodos.find((todo) => todo.id === id)
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (todo: TodoProps) => {
    setEditTodo({
      id: todo.id,
      todo: todo.todo,
      isCompleted: todo.isCompleted,
      userId: todo.userId,
    });
  };

  const cancelEditing = () => {
    setEditTodo({ id: 0, todo: "", isCompleted: false, userId: 0 });
  };

  const saveTodo = async () => {
    if (editTodo.todo.trim() === "") return;

    try {
      await api.put(`/todos/${editTodo.id}`, editTodo);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodo.id) {
          todo.todo = editTodo.todo;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditTodo({ id: 0, todo: "", isCompleted: false, userId: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <h1>To-do List</h1>
      <AddList>
        <input
          type="text"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={addTodo}>
          추가
        </button>
      </AddList>
      <StyledUl>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              className="checkbox"
              onChange={() => toggleComplete(todo.id)}
            />
            {editTodo.id === todo.id ? (
              <>
                <Content>
                  <input
                    type="text"
                    data-testid="modify-input"
                    value={editTodo.todo}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, todo: e.target.value })
                    }
                  />
                </Content>

                <button data-testid="submit-button" onClick={saveTodo}>
                  제출
                </button>
                <button data-testid="cancel-button" onClick={cancelEditing}>
                  취소
                </button>
              </>
            ) : (
              <>
                <Content>
                  <span>{todo.todo}</span>
                </Content>
                <button
                  data-testid="modify-button"
                  onClick={() => startEditing(todo)}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </StyledUl>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 70%;
    font-size: 15px;
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }

  button {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    margin-left: 10px;
  }
`;

const AddList = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
`;

const StyledUl = styled.ul`
  width: 60%;
  margin: 50px 0;
  padding: 0;
  list-style: none;

  li + li {
    margin-top: 10px;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    .checkbox {
      margin: 0 10px;
      width: 15px;
      height: 15px;
    }
  }
`;

const Content = styled.div`
  width: 70%;
  font-size: 15px;

  span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default Todo;
