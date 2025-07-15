export function EditCategoryModal({
  showEditModal,
  setShowEditModal,
  selectedCategory,
  setSelectedCategory,
  editCategoryName,
  setEditCategoryName,
  handleEditCategory,
}) {
  return (
    <>
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">تعديل التخصص</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setEditCategoryName("");
                  }}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  اسم التخصص
                </label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="أدخل اسم التخصص..."
                  className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  onKeyPress={(e) => e.key === "Enter" && handleEditCategory()}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleEditCategory}
                  disabled={!editCategoryName.trim()}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setEditCategoryName("");
                  }}
                  className="cursor-pointer px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function AddCategoryModal({
  showAddModal,
  setShowAddModal,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
}) {
  return (
    <>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">إضافة تخصص جديدة</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategoryName("");
                  }}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  اسم التخصص
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="أدخل اسم التخصص..."
                  className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  حفظ
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategoryName("");
                  }}
                  className="cursor-pointer px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteCategoryModal({
  showDeleteModal,
  setShowDeleteModal,
  selectedCategory,
  setSelectedCategory,
  handleDeleteCategory,
}) {
  return (
    <>
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-red-600">تأكيد الحذف</h2>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800">
                    هل أنت متأكد من حذف هذه التخصص؟
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    سيتم حذف التخصص "{selectedCategory.name}" نهائياً ولا يمكن
                    التراجع عن هذا الإجراء.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDeleteCategory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف نهائياً
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
