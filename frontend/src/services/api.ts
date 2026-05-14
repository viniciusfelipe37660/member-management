import axios from 'axios';
import type { Member, MemberRequest } from '../types/member';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const memberApi = {
  findAll: () => api.get<Member[]>('/members').then(r => r.data),

  findById: (id: number) => api.get<Member>(`/members/${id}`).then(r => r.data),

  create: (data: MemberRequest) => api.post<Member>('/members', data).then(r => r.data),

  update: (id: number, data: MemberRequest) =>
    api.put<Member>(`/members/${id}`, data).then(r => r.data),

  remove: (id: number) => api.delete(`/members/${id}`),

  toggleStatus: (id: number) =>
    api.patch<Member>(`/members/${id}/toggle-status`).then(r => r.data),
};
