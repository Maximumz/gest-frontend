import axios from 'axios';
import { server } from "@/helper";

const reqConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
const state = {
  user: [],
  notables: null,
};
const getters = {
  isAuthenticated: state => (state.user !== null && state.user.username),
  StateUser: state => state.user,
};
const actions = {
  async createAccount({dispatch}, data) {
    if (validator.validate(data, false)) {
      await axios.post(`${server.baseURL}/preauth/create`, data, reqConfig)
        .then((response) => {
          // TODO add messaging service
          console.log(response);
        })
        .catch(function (error) {
          // TODO add messaging service
          console.log(error);
        });
        let UserForm = new FormData()
        UserForm.append('username', data.username)
        UserForm.append('password', data.password)
        await dispatch('login', UserForm)
    }
  },
  async login({commit}, User) {
    // if (validator.validate(User)) {
    //   requestPrep.prepare(User);
    //   await axios.post('login', User)
    //   await commit('setUser', User)
    // }
    await commit('setUser', User)
  },
  async createNotable({dispatch}, post) {
    await axios.post('notable', post)
    await dispatch('getNotables')
  },
  async updateNotable({dispatch}, post) {
    await axios.post('notable', post)
    await dispatch('getNotables')
  },
  async deleteNotable({dispatch}, post) {
    await axios.post('notable', post)
    await dispatch('getNotables')
  },
  async getNotables({ commit }) {
    let response = await axios.get('notable')
    commit('setNotables', response.data)
  },
  async logout({commit}) {
    commit('logout', null);
  }
};
const mutations = {
  setUser(state, user) {
      state.user = user
  },
  setNotables(state, posts) {
      state.posts = posts
  },
  logout(state) {
      state.user = null
      state.notables = null
  }
};
const requestPrep = {
  prepare(formData) {
    let params = new URLSearchParams();
    for(let pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }
    return params;
  }
};
const validator = {
  validate(formData, login = true) {
    const regexUsername = /^[a-zA-Z0-9-_]+$/;
    const regexName = /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let validated = false;

    if (formData.username.search(regexUsername) === -1) {
      alert('invalid username');
    } else if (!login && formData.name.search(regexName) === -1) {
      alert('invalid name');
    } else if (!login && formData.email.search(regexEmail) === -1) {
      alert('invalid email');
    } else if (!login && formData.email !== this.confirmEmail) {
      alert('Emails do not match');
    } else if (formData.password.search(regexPass) === -1) {
      alert('invalid password');
    } else if (!login && formData.password !== this.confirmPassword) {
      alert('Passwords do not match');
    } else {
      validated = true;
    }

    return validated;
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
  validator
};
