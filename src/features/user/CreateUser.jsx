import { useState } from "react";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
function CreateUser() {
  const userName = useSelector((state) => state.user.userName);
  const [Name, setName] = useState("");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(Name));
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        defaultValue={userName}
        onChange={(e) => setName(e.target.value)}
        className="mb-8 w-72 border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {userName !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
