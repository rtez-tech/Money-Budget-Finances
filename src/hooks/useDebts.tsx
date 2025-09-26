import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Debt {
  id: string;
  name: string;
  balance: number;
  minimum_payment: number;
  interest_rate: number;
}

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDebts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setDebts(data || []);
    } catch (error) {
      console.error('Error fetching debts:', error);
      toast({
        title: "Error",
        description: "Failed to load debts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addDebt = async (debt: Omit<Debt, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('debts')
        .insert({
          user_id: user.id,
          ...debt,
        })
        .select()
        .single();

      if (error) throw error;
      
      setDebts(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Debt added successfully",
      });
    } catch (error) {
      console.error('Error adding debt:', error);
      toast({
        title: "Error",
        description: "Failed to add debt",
        variant: "destructive",
      });
    }
  };

  const updateDebt = async (id: string, updates: Partial<Omit<Debt, 'id'>>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('debts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setDebts(prev => prev.map(d => d.id === id ? data : d));
      toast({
        title: "Success",
        description: "Debt updated successfully",
      });
    } catch (error) {
      console.error('Error updating debt:', error);
      toast({
        title: "Error",
        description: "Failed to update debt",
        variant: "destructive",
      });
    }
  };

  const deleteDebt = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setDebts(prev => prev.filter(d => d.id !== id));
      toast({
        title: "Success",
        description: "Debt deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting debt:', error);
      toast({
        title: "Error",
        description: "Failed to delete debt",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDebts();
  }, [user]);

  return {
    debts,
    loading,
    addDebt,
    updateDebt,
    deleteDebt,
    refetch: fetchDebts,
  };
};