import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import LoginButton from "./Auth0/LoginButton";
import LogoutButton from "./Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Container className="my-4">
      {isAuthenticated && (
        <span className="mr-6">
          Welcome, {user.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      )}
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      <br />
      <br />
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <img src={require("./loader.gif")} alt="Loading" width="100" />
      )}
      {error && <h1>error, refreshing page: {error}</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
