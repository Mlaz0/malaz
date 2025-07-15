"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Tag,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import {
  useAddCategory,
  useDeleteCategory,
  useEditCategory,
  useGetAllCategories,
} from "@/hooks/Actions/categories/useCurdCategories";
import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import e from "cors";
import {
  AddCategoryModal,
  DeleteCategoryModal,
  EditCategoryModal,
} from "@/components/admin.components/CategoryModals";

const CategoriesPage = () => {
  const { data: categories } = useGetAllCategories(
    endPoints.categories,
    [queryKeys.categories],
    [queryKeys.categories]
  );

  const { mutate: mutateAddCategory } = useAddCategory();
  const { mutate: mutateEditCategory } = useEditCategory();
  const { mutate: mutateDeleteCategory } = useDeleteCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  // Filter categories based on search
  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        name: newCategoryName.trim(),
      };
      mutateAddCategory({
        data: newCategory,
      });
      setNewCategoryName("");
      setShowAddModal(false);
    }
  };

  // Handle editing category
  const handleEditCategory = () => {
    if (editCategoryName.trim() && selectedCategory) {
      mutateEditCategory({
        data: { ...selectedCategory, name: editCategoryName.trim() },
        id: selectedCategory._id,
      });
      setEditCategoryName("");
      setSelectedCategory(null);
      setShowEditModal(false);
      console.log(showEditModal);
    }
  };

  // Handle deleting category
  const handleDeleteCategory = () => {
    if (selectedCategory) {
      mutateDeleteCategory({
        id: selectedCategory._id,
      });
      setSelectedCategory(null);
      setShowDeleteModal(false);
    }
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setEditCategoryName(category.name);
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
    console.log(category);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">إدارة التخصصات</h1>
          <p className="text-muted-foreground mt-2">
            إدارة تخصصات الجلسات والاستشارات النفسية
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary rounded-md text-white hover:opacity-90  cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          إضافة تخصص جديد
        </button>
      </div>

      {/* Stats Card - Only Categories Count */}
      <div className="card-modern rounded-lg p-6 max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium ">إجمالي التخصصات</p>
            <p className="text-2xl font-bold gradient-text">
              {categories?.length}
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Tag className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث في التخصصات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Categories List */}
      {filteredCategories?.length === 0 ? (
        <div className="card-modern rounded-lg p-12 text-center">
          <Tag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">لا توجد تخصصات</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? "لم يتم العثور على تخصصات تطابق البحث"
              : "لم يتم إنشاء أي تخصصات بعد"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary rounded-md text-accent hover:opacity-90  cursor-pointer mx-auto"
            >
              <Plus className="h-4 w-4" />
              إضافة تخصص جديدة
            </button>
          )}
        </div>
      ) : (
        <div className="card-modern rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right py-3 px-4 font-medium ">
                    اسم التخصص
                  </th>
                  <th className="text-right py-3 px-4 font-medium ">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCategories?.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Tag className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 hover:bg-accent rounded-md transition-colors flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          تعديل
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-md transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      <AddCategoryModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        editCategoryName={editCategoryName}
        setEditCategoryName={setEditCategoryName}
        handleEditCategory={handleEditCategory}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCategoryModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoriesPage;
