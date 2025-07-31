import { FileText, Smile } from "lucide-react";

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-foreground mb-2">No posts yet</h3>
      <p className="text-gray-500 mb-4">
        Be the first to share what's on your mind!
      </p>
      <Smile className="h-8 w-8 text-gray-300" />
    </div>
  );
};

export default NoPosts;
