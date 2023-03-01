const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }
  async function fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function createThread({ title, body, category }) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function getAllThread() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getDetailThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createComment({ content, commentTo = "" }) {
    const response = await fetch(`${BASE_URL}/threads/${commentTo}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  async function upVoteThread(id) {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId: id,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function downVoteThread(id) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${id}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: id,
        }),
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function neutralizeThreadVote(id) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${id}/neutral-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: id,
        }),
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
  }

  async function upVoteComment({ id, commentId }) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments/${commentId}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: id,
          commentId,
        }),
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    console.log(vote);

    return vote;
  }

  async function downVoteComment({ id, commentId }) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments/${commentId}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: id,
          commentId,
        }),
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    console.log(vote);

    return vote;
  }

  async function neutralizeCommentVote({ id, commentId }) {
    const response = await fetch(
      `${BASE_URL}/threads/${id}/comments/${commentId}/neutral-vote`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          thread: id,
          commentId,
        }),
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function getAllLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllLeaderboards,
    createThread,
    getAllThread,
    neutralizeCommentVote,
    neutralizeThreadVote,
    upVoteComment,
    upVoteThread,
    downVoteComment,
    downVoteThread,
    createComment,
    getDetailThread,
  };
})();

export default api;
