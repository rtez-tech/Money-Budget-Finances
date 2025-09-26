import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddDebtDialogProps {
  onAdd: (debt: { name: string; balance: number; minimum_payment: number; interest_rate: number }) => void;
}

export const AddDebtDialog = ({ onAdd }: AddDebtDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    minimum_payment: "",
    interest_rate: "",
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      balance: parseFloat(formData.balance) || 0,
      minimum_payment: parseFloat(formData.minimum_payment) || 0,
      interest_rate: parseFloat(formData.interest_rate) || 0,
    });
    setFormData({
      name: "",
      balance: "",
      minimum_payment: "",
      interest_rate: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Debt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Debt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Debt Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Credit Card, Loan, etc."
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Debt</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};