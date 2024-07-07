<template>
  <div class="activity-manager">
    <ul>
      <li v-for="activity in filteredActivities" :key="activity.id">
        <div class="activity-item">
          <div>
            <strong>{{ activity.description }}</strong>
          </div>
          <div class="category" v-if="activity.category">
            Categoria: {{ activity.category.description }}
          </div>
          <div class="user">
            Usuário: {{ getActivityUserName(activity) }}
          </div>
          <button @click="deleteActivity(activity.id)">Deletar</button>
          <button @click="editActivity(activity)">Editar</button>
        </div>
      </li>
    </ul>
    <form @submit.prevent="isEditing ? updateActivity() : addActivity()" class="add-activity-form">
      <input v-model="newActivity.description" type="text" placeholder="Descrição" required>
      <select v-model="newActivity.categoryId" required>
        <option value="" disabled selected>Selecione uma Categoria</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.description }}
        </option>
      </select>
      <button type="submit">{{ isEditing ? 'Atualizar Atividade' : 'Adicionar Atividade' }}</button>
    </form>
  </div>
</template>

<script>
import { getActivities, createActivity, deleteActivity, updateActivity } from '@/services/activityService';
import { getCategories } from '@/services/categoryService';

export default {
  props: ['userId'],
  data() {
    return {
      activities: [],
      categories: [],
      newActivity: {
        description: '',
        categoryId: null,
        userId: this.userId
      },
      isEditing: false,
      editingActivity: null
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => activity.userId === this.userId);
    }
  },
  methods: {
    async fetchActivities() {
      try {
        this.activities = await getActivities(this.userId);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    },
    async fetchCategories() {
      try {
        this.categories = await getCategories();
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    },
    async addActivity() {
      try {
        this.newActivity.userId = this.userId; // Ensure the userId is correctly set
        const createdActivity = await createActivity(this.newActivity);
        this.activities.push(createdActivity);
        this.newActivity.description = '';
        this.newActivity.categoryId = null;
        window.location.reload();
      } catch (error) {
        console.error('Erro ao criar atividade:', error);
      }
    },
    async deleteActivity(activityId) {
      try {
        await deleteActivity(activityId);
        this.activities = this.activities.filter(activity => activity.id !== activityId);
      } catch (error) {
        console.error(`Erro ao deletar atividade com ID ${activityId}:`, error);
      }
    },
    async updateActivity() {
      try {
        this.newActivity.userId = this.userId; // Ensure the userId is correctly set
        const updatedActivity = await updateActivity(this.editingActivity.id, this.newActivity);
        const index = this.activities.findIndex(activity => activity.id === updatedActivity.id);
        if (index !== -1) {
          this.activities.splice(index, 1, updatedActivity);
        }
        this.clearEditingState();
      } catch (error) {
        console.error('Erro ao atualizar atividade:', error);
      }
    },
    clearEditingState() {
      this.isEditing = false;
      this.editingActivity = null;
      this.newActivity = {
        description: '',
        categoryId: null,
        userId: this.userId
      };
    },
    getActivityUserName(activity) {
      if (activity && activity.user) {
        return `${activity.user.firstName || ''} ${activity.user.lastName || ''}`;
      } else {
        return 'Usuário não encontrado';
      }
    },
    editActivity(activity) {
      this.editingActivity = {
        id: activity.id,
        description: activity.description,
        categoryId: activity.categoryId,
        userId: activity.userId
      };
      this.newActivity.description = activity.description;
      this.newActivity.categoryId = activity.categoryId;
      this.isEditing = true;
    }
  },
  watch: {
    userId: 'fetchActivities'
  },
  created() {
    this.fetchCategories();
    this.fetchActivities();
  }
};
</script>

<style scoped>
.activity-manager {
  margin-top: 20px;
}

.activity-manager .activity-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.activity-manager .category, .activity-manager .user {
  margin-top: 5px;
  color: #888;
}

.activity-manager button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  float: right;
  margin-left: 5px;
}

.activity-manager button:hover {
  background-color: #c82333;
}

.add-activity-form {
  margin-top: 20px;
}

.add-activity-form input[type="text"] {
  padding: 8px;
  width: 150px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-activity-form select {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
}

.add-activity-form button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.add-activity-form button:hover {
  background-color: #0056b3;
}
</style>
