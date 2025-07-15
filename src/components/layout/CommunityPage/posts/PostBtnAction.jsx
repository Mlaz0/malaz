import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PostBtnAction = ({
  post,
  isPendingDelete,
  handleDeletePost,
  handleEdit,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer" size="sm">
          •••
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          className="focus:bg-transparent text-primary focus:text-primary/50 cursor-pointe"
          onClick={() => handleEdit(post)}
        >
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPendingDelete}
          onClick={() => !isPendingDelete && handleDeletePost(post)}
          className="text-destructive focus:bg-transparent cursor-pointe focus:text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostBtnAction;
