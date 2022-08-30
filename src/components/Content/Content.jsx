import React, { useEffect, useState } from "react";
import { getToken } from "../../api/token";
import AddUser from "../AddUser/AddUser";
import UsersTable from "../UsersTable/UsersTable";

const Content = () => {
  const [isUserAdded, setIsUserAdded] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken()
      .then(data => setToken(data.token));
  }, []);

  return (
    <>
      <UsersTable newUser={isUserAdded} />
      <AddUser
        addUser={setIsUserAdded}
        token={token}
      />
    </>
  );
};

export default Content;
