import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Budget {
  id: string;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  month_year: string;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBudgets = async () => {
    if (!user) return;
    
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', currentMonth);

      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast({
        title: "Error",
        description: "Failed to load budgets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBudget = async (category: string, allocated_amount: number, spent_amount?: number) => {
    if (!user) return;

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data, error } = await supabase
        .from('budgets')
        .upsert({
          user_id: user.id,
          category,
          allocated_amount,
          spent_amount: spent_amount ?? 0,
          month_year: currentMonth,
        })
        .select()
        .single();

      if (error) throw error;
      
      setBudgets(prev => {
        const existing = prev.find(b => b.category === category);
        if (existing) {
          return prev.map(b => b.category === category ? data : b);
        }
        return [...prev, data];
      });

      toast({
        title: "Success",
        description: "Budget updated successfully",
      });
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        title: "Error",
        description: "Failed to update budget",
        variant: "destructive",
      });
    }
  };

  const updateSpentAmount = async (category: string, spent_amount: number) => {
    if (!user) return;

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data, error } = await supabase
        .from('budgets')
        .update({ spent_amount })
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('month_year', currentMonth)
        .select()
        .single();

      if (error) throw error;
      
      setBudgets(prev => prev.map(b => b.category === category ? data : b));
    } catch (error) {
      console.error('Error updating spent amount:', error);
      toast({
        title: "Error",
        description: "Failed to update spending",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [user]);

  return {
    budgets,
    loading,
    updateBudget,
    updateSpentAmount,
    refetch: fetchBudgets,
  };
};