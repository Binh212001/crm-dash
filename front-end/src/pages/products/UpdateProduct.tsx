import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductRelations } from '../../hooks/UseProductRelations';
import type { Category } from '../../services/category.service';
import type { VariantAttribute, VariantValue } from '../../services/variant.service';
import {
  useGetProductQuery,
  useUpdateProductMutation,
  type CreateProductDto,
} from '../../services/product.service';
import InputText from '../../components/InputText';

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { categories, variantAttributes } = useProductRelations();
  const { data: product, isLoading, isError } = useGetProductQuery(id || '');
  const [updateProduct, { isLoading: isUpdating, isSuccess, isError: isUpdateError, error }] =
    useUpdateProductMutation();

  // Form state
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [vendor, setVendor] = useState('');
  const [collection, setCollection] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>('');
  const [selectedVariantValueId, setSelectedVariantValueId] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  // For demo, static vendor/collection lists
  const vendors = [
    { id: 'vendor1', name: 'Vendor 1' },
    { id: 'vendor2', name: 'Vendor 2' },
    { id: 'vendor3', name: 'Vendor 3' },
  ];
  const collections = [
    { id: 'collection1', name: 'Collection 1' },
    { id: 'collection2', name: 'Collection 2' },
    { id: 'collection3', name: 'Collection 3' },
  ];

  // Populate form with product data
  useEffect(() => {
    if (product) {
      setSku(product.sku || '');
      setTitle(product.name || '');
      setDescription(product.description || '');
      setCategoryId(product.categoryId || '');
      setVendor(product.vendor || '');
      setCollection(product.collection || '');
      setTags(product.tags ? product.tags.map(tag => tag.id) : []);
      // If productVariant exists, prefill attribute/value/price
      if (product.productVariant && product.productVariant.length > 0) {
        const variant = product.productVariant[0];
        setSelectedAttributeId(variant.attribute?.id || '');
        setSelectedVariantValueId(
          variant.values && variant.values.length > 0 ? variant.values[0].id : ''
        );
        setPrice(variant.price || 0);
      }
    }
  }, [product]);

  const selectedAttribute = variantAttributes.find(
    (attr: VariantAttribute) => attr.id === selectedAttributeId
  );

  // Handle tag input (add on Enter or comma)
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Compose product object
    const updateData: Partial<CreateProductDto> = {
      sku,
      name: title,
      description,
      categoryId,
      vendor,
      collection,
      tags,
      productVariant:
        selectedAttributeId && selectedVariantValueId && selectedAttribute
          ? [
              {
                attributeId: selectedAttribute.id,
                values: [selectedVariantValueId],
                price: price,
              },
            ]
          : [],
    };
    try {
      await updateProduct({ id, data: updateData }).unwrap();
      // Optionally redirect or show success
      // navigate('/products');
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      // error handled by RTK Query
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Loading product...</span>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500">Failed to load product.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div>
              <h2 className="text-base font-semibold mb-2">Update product</h2>
              {isSuccess && (
                <div className="text-green-600 text-sm mb-2">Product updated successfully!</div>
              )}
              {isUpdateError && (
                <div className="text-red-600 text-sm mb-2">
                  Failed to update product{error && (typeof error === 'string' ? `: ${error}` : '')}
                </div>
              )}
            </div>
            {/* Overview */}
            <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-4">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputText
                      label="Product SKU"
                      placeholder="SKU"
                      value={sku}
                      onChange={e => setSku(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <InputText
                      label="Product Title"
                      placeholder="Product Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-medium mb-1">Description</label>
                  <textarea
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none"
                    rows={3}
                    placeholder="Product description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Category</label>
                    <select
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                      value={categoryId}
                      onChange={e => setCategoryId(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat: Category) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Vendor</label>
                    <select
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                      value={vendor}
                      onChange={e => setVendor(e.target.value)}
                    >
                      <option value="">Select vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-4">Additional Information</h3>
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1">Collection</label>
                  <select
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                    value={collection}
                    onChange={e => setCollection(e.target.value)}
                  >
                    <option value="">Select collection</option>
                    {collections.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1">Variants</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Variant Attribute</label>
                      <select
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                        value={selectedAttributeId}
                        onChange={e => {
                          setSelectedAttributeId(e.target.value);
                          setSelectedVariantValueId('');
                        }}
                      >
                        <option value="">Select attribute</option>
                        {variantAttributes.map((attr: VariantAttribute) => (
                          <option key={attr.id} value={attr.id}>
                            {attr.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Variant Value</label>
                      <select
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                        value={selectedVariantValueId}
                        onChange={e => setSelectedVariantValueId(e.target.value)}
                        disabled={!selectedAttribute}
                      >
                        <option value="">Select value</option>
                        {selectedAttribute &&
                          selectedAttribute.values &&
                          selectedAttribute.values.map((val: VariantValue) => (
                            <option key={val.id} value={val.id}>
                              {val.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2">
                    <InputText
                      label="Variant Price"
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={e => setPrice(Number(e.target.value))}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Select a variant attribute and its value (e.g. Size: Medium, Color: Red)
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            {/* Product Tags */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-sm mb-4">Product Tags</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none"
                placeholder="Add tag and press Enter"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
