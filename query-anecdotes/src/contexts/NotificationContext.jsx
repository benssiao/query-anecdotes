import { createContext, useReducer } from "react";

function notificationReducer(state, action) {
  switch (action.type) {
    case "CLEAR":
      return "";
    case "VOTE":
      return `voted on '${action.payload}'`;
    case "ADDED":
      return `added '${action.payload}'`;
    case "ERROR": {
      const errorResponse = action.payload.response;
      if (errorResponse.status === 400)
        return `anecdote is too short, must have length 5 or more`;
    }
  }
}

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
