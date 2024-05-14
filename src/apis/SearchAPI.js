import axiosWithoutInterceptors from "./axiosWithoutInterceptors";

const SearchAPI = {
  getMatchesRecipes: (searchTerm) =>
    axiosWithoutInterceptors()
      .get(`/search/recipes?searchTerm=${searchTerm}`)
      .then((response) => response.data),
};

export default SearchAPI;
