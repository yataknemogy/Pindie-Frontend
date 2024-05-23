
export const getData = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const normalizeDataObject = (obj) => {
  let str = JSON.stringify(obj)

  str = str.replaceAll('_id', 'id');
  const newObj = JSON.parse(str)
  const result = { ...newObj, category: newObj.categories }
  return result;
}

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};

export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const getNormalizedGameDataByCategory = async (url, category) => {
  const data = await getData(`${url}?categories.name=${category}`);
  return isResponseOk(data) ? normalizeData(data) : data;
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status > 399) {
      throw new Error("Ошибка авторизации");
    }

    const result = await response.json();
    return result;
  } 
  
  catch (error) {
    return error;
  }
};

export const getMyJWT = async (url, jwt) => {
  try{
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if(response.status > 399){
      throw new Error ("Ошибка получения данных");
    }

    const result = await response.json();
    return result;
  }
  catch(error){
    return error;
  }
}

export const vote  = async (url, jwt, usersArray) =>{
  try{
      const response = await fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,},
        body: JSON.stringify({users_permissions_users: usersArray}),
      });
      
    if(response.status >399){
      throw new Error ("Ошибка голосования");
    }

    const result = await response.json();
    return result;
  }
  catch(error){
    return error;
  }
}

export const setJWT = (jwt) =>{
  localStorage.setItem("jwt", jwt);
}

export const getJWT = () =>{
  return localStorage.getItem("jwt");
}

export const removeJWT= () =>{
  localStorage.removeItem("jwt");
}

export const checkIfUserVoted = (game, userId) =>{
  return game.users.find((user)=> user.id ===userId);
}