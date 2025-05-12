import { getCategories, getSubCategories } from "../api/FilterApi";

export const fetchFilterData = async () => {
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  return {
    categories: categories.map(cat => cat.name),
    subCategories: subCategories.map(sub => sub.name),
  };
};
