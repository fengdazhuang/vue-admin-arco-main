const isLogin = () => {
  return !!localStorage.getItem('token');
};
const isVolunteerLogin = () => {
  return !!localStorage.getItem('volunteertoken');
};
const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};
const setVolunteerToken = (token:string)=>{
  localStorage.setItem('volunteertoken',token)
}

const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('volunteertoken');
};

export { isLogin,isVolunteerLogin, getToken, setToken, clearToken,setVolunteerToken };
