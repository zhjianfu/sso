<template>
  <div v-if="!isLogin">
    <p>
      用户名： <input type="text" v-model="username" placeholder="用户名" />
    </p>
    <p>
      密码： <input type="password" v-model="password" placeholder="密码" />
    </p>
    <p>
      <button @click="login">登录</button>
    </p>
  </div>
  <div v-else>
    <button @click="loadCustomerInfo">加载用户信息</button>
    <h1>客户信息</h1>
    <div v-if="customerInfo">
      <p>客户ID: {{ customerInfo.id }}</p>
      <p>客户姓名： {{ customerInfo.name }}</p>
      <p>客户年龄： {{ customerInfo.age }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const isLogin = ref(false);
const username = ref("");
const password = ref("");

const customerInfo = ref(null);

onMounted(() => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    isLogin.value = true;
  }
});

const login = async () => {
  if (username.value.length < 5) {
    alert("用户名最少5位");
    return;
  }

  if (password.value.length < 5) {
    alert("用户名最少5位");
    return;
  }

  const { data } = await axios.post("http://localhost:5050/auth/login", {
    username: username.value,
    password: password.value,
  });

  if (data.code == 0) {
    const { access_token, refresh_token } = data.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    isLogin.value = true;
  }

  console.log(data);
};

const loadCustomerInfo = async () => {
  const { data } = await axios({
    url: "http://localhost:8080/api/customer",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    method: "post",
    data: {
      userId: 1,
    },
  });
  console.log(data);
  if (data.code === 0) {
    customerInfo.value = data.data;
    return;
  }

  if (data.code === 2) {
    refreshToken((data) => {
      if (data.code === 2) {
        isLogin.value = false;
        return;
      }

      const { access_token, refresh_token } = data.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      loadCustomerInfo();
    });
  }
};

async function refreshToken(callback) {
  const { data } = await axios({
    url: "http://localhost:5050/auth/refresh",
    method: "post",
    headers: {
      authorization: "Bearer " + localStorage.getItem("refresh_token"),
    },
  });

  callback(data);
}
</script>
