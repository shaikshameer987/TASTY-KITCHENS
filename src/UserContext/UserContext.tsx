import { createContext, useReducer } from "react";

interface StateType {
  name: string;
  gender: string;
}

interface ActionType {
  type: string;
  payload: string;
}

interface UserContextType {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: StateType = {
  name: "shameer",
  gender: "male",
};
export const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "nameChange":
      return { ...state, name: action.payload };
    case "genderChange":
      return { ...state, gender: action.payload };
    default:
      return state;
  }
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
