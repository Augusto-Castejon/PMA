<template>
  <div class="category-manager">
    <h2>Categorias</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <div class="category-item">
          <span v-if="!isEditingCategory(category.id)">{{ category.description }}</span>
          <input v-else v-model="editingCategoryDescription" type="text" />
          <button v-if="!isEditingCategory(category.id)" @click="startEditingCategory(category)">Editar</button>
          <button v-if="isEditingCategory(category.id)" @click="updateCategory(category.id)">Salvar</button>
          <button @click="deleteCategory(category.id)">Excluir</button>
        </div>
      </li>
    </ul>
    <form @submit.prevent="addCategory" class="category-form">
      <input v-model="newCategory.description" type="text" placeholder="Nova categoria" required>
      <button type="submit">Adicionar Categoria</button>
    </form>
  </div>
</template>

<script>
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService';

export default {
  data() {
    return {
      categories: [],
      newCategory: {
        description: ''
      },
      editingCategoryId: null,
      editingCategoryDescription: ''
    };
  },
  methods: {
    async fetchCategories() {
      try {
        this.categories = await getCategories();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async addCategory() {
      try {
        const createdCategory = await createCategory(this.newCategory);
        this.categories.push(createdCategory);
        this.newCategory.description = ''; // Limpa o campo após adicionar a categoria
        window.location.reload();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },
    startEditingCategory(category) {
      this.editingCategoryId = category.id;
      this.editingCategoryDescription = category.description;
    },
    isEditingCategory(categoryId) {
      return this.editingCategoryId === categoryId;
    },
    async updateCategory(categoryId) {
      try {
        const updatedCategory = await updateCategory(categoryId, { description: this.editingCategoryDescription });
        const index = this.categories.findIndex(category => category.id === categoryId);
        if (index !== -1) {
          this.categories.splice(index, 1, updatedCategory);
        }
        this.editingCategoryId = null;
        this.editingCategoryDescription = '';
        window.location.reload();
      } catch (error) {
        console.error('Error updating category:', error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        await deleteCategory(categoryId);
        this.categories = this.categories.filter(category => category.id !== categoryId);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
.category-manager {
  margin-top: 20px;
}

.category-item {
  display: flex;
  align-items: center;
}

.category-item button {
  margin: 0px 0px 10px 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.category-item button:hover {
  background-color: #0056b3;
}

.category-form {
  margin-top: 10px;
  display: flex;
}

.category-form input[type="text"] {
  padding: 8px;
  width: 150px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-form button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.category-form button:hover {
  background-color: #0056b3;
}
</style>
