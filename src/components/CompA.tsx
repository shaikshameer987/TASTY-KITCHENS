import { useState, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";

const CompA = () => {
  const [name, setName] = useState<string>("");
  const { state: user, dispatch } = useContext(UserContext);
  return (
    <div>
      <h3>Component A</h3>
      <p>{user.name}</p>
      <p>{user.gender}</p>
      <input
        type={"text"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: "nameChange", payload: name });
          setName("");
        }}
      >
        Change Name
      </button>
    </div>
  );
};

export default CompA;
