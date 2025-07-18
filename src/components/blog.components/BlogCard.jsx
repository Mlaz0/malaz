import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming you're using shadcn/ui
import formatDate from "@/utils/formatDate";
import { format } from "date-fns";
import {
  ArrowRight,
  Clock,
  Edit,
  MoreVertical,
  Trash2,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import imgUser from "../../assets/user-img.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function BlogCard({ blog, onEdit, onDelete }) {
  const { user } = useAuth();
  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-lg card-modern relative group">
      {/* Admin actions dropdown */}
      <div className="absolute top-4 left-4 z-10">
        {user?.id === blog?.author?._id && (
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-card/90 backdrop-blur-sm p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-card/80 transition-all shadow-sm">
              <MoreVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px]">
              <DropdownMenuItem
                onClick={() => onEdit && onEdit(blog)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit className="w-4 h-4 text-blue-500" />
                <span>تعديل</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(blog._id)}
                className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="relative">
        <img
          // src={`${blog?.post_image?.url}?v=${Date.now()}`}
          src={blog?.post_image?.url}
          alt={blog?.title}
          className="w-full h-48 object-cover lazy group-hover:opacity-90 transition-opacity"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground shadow-sm">
          {blog?.category?.category_name}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDate(blog?.createdAt)}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
          {blog?.title}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={blog?.author?.userImg?.url || imgUser}
                alt={blog?.author?.name}
              />
              <AvatarFallback>
                {blog?.author?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground text-sm">
                {blog?.author?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(blog?.createdAt), "dd MMM yyyy")}
              </p>
            </div>
          </div>
          <Link
            to={`/blogs/${blog?._id}`}
            className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm"
          >
            اقرأ المزيد
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
