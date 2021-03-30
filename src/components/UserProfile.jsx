import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from '../utilities/axiosInstance'

const baseURL = process.env.REACT_APP_DEV_API_URL;

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "https://annowiki.us.auth0.com/api/v2/";

      try {
        console.log("Trying");
        const accessToken = await getAccessTokenSilently({
          audience: domain,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = baseURL + '/users/login';

        axios.post('/users/login',
          user,
          {headers: {Authorization: accessToken}})
          .then(resp => {
            console.log(resp);
            setUserMetadata(resp.data);
          }, error => {
            console.log(error);
          });

      } catch (e) {
        console.log("error");
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};
