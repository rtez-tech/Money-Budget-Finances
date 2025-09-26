import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";

interface EditBudgetDialogProps {
  category: string;
  currentBudget: number;
  currentSpent: number;
  onUpdate: (allocated: number, spent: number) => void;
}

export const EditBudgetDialog = ({ category, currentBudget, currentSpent, onUpdate }: EditBudgetDialogProps) => {
  const [allocated, setAllocated] = useState(currentBudget.toString());
  const [spent, setSpent] = useState(currentSpent.toString());
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(parseFloat(allocated) || 0, parseFloat(spent) || 0);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {category} Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allocated">Allocated Amount ($)</Label>
            <Input
              id="allocated"
              type="number"
              step="0.01"
              min="0"
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spent">Spent Amount ($)</Label>
            <Input
              id="spent"
              type="number"
              step="0.01"
              min="0"
              value={spent}
              onChange={(e) => setSpent(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Budget</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};