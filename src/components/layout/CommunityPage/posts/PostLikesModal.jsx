import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, X } from "lucide-react";
import userImg from "../../assets/images/user-img.svg";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const PostLikesModal = ({ isOpen, onClose, post }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-destructive" />
              <span>Post Likes ({post?.likes?.length || 0})</span>
            </DialogTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-3 max-h-96 overflow-y-auto mt-4">
          {post?.likes?.length > 0 ? (
            post?.likes?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.image?.secure_url || userImg}
                      alt={user.userName}
                    />
                    <AvatarFallback>{user?.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{user?.userName}</h4>
                    <p className="text-xs text-gray-500">{user?.username}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                      {user?.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No likes yet</p>
              <p className="text-sm text-gray-400">
                Be the first to like this post!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostLikesModal;
