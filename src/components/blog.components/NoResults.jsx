import { Search } from "lucide-react";

export default function NoResults() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد مقالات</h3>
      <p className="text-muted-foreground">
        لم نجد أي مقالات تطابق بحثك. جرب كلمات مختلفة.
      </p>
    </div>
  );
}
