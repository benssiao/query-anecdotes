import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import LoadingSpinner from "./components/LoadingSpinner";
import NotificationContext from "./contexts/NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import {
  getAll,
  createNewAnecdote,
  updateAnecdote,
} from "../services/anecdotes";

const App = () => {
  const queryClient = useQueryClient();
  const [notification, dispatchNotification] = useContext(NotificationContext);

  async function incrementLikes(id) {
    const anecdotes = await queryClient.getQueryData(["anecdotes"]);
    const anecdoteToUpdate = anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };
    return updateAnecdote(anecdoteToUpdate.id, updatedAnecdote);
  }

  const handleVote = (anecdote) => {
    incrementLikesMutation.mutate(anecdote.id);
    dispatchNotification({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => {
      dispatchNotification({ type: "CLEAR" });
    }, 5000);
  };

  const incrementLikesMutation = useMutation({
    mutationFn: incrementLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });
  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      {incrementLikesMutation.isPending && <LoadingSpinner />}

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
