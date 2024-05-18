import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "antd";
import axios from "utils/Request";
import type { Draft, User } from "share/types";

const User: React.FC = () => {
  const [draftList, setDraftList] = useState<Draft[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleFetchDrafts();
  }, []);
  const handleFetchDrafts = () => {
    axios
      .get("/user/query?id=4433a7d3-133e-4163-8b14-62ce3ea236b3")
      .then((data: User) => {
        setDraftList(data.drafts);
      });
  };
  const handleOpenDraft = (id: string) => {
    navigate(`/workspace?id=${id}`)
  }
  return (
    <div>
      {draftList.map((item) => (
        <Button onClick={()=>handleOpenDraft(item.id)} key={item.id}>{item.name}</Button>
      ))}
    </div>
  );
};
export default User;
