<template>
  <div class="nav">
    <div class="nav-content">
      <el-row :gutter="20">
        <el-col :span="3">
          <router-link to="/">
            <img class="logo" src="../assets/logo.jpeg" alt="logo" />
          </router-link>
        </el-col>
        <el-col :span="16">
          <el-menu :default-active="store.navIndex" :router="true" active-text-color="#409EFF" class="el-menu-demo"
            mode="horizontal">
            <el-menuItem v-for="r in store.navs" :key="r.index" :index="r.index" :route="r.path">
              {{ r.name }}
            </el-menuItem>
          </el-menu>
        </el-col>
        <el-col v-if="store.user.id > 0" :span="5">
          <div class="nav-right">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ store.user.nickname ? store.user.nickname : store.user.username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <img v-if="!store.user.avatar" alt="avatar" class="user-img" src="../assets/user.png" />
              <img v-if="store.user.avatar" :src="store.user.avatar" alt="avatar" class="user-img" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick('')">登 出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
        <el-col v-else :span="4">
          <div class="nav-right" v-if="!(store.user.id > 0)">
            <el-button size="small" type="primary" @click="handleClick('login')">
              登 录</el-button>
            <el-button size="small" type="danger" @click="handleClick('register')">
              注 册
            </el-button>
          </div>
          <RegisterAndLogin :handle-flag="state.handleFlag" :visible="state.visible" @ok="handleOk"
            @cancel="handleCancel" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useStore } from '../store'
import RegisterAndLogin from "./RegisterAndLogin.vue";
import { logout } from "../api/service";
import { useRoute } from "vue-router";

const store = useStore();
const state = reactive({
  handleFlag: "",
  visible: false,
  title: "主页",
});
const route = useRoute();

//局部监听路由变化，能否改到router守卫上
const routeChange = (newRoute: any, oldRoute: any): void => {
  for (let i = 0; i < store.navs.length; i++) {
    const l = store.navs[i];
    if (l.path === newRoute.path) {
      state.title = l.name;
      store.setNavIndex(l.index);
      return;
    }
  }
  store.setNavIndex("-1");
};

watch(() => route,
  (val: any, oldVal: any) => routeChange(val, oldVal),
  { immediate: true, }
);

const handleClick = async (path: string) => {
  if (["login", "register"].includes(path)) {
    state.handleFlag = path;
    state.visible = true;
  } else {
    await logout();
    window.sessionStorage.userInfo = "";
    store.clearUser();
  }
};

const handleOk = (value: boolean): void => {
  state.visible = value;
};

const handleCancel = (value: boolean): void => {
  state.visible = value;
};
</script>

<style lang="less">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #fff;

  .nav-content {
    width: 1200px;
    margin: 0 auto;
  }

  .logo {
    height: 50px;
    margin: 0;
    border-radius: 50%;
    margin-top: 5px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu--horizontal>.el-menu-item {
    cursor: pointer;
    color: #333;
  }

  .nav-right {
    position: relative;
    padding-top: 15px;
    text-align: right;

    .el-dropdown {
      cursor: pointer;
      padding-right: 60px;
    }

    .user-img {
      position: absolute;
      top: -15px;
      right: 0;
      width: 50px;
      border-radius: 50%;
    }
  }
}
</style>
