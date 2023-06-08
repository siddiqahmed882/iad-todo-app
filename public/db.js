const BASE_URL = 'http://localhost:4000/api/tasks';

export const getDataFromDb = async (url) => {
  try {
    const response = await fetch(BASE_URL + url);
    console.log(response);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    if (response.status === 204) {
      return null;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postDataToDb = async (url, body) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDataFromDb = async (url) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export const updateDataInDb = async (url, body) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
