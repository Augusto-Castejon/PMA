<template>
  <div class="user-manager">
    <div class="sidebar">
      <UserList @user-selected="handleUserSelected" />
      <CategoryManager />
    </div>
    <div class="main-content">
      <div class="activity-manager" v-if="selectedUser">
        <h2>Atividades de {{ selectedUser.firstName }} </h2>
        <ActivityManager :userId="selectedUser.id" />
      </div>
    </div>
  </div>
</template>

<script>
import UserList from './userList.vue';
import ActivityManager from './activityManager.vue';
import CategoryManager from './categoryManager.vue';

export default {
  components: {
    UserList,
    ActivityManager,
    CategoryManager
  },
  data() {
    return {
      selectedUser: null
    };
  },
  methods: {
    handleUserSelected(user) {
      this.selectedUser = user;
    }
  }
};
</script>

<style scoped>
.user-manager {
  display: flex;
}

.sidebar {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.activity-manager {
  margin-top: 20px;
}
</style>
