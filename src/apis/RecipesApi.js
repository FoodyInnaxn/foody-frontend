import axiosWithoutInterceptors from './axiosWithoutInterceptors';

const RecipesAPI = {
    getRecipes: (page, size) =>
    axiosWithoutInterceptors().get(`/recipe/view?page=${page}&size=${size}`
            , {
                    headers: {"Access-Control-Allow-Origin": "*"}
               }
    )
            .then(response => response.data),
    getRecipeById: (id) =>
    axiosWithoutInterceptors().get(`/recipe/view/${id}`)
            .then(response => response.data)
}

export default RecipesAPI;