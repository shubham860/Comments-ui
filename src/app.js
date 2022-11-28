import React, {useState} from "react";
import { commentsStore } from "./commentsStore";
import CommentsSection from "./components/commentsSection";

const App = () => {
    const { Provider } = commentsStore;
    const [comments, setComments] = useState([]);
    console.log('comments',comments)
  return <Provider value={comments}>
            <CommentsSection setComments={setComments}/>
        </Provider>;
};

export default App;