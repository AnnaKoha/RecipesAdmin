<script setup>
import { ref, onMounted } from 'vue'
import { RecipeService } from '@/services'
import { ROUTER_PATHS } from '@/constans';
import AppLayout from '@/layouts/AppLayout.vue';
import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';

const recipes = ref()
const isLoading = ref(false)

const fetchRecipes = async () => {
    try{
        isLoading.value = true;
        recipes.value = await RecipeService.getRecipesByLetter();
        isLoading.value = false;
    } 
    catch (error) {
        console.log(error);
    }
}

const getRecipePath = (id) => {
    return `${ROUTER_PATHS.RECIPE.split(':')[0]}${id}`;
}

onMounted(fetchRecipes);
</script>

<template>
    <AppLayout>
        <template #title>Рецепты</template>
        <template #controls>
            <router-link :to="getRecipePath('new')">
                <AppButton text="Добавить рецепт"></AppButton>
            </router-link>
        </template>
        <template #inner>
            <AppLoader v-if="isLoading"/>
            <div v-else class="wrapper">
                  <el-table :data="recipes" style="width: 100%">
                    <el-table-column prop="idMeal" label="Id"/>
                    <el-table-column label="Name">
                        <template #default="scope">
                            <router-link :to="getRecipePath(scope.row.idMeal)">
                               {{ scope?.row?.strMeal }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="Image" >
                        <template #default="scope">
                            <router-link :to="getRecipePath(scope.row.idMeal)">
                                <img :src="scope?.row?.strMealThumb" class="image">
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="strCategory" label="Categories" />
                    <el-table-column prop="strArea" label="Area" />
                    <el-table-column label="Tags">
                         <template #default="scope">
                            <div style="display: flex; align-items: center">
                               <template v-if="scope?.row?.strTags">
                                    <el-tag 
                                    class="tag"
                                    v-for="(tag, key) in scope.row.strTags.split(',')" 
                                    :key="key"
                                    type="primary"
                                    >
                                {{ tag }}
                                </el-tag>
                               </template>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </template>
    </AppLayout>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/index'

.tag 
 margin: 2px 3px;

.image
 width: 70px;
 height: 70px; 
</style>