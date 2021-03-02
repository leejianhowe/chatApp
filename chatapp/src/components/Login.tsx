import React, { useState } from "react";
import { v4 } from "uuid";
type Props = {
  onSubmitId: React.Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<Props> = ({ onSubmitId }: Props) => {
  const [id, setId] = useState("");
  const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (
    event
  ) => {
    event.preventDefault();
    console.log(event);
    onSubmitId(id);
  };
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setId(event.target.value);
  };
  const createNewId = () => [onSubmitId(v4())];
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Id:</label>
          <input
            value={id}
            onChange={handleChange}
            type="text"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={createNewId}
        >
          Create Id
        </button>
      </form>
    </>
  );
};

export default Login;
