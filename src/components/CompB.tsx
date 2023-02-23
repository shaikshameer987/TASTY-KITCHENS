import { useState, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";

const CompB: React.FC = () => {
  const [gender, setGender] = useState<string>("");
  const { state: user, dispatch } = useContext(UserContext);
  return (
    <div>
      <h3>Component B</h3>
      <p>{user.name}</p>
      <p>{user.gender}</p>
      <input
        type={"text"}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: "genderChange", payload: gender });
          setGender("");
        }}
      >
        Change Gender
      </button>
    </div>
  );
};

export default CompB;
