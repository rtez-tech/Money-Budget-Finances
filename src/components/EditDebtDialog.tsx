import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit2, Trash2 } from "lucide-react";

interface EditDebtDialogProps {
  debt: {
    id: string;
    name: string;
    balance: number;
    minimum_payment: number;
    interest_rate: number;
  };
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export const EditDebtDialog = ({ debt, onUpdate, onDelete }: EditDebtDialogProps) => {
  const [formData, setFormData] = useState({
    name: debt.name,
    balance: debt.balance.toString(),
    minimum_payment: debt.minimum_payment.toString(),
    interest_rate: debt.interest_rate.toString(),
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(debt.id, {
      name: formData.name,
      balance: parseFloat(formData.balance) || 0,
      minimum_payment: parseFloat(formData.minimum_payment) || 0,
      interest_rate: parseFloat(formData.interest_rate) || 0,
    });
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(debt.id);
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
          <DialogTitle>Edit Debt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Debt Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Credit Card, Loan, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Current Balance ($)</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              min="0"
              value={formData.balance}
              onChange={(e) => setFormData(prev => ({ ...prev, balance: e.target.value }))}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minimum_payment">Minimum Payment ($)</Label>
            <Input
              id="minimum_payment"
              type="number"
              step="0.01"
              min="0"
              value={formData.minimum_payment}
              onChange={(e) => setFormData(prev => ({ ...prev, minimum_payment: e.target.value }))}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest_rate">Interest Rate (%)</Label>
            <Input
              id="interest_rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.interest_rate}
              onChange={(e) => setFormData(prev => ({ ...prev, interest_rate: e.target.value }))}
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Debt</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this debt? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Debt</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};