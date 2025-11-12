<<<<<<< HEAD
=======
// stores/kanbanStore.ts - COMPLETE v7.5
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

<<<<<<< HEAD
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

=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
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

<<<<<<< HEAD
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
=======
export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  position: number;
  labels: Label[];
  checklist: ChecklistItem[];
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  pomodorosSpent: number;
  createdAt: number;
  archived: boolean;
}

export interface List {
  id: string;
  title: string;
  cards: string[];
  position: number;
}

export interface KanbanState {
  lists: List[];
  cards: Record<string, Card>;
  
  // List operations
  addList: (title: string) => void;
  updateList: (listId: string, updates: Partial<List>) => void;
  deleteList: (listId: string) => void;
  
  // Card operations
  addCard: (listId: string, title: string) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, fromListId: string, toListId: string, newPosition: number) => void;
  duplicateCard: (cardId: string) => void; // ✅ ADDED
  archiveCard: (cardId: string) => void; // ✅ ADDED
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  
  // Checklist operations
  addChecklistItem: (cardId: string, text: string) => void;
  toggleChecklistItem: (cardId: string, itemId: string) => void;
  deleteChecklistItem: (cardId: string, itemId: string) => void;
<<<<<<< HEAD
=======
  updateChecklistItem: (cardId: string, itemId: string, text: string) => void; // ✅ ADDED
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  
  // Label operations
  addLabel: (cardId: string, label: Label) => void;
  removeLabel: (cardId: string, labelId: string) => void;
<<<<<<< HEAD
  createGlobalLabel: (text: string, color: string) => void;
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      lists: [
<<<<<<< HEAD
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
=======
        {
          id: uuidv4(),
          title: 'To Do',
          cards: [],
          position: 0,
        },
        {
          id: uuidv4(),
          title: 'In Progress',
          cards: [],
          position: 1,
        },
        {
          id: uuidv4(),
          title: 'Done',
          cards: [],
          position: 2,
        },
      ],
      cards: {},

      // List Operations
      addList: (title: string) => {
        const newList: List = {
          id: uuidv4(),
          title,
          cards: [],
          position: get().lists.length,
        };
        set((state) => ({
          lists: [...state.lists, newList],
        }));
      },

      updateList: (listId: string, updates: Partial<List>) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId ? { ...list, ...updates } : list
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          ),
        }));
      },

<<<<<<< HEAD
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
=======
      deleteList: (listId: string) => {
        const list = get().lists.find((l) => l.id === listId);
        if (!list) return;

        // Delete all cards in the list
        const cardIdsToDelete = list.cards;
        const newCards = { ...get().cards };
        cardIdsToDelete.forEach((cardId) => {
          delete newCards[cardId];
        });

        set((state) => ({
          lists: state.lists.filter((l) => l.id !== listId),
          cards: newCards,
        }));
      },

      // Card Operations
      addCard: (listId: string, title: string) => {
        const newCard: Card = {
          id: uuidv4(),
          title,
          description: '',
          listId,
          position: get().lists.find((l) => l.id === listId)?.cards.length || 0,
          labels: [],
          checklist: [],
          priority: 'medium',
          pomodorosSpent: 0,
          createdAt: Date.now(),
          archived: false,
        };

        set((state) => ({
          cards: { ...state.cards, [newCard.id]: newCard },
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, cards: [...list.cards, newCard.id] }
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
              : list
          ),
        }));
      },

<<<<<<< HEAD
      updateCard: (id, updates) => {
        set((state) => ({
          cards: {
            ...state.cards,
            [id]: { ...state.cards[id], ...updates },
=======
      updateCard: (cardId: string, updates: Partial<Card>) => {
        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: { ...state.cards[cardId], ...updates },
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          },
        }));
      },

<<<<<<< HEAD
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
=======
      deleteCard: (cardId: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        const newCards = { ...get().cards };
        delete newCards[cardId];

        set((state) => ({
          cards: newCards,
          lists: state.lists.map((list) =>
            list.id === card.listId
              ? { ...list, cards: list.cards.filter((id) => id !== cardId) }
              : list
          ),
        }));
      },

      moveCard: (cardId: string, fromListId: string, toListId: string, newPosition: number) => {
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => {
<<<<<<< HEAD
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
=======
          const fromList = state.lists.find((l) => l.id === fromListId);
          const toList = state.lists.find((l) => l.id === toListId);

          if (!fromList || !toList) return state;

          const updatedFromCards = fromList.cards.filter((id) => id !== cardId);
          const updatedToCards = [...toList.cards];

          if (fromListId === toListId) {
            updatedToCards.splice(newPosition, 0, cardId);
          } else {
            updatedToCards.splice(newPosition, 0, cardId);
          }

          return {
            cards: {
              ...state.cards,
              [cardId]: { ...card, listId: toListId },
            },
            lists: state.lists.map((list) => {
              if (list.id === fromListId) {
                return { ...list, cards: updatedFromCards };
              }
              if (list.id === toListId) {
                return { ...list, cards: updatedToCards };
              }
              return list;
            }),
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          };
        });
      },

<<<<<<< HEAD
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
=======
      // ✅ ADDED: Duplicate Card
      duplicateCard: (cardId: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        const newCard: Card = {
          ...card,
          id: uuidv4(),
          title: `${card.title} (Copy)`,
          createdAt: Date.now(),
          checklist: card.checklist.map((item) => ({
            ...item,
            id: uuidv4(),
            completed: false, // Reset completion
          })),
        };

        set((state) => ({
          cards: { ...state.cards, [newCard.id]: newCard },
          lists: state.lists.map((list) =>
            list.id === card.listId
              ? { ...list, cards: [...list.cards, newCard.id] }
              : list
          ),
        }));
      },

      // ✅ ADDED: Archive Card
      archiveCard: (cardId: string) => {
        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: { ...state.cards[cardId], archived: true },
          },
        }));
      },

      // Checklist Operations
      addChecklistItem: (cardId: string, text: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        const newItem: ChecklistItem = {
          id: uuidv4(),
          text,
          completed: false,
        };

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              checklist: [...card.checklist, newItem],
            },
          },
        }));
      },

      toggleChecklistItem: (cardId: string, itemId: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              checklist: card.checklist.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            },
          },
        }));
      },

      deleteChecklistItem: (cardId: string, itemId: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              checklist: card.checklist.filter((item) => item.id !== itemId),
            },
          },
        }));
      },

      // ✅ ADDED: Update Checklist Item Text
      updateChecklistItem: (cardId: string, itemId: string, text: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              checklist: card.checklist.map((item) =>
                item.id === itemId ? { ...item, text } : item
              ),
            },
          },
        }));
      },

      // Label Operations
      addLabel: (cardId: string, label: Label) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              labels: [...card.labels, label],
            },
          },
        }));
      },

      removeLabel: (cardId: string, labelId: string) => {
        const card = get().cards[cardId];
        if (!card) return;

        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: {
              ...card,
              labels: card.labels.filter((l) => l.id !== labelId),
            },
          },
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        }));
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);
