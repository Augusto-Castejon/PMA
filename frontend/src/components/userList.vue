<template>
  <div class="user-list">
    <h1> Gerenciador de Atividades</h1>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id" @click="selectUser(user)">
        {{ user.firstName }} {{ user.lastName }}
        <button @click="editUser(user)">Editar</button>
        <button @click="deleteUser(user.id)">Excluir</button>
      </li>
    </ul>
    <form @submit.prevent="isEditing ? updateUser() : addUser()" v-if="showForm">
      <input v-model="newUser.firstName" type="text" placeholder="Primeiro Nome" required>
      <input v-model="newUser.lastName" type="text" placeholder="Último Nome" required>
      <button type="submit">{{ isEditing ? 'Atualizar Usuário' : 'Adicionar Usuário' }}</button>
    </form>
    <button @click="toggleForm">{{ showForm ? 'Cancelar' : 'Adicionar Usuário' }}</button>
  </div>
</template>

<script>
import { getUsers, createUser, updateUser, deleteUser } from '@/services/userService';

export default {
  data() {
    return {
      users: [],
      newUser: {
        firstName: '',
        lastName: ''
      },
      isEditing: false,
      editingUser: null,
      showForm: false
    };
  },

  methods: {
    async fetchUsers() {
      try {
        this.users = await getUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser() {
      try {
        const createdUser = await createUser(this.newUser);
        this.users.push(createdUser);
        this.newUser.firstName = '';
        this.newUser.lastName = '';
        this.showForm = false;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    },
    async updateUser() {
      try {
        const updatedUser = await updateUser(this.editingUser.id, this.newUser);
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users.splice(index, 1, updatedUser);
        }
        this.clearEditingState();
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await deleteUser(userId);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error(`Erro ao deletar usuário com ID ${userId}:`, error);
      }
    },
    editUser(user) {
      this.editingUser = { ...user };
      this.newUser.firstName = user.firstName;
      this.newUser.lastName = user.lastName;
      this.isEditing = true;
      this.showForm = true;
    },
    clearEditingState() {
      this.isEditing = false;
      this.editingUser = null;
      this.newUser.firstName = '';
      this.newUser.lastName = '';
      this.showForm = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.clearEditingState();
      }
    },
    selectUser(user) {
      this.$emit('user-selected', user);
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.user-list {
  padding: 20px;
  width: 100%;
}

.user-list ul {
  list-style-type: none;
  padding: 0;
}

.user-list li {
  margin-bottom: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}


.user-list li:hover {
  background-color: #e0e0e0;
}


.user-list form {
  margin-top: 20px;
}


.user-list form input[type="text"] {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.user-list form button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}


.user-list form button:hover {
  background-color: #0056b3;
}


.user-list button {
  margin-top: 10px;
  margin-left: 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}


.user-list button:hover {
  background-color: #0056b3;
}
</style>

