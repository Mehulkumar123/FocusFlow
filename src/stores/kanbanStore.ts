import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  position: number;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate?: string;
  labels: Label[];
  checklist: ChecklistItem[];
  pomodorosSpent: number;
  attachments: string[];
  members: string[];
  archived: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface List {
  id: string;
  title: string;
  position: number;
  cards: string[];
  archived: boolean;
}

interface KanbanState {
  lists: List[];
  cards: { [key: string]: Card };
  labels: Label[];
  
  // List operations
  addList: (title: string) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;
  moveList: (fromIndex: number, toIndex: number) => void;
  
  // Card operations
  addCard: (listId: string, title: string) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  moveCard: (cardId: string, fromListId: string, toListId: string, newPosition: number) => void;
  archiveCard: (id: string) => void;
  
  // Checklist operations
  addChecklistItem: (cardId: string, text: string) => void;
  toggleChecklistItem: (cardId: string, itemId: string) => void;
  deleteChecklistItem: (cardId: string, itemId: string) => void;
  
  // Label operations
  addLabel: (cardId: string, label: Label) => void;
  removeLabel: (cardId: string, labelId: string) => void;
  createGlobalLabel: (text: string, color: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      lists: [
        { id: uuidv4(), title: 'To Do', position: 0, cards: [], archived: false },
        { id: uuidv4(), title: 'In Progress', position: 1, cards: [], archived: false },
        { id: uuidv4(), title: 'Done', position: 2, cards: [], archived: false },
      ],
      cards: {},
      labels: [
        { id: uuidv4(), text: 'Bug', color: '#ef4444' },
        { id: uuidv4(), text: 'Feature', color: '#3b82f6' },
        { id: uuidv4(), text: 'Urgent', color: '#f59e0b' },
        { id: uuidv4(), text: 'Low Priority', color: '#10b981' },
      ],

      addList: (title) => {
        const newList: List = {
          id: uuidv4(),
          title,
          position: get().lists.length,
          cards: [],
          archived: false,
        };
        set((state) => ({ lists: [...state.lists, newList] }));
      },

      updateList: (id, updates) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, ...updates } : list
          ),
        }));
      },

      deleteList: (id) => {
        const list = get().lists.find(l => l.id === id);
        if (list) {
          // Delete all cards in the list
          const cards = { ...get().cards };
          list.cards.forEach(cardId => {
            delete cards[cardId];
          });
          set((state) => ({
            lists: state.lists.filter((list) => list.id !== id),
            cards,
          }));
        }
      },

      moveList: (fromIndex, toIndex) => {
        const lists = [...get().lists];
        const [removed] = lists.splice(fromIndex, 1);
        lists.splice(toIndex, 0, removed);
        lists.forEach((list, index) => {
          list.position = index;
        });
        set({ lists });
      },

      addCard: (listId, title) => {
        const cardId = uuidv4();
        const newCard: Card = {
          id: cardId,
          title,
          description: '',
          listId,
          position: get().lists.find(l => l.id === listId)?.cards.length || 0,
          priority: 'medium',
          createdAt: new Date().toISOString(),
          labels: [],
          checklist: [],
          pomodorosSpent: 0,
          attachments: [],
          members: [],
          archived: false,
        };
        
        set((state) => ({
          cards: { ...state.cards, [cardId]: newCard },
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, cards: [...list.cards, cardId] }
              : list
          ),
        }));
      },

      updateCard: (id, updates) => {
        set((state) => ({
          cards: {
            ...state.cards,
            [id]: { ...state.cards[id], ...updates },
          },
        }));
      },

      deleteCard: (id) => {
        const card = get().cards[id];
        if (card) {
          const cards = { ...get().cards };
          delete cards[id];
          
          set((state) => ({
            cards,
            lists: state.lists.map((list) =>
              list.id === card.listId
                ? { ...list, cards: list.cards.filter((cid) => cid !== id) }
                : list
            ),
          }));
        }
      },

      moveCard: (cardId, fromListId, toListId, newPosition) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => {
          const newLists = state.lists.map((list) => {
            if (list.id === fromListId) {
              return { ...list, cards: list.cards.filter((id) => id !== cardId) };
            }
            if (list.id === toListId) {
              const newCards = [...list.cards];
              newCards.splice(newPosition, 0, cardId);
              return { ...list, cards: newCards };
            }
            return list;
          });

          return {
            lists: newLists,
            cards: {
              ...state.cards,
              [cardId]: { ...card, listId: toListId, position: newPosition },
            },
          };
        });
      },

      archiveCard: (id) => {
        get().updateCard(id, { archived: true });
      },

      addChecklistItem: (cardId, text) => {
        const card = get().cards[cardId];
        if (card) {
          const newItem: ChecklistItem = {
            id: uuidv4(),
            text,
            completed: false,
          };
          get().updateCard(cardId, {
            checklist: [...card.checklist, newItem],
          });
        }
      },

      toggleChecklistItem: (cardId, itemId) => {
        const card = get().cards[cardId];
        if (card) {
          get().updateCard(cardId, {
            checklist: card.checklist.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          });
        }
      },

      deleteChecklistItem: (cardId, itemId) => {
        const card = get().cards[cardId];
        if (card) {
          get().updateCard(cardId, {
            checklist: card.checklist.filter((item) => item.id !== itemId),
          });
        }
      },

      addLabel: (cardId, label) => {
        const card = get().cards[cardId];
        if (card && !card.labels.find(l => l.id === label.id)) {
          get().updateCard(cardId, {
            labels: [...card.labels, label],
          });
        }
      },

      removeLabel: (cardId, labelId) => {
        const card = get().cards[cardId];
        if (card) {
          get().updateCard(cardId, {
            labels: card.labels.filter((l) => l.id !== labelId),
          });
        }
      },

      createGlobalLabel: (text, color) => {
        const newLabel: Label = {
          id: uuidv4(),
          text,
          color,
        };
        set((state) => ({
          labels: [...state.labels, newLabel],
        }));
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);
