<script setup>
import { ref, computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import { useRootStore } from '@/stores/root'
import { RecipeService, CommonService } from '@/services'
import { notify } from '@/utils'
import AppLayout from '@/layouts/AppLayout.vue';
import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';

const recipe = ref(RecipeService.getEmptyRecipe());
const recipeUpdate = ref(RecipeService.getEmptyRecipe());
const route = useRoute();
const rootStore = useRootStore();
const recipeId = route?.params.id;
const isCreateingMode = ref(true);
const areas = computed(() => rootStore.areas);
const categories = computed(() => rootStore.categories);
const recipeIngredients = ref([CommonService.getEmptyIngredient()]);
const isLoading = ref(false);

const normalizeRecipeIngredients = () => {
    const normalizeRecipeIngredients = [];

    for (let i=1;  i <= 20; i++){
        if(recipe.value[`strIngredient${i}`]){
            const ingr = {
                id: Math.random().toString(36).slice(2),
                title: recipe.value[`strIngredient${i}`],
                measure: recipe.value[`strMeasure${i}`]
            }
            normalizeRecipeIngredients.push(ingr)
        }
    }

    recipeIngredients.value = normalizeRecipeIngredients;
};

const denormalizeRecipeIngredients = (recipe) => {
   for(let i = 1; i <= 20; i++){
    const ingredient = recipeIngredients.value[i - 1]

    if (ingredient?.title && ingredient?.measure){
        recipe[`strIngredient${i}`] = ingredient.title
        recipe[`strMeasure${i}`] = ingredient.measure
    }
    else {
        recipe[`strIngredient${i}`] = ''
        recipe[`strMeasure${i}`] = ''
    }
   }
    
}

const fetchRecipeById = async () => {
    try{
        isLoading.value = true
        isCreateingMode.value = false;
        const data = await RecipeService.getRecipesById(recipeId);
        recipe.value = { ...data};
        recipeUpdate.value = { ...data};
        isLoading.value = false;
    }
    catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const addIngredient = () => {
    recipeIngredients.value.push(CommonService.getEmptyIngredient())
};

const deleteIngredient = (index) => {
    recipeIngredients.value.splice(index, 1);
};

const createOrUpdateRecipe = () => {
    isCreateingMode.value ? createRecipe() : updateRecipe();
}

const createRecipe = async () => {
    try {
        const params  = { ...recipeUpdate.value}
        denormalizeRecipeIngredients(params)
        isLoading.value = true;
        await RecipeService.createRecipe();
        setTimeout(() => {
            isLoading.value = false;
            notify('Создан', `Рецепт ${params.strMeal} создан`, 'success');
        }, 500)
 
    } catch(err) {
        console.log(err)
    }
}

const updateRecipe = async () => {
    try {
        isLoading.value = true;
        const params  = { ...recipeUpdate.value}
        denormalizeRecipeIngredients(params)
    
        await RecipeService.updateRecipe()

        setTimeout(() =>{
             isLoading.value = false;
             notify('Обновлено', `Рецепт ${params.strMeal} обновлено`, 'success');
        }, 500);
    } catch(err) {
        console.log(err)
    }
}

onMounted(async () => {
    if(parseInt(recipeId)){
       await fetchRecipeById();
       normalizeRecipeIngredients();
    }
});

</script>

<template>
    <AppLayout>
        <template #title>{{ isCreateingMode ? 'Новый рецепт' : recipeUpdate?.strMeal }}</template>
        <template #controls>
            <AppButton text="Сохранить" @click="createOrUpdateRecipe"></AppButton>
        </template>
        <template #inner> 
            <AppLoader v-if="isLoading" />
            <div v-else class="wrapper">
                <div class="row">
                    <div class="col">
                        <div class="label">Title</div>
                        <el-input v-model="recipeUpdate.strMeal" placeholder="Title" />
                    </div>
                    <div class="col">
                        <div class="label">Area</div>
                        <el-select
                        v-model="recipeUpdate.strArea"
                        placeholder="Area"
                        >
                        <el-option
                            v-for="item in areas"
                            :key="item.strArea"
                            :label="item.strArea"
                            :value="item.strArea"
                        />
                        </el-select>
                    </div>
                </div>
                <div class="row">
                     <div class="col">
                        <div class="label">Categories</div>
                        <el-select
                        v-model="recipeUpdate.strCategory"
                        placeholder="Categories"
                        >
                        <el-option
                            v-for="item in categories"
                            :key="item.strCategory"
                            :label="item.strCategory"
                            :value="item.strCategory"
                        />
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="subtitle">Instructions</div>
                        <el-input
                            v-model="recipeUpdate.strInstructions"
                            :autosize="{ minRows: 2, maxRows: 8 }"
                            type="textarea"
                            placeholder="Instructions"
                        />
                    </div>
                </div>
                <div class="ingredients">
                    <div class="subtitle">
                        Ingredients
                    </div>
                    <div v-for="(ingredient, index) in recipeIngredients" 
                    :key="`${ingredient.id}-${index}`" 
                    class="row align-item-flex-end"
                    >
                    <div class="col col-small mb-2">
                        {{ index + 1 }}
                    </div>
                    <div class="col">
                         <div class="label">Measure</div>
                        <el-input v-model="ingredient.measure" placeholder="Measure" />
                        <!-- <el-input v-model="recipeIngredients[index].measure" placeholder="Measure" /> -->
               
                    </div>
                    <div class="col">
                        <div class="label">Title</div>
                        <el-input v-model="ingredient.title" placeholder="Title" />
                    </div>
                    <div class="col col-small">
                        <AppButton 
                        circle 
                        icon="Delete"
                        @click="() => deleteIngredient(index)" /> 
                    </div>
                    </div>
                   <AppButton text="Add ingredient" @click="addIngredient" /> 
                </div>
            </div>
        </template>
    </AppLayout>
</template>

<style lang="sass" scoped>

.ingredients
    pading-bottom: 16px
.mb-2
    margin-bottom: 5px

</style>
