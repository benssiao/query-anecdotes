import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAll,
  createNewAnecdote,
  updateAnecdote,
} from "../../services/anecdotes";
import LoadingSpinner from "./LoadingSpinner";
import NotificationContext from "../contexts/NotificationContext";
import { useContext } from "react";
import Notification from "./Notification";
import { useState } from "react";
const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");
  const [notification, dispatchNotification] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    newAnecdoteMutation.mutate(newAnecdote);
    dispatchNotification({ type: "ADDED", payload: newAnecdote });
    setNewAnecdote("");
    setTimeout(() => {
      dispatchNotification({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      {newAnecdoteMutation.isPending && <LoadingSpinner />}
      <form>
        <input
          onChange={(e) => {
            setNewAnecdote(e.target.value);
          }}
          value={newAnecdote}
        />
        <button onClick={onCreate} type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
