export const TOKEN_KEY = "@Catalogo-Token";
export const EMPRESA_KEY = "@Catalogo-Empresa";
export const LOCAL_KEY = "@Catalogo-Local";
export const NOMEEMPRESA_KEY = "@Catalogo-NomeEmpresa";
export const NOMELOCAL_KEY = "@Catalogo-NomeLocal";
export const NOMEUSUARIO_KEY = "@Catalogo-NomeUsuario";
export const IDUSUARIO_KEY = "@Catalogo-IdUsuario";
export const EMAILUSUARIO_KEY = "@Catalogo-EmailUsuario";
export const MENU_KEY = "@Catalogo-Manu";
export const linkApi = process.env.REACT_APP_PUBLIC_URL || 'https://localhost:7115/';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEmpresa = () => localStorage.getItem(EMPRESA_KEY);
export const getLocal = () => localStorage.getItem(LOCAL_KEY);
export const getNomeEmpresa = () => localStorage.getItem(NOMEEMPRESA_KEY);
export const getNomeLocal = () => localStorage.getItem(NOMELOCAL_KEY);
export const getNomeUsuario = () => localStorage.getItem(NOMEUSUARIO_KEY);
export const getIdUsuario = () => localStorage.getItem(IDUSUARIO_KEY);
export const getEmailUsuario = () => localStorage.getItem(EMAILUSUARIO_KEY);
export const getMenuAberto = () => localStorage.getItem(MENU_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const setEmpresa = empresa => {
  localStorage.setItem(EMPRESA_KEY, empresa);
};
export const setLocal = local => {
  localStorage.setItem(LOCAL_KEY, local);
};
export const setNomeEmpresa = nomeEmpresa => {
  localStorage.setItem(NOMEEMPRESA_KEY, nomeEmpresa);
};
export const setNomeLocal = nomeLocal => {
  localStorage.setItem(NOMELOCAL_KEY, nomeLocal);
};
export const setNomeUsuario = nomeUsuario => {
  localStorage.setItem(NOMEUSUARIO_KEY, nomeUsuario);
};
export const setIdUsuario = idUsuario => {
  localStorage.setItem(IDUSUARIO_KEY, idUsuario);
};
export const setEmailUsuario = emailUsuario => {
  localStorage.setItem(EMAILUSUARIO_KEY, emailUsuario);
};
export const setMenuAberto = menu => {
  localStorage.setItem(MENU_KEY, menu);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMPRESA_KEY);
  localStorage.removeItem(LOCAL_KEY);
  localStorage.removeItem(NOMEEMPRESA_KEY);
  localStorage.removeItem(NOMELOCAL_KEY);
  localStorage.removeItem(NOMEUSUARIO_KEY);
  localStorage.removeItem(IDUSUARIO_KEY);
  localStorage.removeItem(EMAILUSUARIO_KEY);
  localStorage.removeItem(LOCAL_KEY);
  if (window.location.pathname !== '/') window.location = '/';
};

export const getUserInfo = () => {
  let token = localStorage.getItem(TOKEN_KEY);
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

