import React,{useState, useEffect} from "react";
import axios from "utils/Request";

const Home: React.FC = () => {
  console.log('111')
  const [username, setUsername] = useState('');  
  useEffect(() => {
    handleFetchA()
  }, []);
  const handleFetchA = () => {
    axios
      .get("/aaa", {
        headers: {
          authorization: String(window.localStorage.getItem("token"))
        }
      })
      .then((res) => {
        setUsername(res?.data?.currentUser?.username);
      })
  };
  return <div>{username}</div>;
};
export default Home;
