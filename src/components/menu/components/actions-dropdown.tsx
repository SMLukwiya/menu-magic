import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { type MouseEvent, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ActionsDropdown = ({
  children,
  withoutEdit,
}: {
  children: React.ReactNode;
  postId: string;
  withoutEdit?: boolean;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteConfirmed = (e: MouseEvent) => {
    {
    }
  };

  const DeleteConfirmationDialog = () => {
    return (
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this MEnu?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirmed}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <>
      <DeleteConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {!withoutEdit && (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { ActionsDropdown };
