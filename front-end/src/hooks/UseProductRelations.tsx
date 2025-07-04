import { useGetCategoriesQuery } from "../services/category.service";
import { useGetTagsQuery } from "../services/tag.service";

export function useProductRelations() {
  // Lấy danh sách category
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: tagsData } = useGetTagsQuery();
  // Lấy danh sách variant attribute

  return {
    categories: categoriesData?.data || [],
    tags: tagsData?.data ||[]
  };
}
