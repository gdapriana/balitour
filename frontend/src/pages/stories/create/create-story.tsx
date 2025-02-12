import { useContext } from "react";
import { AuthContext } from "@/provider/auth.tsx";
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authenticated) navigate("/login");
  return <div></div>;
};

export default CreateStory;
