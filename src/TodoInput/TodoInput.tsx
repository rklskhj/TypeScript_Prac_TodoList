import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
import { FaPen } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { inputState, ITodoTypes, todosState } from "../store/todo";
import "./TodoInput.scss";

const TodoInput = (): JSX.Element => {
  const [contents, setContents] = useRecoilState<string>(inputState);
  const todos = useRecoilValue<ITodoTypes[]>(todosState);
  const setTodos = useSetRecoilState<ITodoTypes[]>(todosState);
  // useRecoilValue = get 변수
  // useSetRecoilState = setter 지정
  // 위와 같은 형식으로 get과 setter를 분리하여 사용하는 방법도 있습니다.

  const addTodo = useCallback((): void => {
    if (!contents.trim()) {
      //빈칸 입력 방지 .trim()
      return;
    }
    const nextId: number =
      todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    // 배열에 값이 존재할시, 고유값은 마지막 인덱스에 위치한 id값에서 1을 늘려줘서 고유값 생성.
    //만약 값이 존재하지 않을시 초기값은 0

    const todo: ITodoTypes = {
      id: nextId,
      contents,
      isCompleted: false,
    };
    setTodos([...todos, todo]);
    // 기존 객체들 복사 및 새로운 객체 추가

    setContents("");
  }, [contents, setContents, setTodos, todos]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setContents(value);
    },
    [setContents]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  return (
    <div className="TodoInput">
      <input
        type="text"
        className="TodoInput-Input"
        value={contents}
        onChange={onChange}
        placeholder="Todo를 입력해보세요!"
        onKeyDown={onKeyDown}
      />
      <FaPen className="TodoInput-Button" onClick={addTodo} />
    </div>
  );
};

export default TodoInput;
