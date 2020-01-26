import axios from "axios"

export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
    const currentUser = store.state.currentUser;

    if(requiresAuth && !currentUser) {
      next('/login');
    } else if(to.path == '/login' && currentUser) {
      next('/');
    } else {
      next();
    }
  });

  axios.interceptors.response.use(null, error => {
    if(error.response.status === 401) {
      store.commit('logout');
      router.push('/login');
    }

    return Promise.reject(error)
  });
  
  if (store.getters.currentUser) {
    setAuthorization(store.getters.currentUser.token);
  }
}

export function setAuthorization(token) {
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
}

export function login(credentials) {
  return new Promise((res, rej) => {
    axios.post('/api/auth/login', credentials)
      .then(response => {
        setAuthorization(response.data.access_token);

        res(response.data);
      })
      .catch(err => {
        rej("Wrong email or password !!");
      });
  })
}

export function getLocalUser() {
  const userStr = localStorage.getItem('user');

  if(!userStr) {
    return null;
  }

  return JSON.parse(userStr);
}