import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button className="mb-2 mr-4" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
      <Button className="mb-2 mr-4" onClick={() => loginWithRedirect()}>
        Register
      </Button>
    </div>
  );
};

export default LoginButton;
