import { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import { MemberTable } from './MemberTable';
import { MemberForm } from './MemberForm';
import { EmptyState } from './EmptyState';
import type { Member, MemberRequest, ApiError } from '../types/member';

interface Toast {
  type: 'success' | 'error';
  message: string;
}

export function MemberList() {
  const { members, loading, error, create, update, remove, toggleStatus } = useMembers();
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleNew = () => {
    setEditingMember(null);
    setFormOpen(true);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = async (
    data: MemberRequest
  ): Promise<{ success: boolean; error?: ApiError }> => {
    const result = editingMember
      ? await update(editingMember.id, data)
      : await create(data);

    if (result.success) {
      showToast('success', editingMember ? 'Membro atualizado com sucesso!' : 'Membro cadastrado com sucesso!');
      handleClose();
    }
    return result;
  };

  const handleDelete = async (member: Member) => {
    if (!window.confirm(`Deseja realmente excluir o membro "${member.name}"?`)) return;
    const ok = await remove(member.id);
    if (ok) {
      showToast('success', 'Membro excluído com sucesso!');
    } else {
      showToast('error', 'Erro ao excluir membro.');
    }
  };

  const handleToggle = async (member: Member) => {
    const ok = await toggleStatus(member.id);
    if (ok) {
      showToast('success', `Membro ${member.active ? 'desativado' : 'ativado'} com sucesso!`);
    } else {
      showToast('error', 'Erro ao alterar status do membro.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Membros</h1>
            <p className="text-sm text-gray-500 mt-1">
              {members.length} membro{members.length !== 1 ? 's' : ''} cadastrado{members.length !== 1 ? 's' : ''}
            </p>
          </div>
          {members.length > 0 && (
            <button
              onClick={handleNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Membro
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <EmptyState onNew={handleNew} />
        ) : (
          <MemberTable
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </div>

      {formOpen && (
        <MemberForm
          member={editingMember}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
