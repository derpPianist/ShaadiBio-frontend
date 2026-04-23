//Here we create a custom fetch function to handle expired tokens

//User tries to navigate --> expired access token detected --> refreshToken endpoint is called --> If access token refreshed, user redirected to requested page else asked to login again

type FetchWithAuthArgs = {
  url: string;
  options?: RequestInit;
  accessToken: string | null;
  refreshAccessToken: () => Promise<string | null>;
};

export const fetchWithAuth = async ({
  url,
  options = {},
  accessToken,
  refreshAccessToken,
}: FetchWithAuthArgs) => {

    let res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        credentials: "include"
    })

    if (res.status === 401){
        const newToken = await refreshAccessToken();

        if(!newToken){
            throw new Error("Session Expired, please login again")
        }

        res = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${newToken}`,
            },
            credentials: "include",
        })
    }

    return res
};
