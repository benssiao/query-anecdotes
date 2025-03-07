import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

async function getAll() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(baseUrl);
      resolve(response.data);
    }, 0);
  });
}

async function createNewAnecdote(anecdote) {
  console.log(anecdote);
  const response = await axios.post(baseUrl, {
    content: anecdote,
    votes: 0,
  });
  return response.data;
}

async function updateAnecdote(id, updatedAnecdote) {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response;
}

export { getAll, createNewAnecdote, updateAnecdote };
