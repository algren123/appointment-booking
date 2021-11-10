import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default withApiAuthRequired(async function roles(req, res) {
  const userId = '109343971402214703092';

  try {
    const { accessToken } = await getAccessToken(req, res);
    console.log(accessToken);
    const role = await fetch(
      `https://dev-b8487wjz.us.auth0.com/api/v2/users/${userId}/roles`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user_metadata = await role.json();
    console.log(user_metadata);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
});
