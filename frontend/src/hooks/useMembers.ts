import { useState, useEffect, useCallback } from 'react';
import { memberApi } from '../services/api';
import type { Member, MemberRequest, ApiError } from '../types/member';
import axios from 'axios';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await memberApi.findAll();
      setMembers(data);
    } catch {
      setError('Erro ao carregar membros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const create = async (data: MemberRequest): Promise<{ success: boolean; error?: ApiError }> => {
    try {
      const member = await memberApi.create(data);
      setMembers(prev => [...prev, member]);
      return { success: true };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return { success: false, error: err.response.data as ApiError };
      }
      return { success: false, error: { message: 'Erro ao cadastrar membro.' } };
    }
  };

  const update = async (id: number, data: MemberRequest): Promise<{ success: boolean; error?: ApiError }> => {
    try {
      const member = await memberApi.update(id, data);
      setMembers(prev => prev.map(m => (m.id === id ? member : m)));
      return { success: true };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return { success: false, error: err.response.data as ApiError };
      }
      return { success: false, error: { message: 'Erro ao atualizar membro.' } };
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      await memberApi.remove(id);
      setMembers(prev => prev.filter(m => m.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const toggleStatus = async (id: number): Promise<boolean> => {
    try {
      const member = await memberApi.toggleStatus(id);
      setMembers(prev => prev.map(m => (m.id === id ? member : m)));
      return true;
    } catch {
      return false;
    }
  };

  return { members, loading, error, fetchMembers, create, update, remove, toggleStatus };
}
