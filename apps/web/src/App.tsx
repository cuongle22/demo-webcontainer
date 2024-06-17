import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";

const App = () => {
  interface User {
    id: number;
    name: string;
    age: number;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        age: parseInt(age, 10),
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h3 className="uppercase">Users</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="mt-1 mb-4 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add User
        </button>
      </form>
      <ul className="mt-6 list-disc list-inside">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
          >
            {`${user.name} (${user.age})`}
            <DeleteIcon
              className="text-sm"
              onClick={() => handleDelete(user.id)}
              style={{ cursor: "pointer", color: "red", fontSize: "18px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
