import { useGetCategoriesQuery } from '../services/category.service';
import { useGetVariantAttributesQuery } from '../services/variant.service';

export function useProductRelations() {
  // Lấy danh sách category
  const { data: categoriesData } = useGetCategoriesQuery();
  // Lấy danh sách variant attribute
  const { data: variantAttributesData } = useGetVariantAttributesQuery();

  return {
    categories: categoriesData?.data || [],
    variantAttributes: variantAttributesData?.data || [],
  };
}
