import axiosInstance from '@/lib/axios';
import type { Cult, CultInvite, CreateCultData } from '@/types/creative/cult';
import type { SuccessResponse } from '@/types/api';

const INITIAL_MOCK_CULTS: Cult[] = [
  {
    id: 'cult-1',
    name: 'Pixel Punks',
    slug: 'pixel-punks',
    tagline: 'High-octane digital art & cyber aesthetic collective',
    description:
      'We craft futuristic visual systems, 3D motion graphics, and interactive Web3 brand identities.',
    userRole: 'LEADER',
    memberCount: 6,
    members: [
      {
        id: 'm-1',
        name: 'Alex Rivera',
        role: 'LEADER',
        joinedAt: '2025-11-01',
      },
      {
        id: 'm-2',
        name: 'Elena Rostova',
        role: 'MEMBER',
        joinedAt: '2025-11-15',
      },
      {
        id: 'm-3',
        name: 'Devon Chen',
        role: 'MEMBER',
        joinedAt: '2025-12-04',
      },
      {
        id: 'm-4',
        name: 'Sora Takahashi',
        role: 'MEMBER',
        joinedAt: '2026-01-10',
      },
      { id: 'm-5', name: 'Maya Lin', role: 'MEMBER', joinedAt: '2026-02-02' },
      { id: 'm-6', name: 'Zane Vance', role: 'MEMBER', joinedAt: '2026-03-14' },
    ],
    tags: ['3D Motion', 'Brand Identity', 'Cyberpunks', 'Generative Art'],
    createdAt: '2025-11-01',
  },
  {
    id: 'cult-2',
    name: 'Loop Collective',
    slug: 'loop-collective',
    tagline: 'Experimental sound designers and immersive web architects',
    description:
      'A union of sound engineers, UI designers, and creative coders crafting sensory experiences.',
    userRole: 'MEMBER',
    memberCount: 9,
    members: [
      {
        id: 'm-7',
        name: 'Marcus Vance',
        role: 'LEADER',
        joinedAt: '2025-08-20',
      },
      {
        id: 'm-8',
        name: 'Chloe Bennett',
        role: 'MEMBER',
        joinedAt: '2025-09-02',
      },
      {
        id: 'm-9',
        name: 'Julian Sterling',
        role: 'MEMBER',
        joinedAt: '2025-10-12',
      },
    ],
    tags: ['Creative Coding', 'Audio Reactive', 'UI/UX', 'WebGL'],
    createdAt: '2025-08-20',
  },
];

const INITIAL_MOCK_INVITES: CultInvite[] = [
  {
    id: 'inv-1',
    cultId: 'cult-3',
    cultName: 'Studio North',
    inviterName: 'Kaelen Vance',
    status: 'PENDING',
    createdAt: '2026-07-24',
  },
];

export const cultService = {
  async getCults(): Promise<Cult[]> {
    try {
      const response =
        await axiosInstance.get<SuccessResponse<Cult[]>>('/creative/cults');
      return response.data.data;
    } catch {
      return INITIAL_MOCK_CULTS;
    }
  },

  async getInvites(): Promise<CultInvite[]> {
    try {
      const response = await axiosInstance.get<SuccessResponse<CultInvite[]>>(
        '/creative/cults/invites'
      );
      return response.data.data;
    } catch {
      return INITIAL_MOCK_INVITES;
    }
  },

  async createCult(data: CreateCultData): Promise<Cult> {
    try {
      const response = await axiosInstance.post<SuccessResponse<Cult>>(
        '/creative/cults',
        data
      );
      return response.data.data;
    } catch {
      const newCult: Cult = {
        id: `cult-${Date.now()}`,
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        tagline: data.tagline || 'Newly forged creative collective.',
        description: data.description || '',
        userRole: 'LEADER',
        memberCount: 1,
        members: [
          {
            id: `m-self`,
            name: 'You',
            role: 'LEADER',
            joinedAt: new Date().toISOString().split('T')[0],
          },
        ],
        tags: data.tags?.length ? data.tags : ['Creative', 'Design'],
        createdAt: new Date().toISOString(),
      };
      return newCult;
    }
  },

  async respondToInvite(
    inviteId: string,
    action: 'ACCEPT' | 'DECLINE'
  ): Promise<{ success: boolean; inviteId: string; action: string }> {
    try {
      const response = await axiosInstance.post<
        SuccessResponse<{ success: boolean; inviteId: string; action: string }>
      >(`/creative/cults/invites/${inviteId}/respond`, { action });
      return response.data.data;
    } catch {
      return { success: true, inviteId, action };
    }
  },
};
