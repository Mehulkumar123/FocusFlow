import { useState } from 'react';
import { useKanbanStore, type Card, type List } from '../stores/kanbanStore';
import { useSettingsStore } from '../stores/settingsStore';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  Clock,
  CheckSquare,
  X,
  Calendar,
  GripVertical,
  AlertCircle,
  Tag,
  Save,
} from 'lucide-react';

// Card Component
const KanbanCard = ({ 
  card, 
  onEdit, 
  onDelete,
  cardNumber,
}: { 
  card: Card; 
  onEdit: () => void; 
  onDelete: () => void;
  cardNumber?: number;
}) => {
  const { 
    showCardNumbers, 
    cardCompactView, 
    cardStyle,
    showDragHandles,
    dragAnimationDuration,
    highlightOverdueCards,
    showCardAge,
    cardHoverPreview,
  } = useSettingsStore();
  
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({
    id: card.id,
    transition: {
      duration: dragAnimationDuration,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const getCardStyle = () => {
    switch (cardStyle) {
      case 'elevated':
        return 'shadow-md hover:shadow-xl';
      case 'flat':
        return 'bg-base-100';
      case 'outlined':
        return 'border-2 border-base-300';
      default:
        return 'shadow-md hover:shadow-xl';
    }
  };

  const getPriorityColor = (priority: Card['priority']) => {
    switch (priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-info';
    }
  };

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();
  const completedTasks = card.checklist.filter(item => item.completed).length;
  const totalTasks = card.checklist.length;
  const padding = cardCompactView ? 'p-3' : 'p-4';

  const cardAge = showCardAge && card.createdAt 
    ? Math.floor((Date.now() - new Date(card.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card bg-base-100 ${getCardStyle()} transition-all mb-3 group ${
        isDragging ? 'rotate-2 scale-105 ring-2 ring-primary' : ''
      } ${isOverdue && highlightOverdueCards ? 'ring-2 ring-error' : ''} ${
        cardHoverPreview ? 'hover:scale-102 hover:z-10' : ''
      }`}
    >
      <div className={`card-body ${padding} relative`}>
        {isOverdue && highlightOverdueCards && (
          <div className="absolute top-2 right-2">
            <AlertCircle size={16} className="text-error" />
          </div>
        )}

        <div className="flex justify-between items-start gap-2">
          <div className="flex items-start gap-2 flex-1">
            {showDragHandles && (
              <button 
                {...attributes} 
                {...listeners} 
                className="cursor-grab active:cursor-grabbing mt-1 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <GripVertical size={16} />
              </button>
            )}
            {showCardNumbers && cardNumber && (
              <span className="text-xs opacity-50 mt-1">#{cardNumber}</span>
            )}
            <h3 
              className="font-semibold text-sm flex-1" 
              {...(!showDragHandles ? { ...attributes, ...listeners } : {})}
            >
              {card.title}
            </h3>
          </div>
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} />
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-lg w-40 z-50 border border-base-300">
              <li><a onClick={onEdit}><Edit2 size={14} /> Edit</a></li>
              <li><a onClick={onDelete} className="text-error"><Trash2 size={14} /> Delete</a></li>
            </ul>
          </div>
        </div>

        {!cardCompactView && card.description && (
          <p className="text-xs opacity-70 mb-2 line-clamp-2">{card.description}</p>
        )}

        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label) => (
              <span
                key={label.id}
                className="badge badge-sm font-medium"
                style={{ backgroundColor: label.color, color: 'white', border: 'none' }}
              >
                {label.text}
              </span>
            ))}
          </div>
        )}

        {!cardCompactView && (
          <div className="flex items-center gap-3 text-xs opacity-70 flex-wrap">
            {totalTasks > 0 && (
              <div className="flex items-center gap-1">
                <CheckSquare size={14} />
                <span>{completedTasks}/{totalTasks}</span>
              </div>
            )}
            {card.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-error font-bold' : ''}`}>
                <Calendar size={14} />
                <span>{new Date(card.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            {card.pomodorosSpent > 0 && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{card.pomodorosSpent}🍅</span>
              </div>
            )}
            {showCardAge && cardAge > 0 && (
              <div className="flex items-center gap-1">
                <span>{cardAge}d old</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <span className={`badge badge-sm ${getPriorityColor(card.priority)}`}>
            {card.priority}
          </span>
          {totalTasks > 0 && (
            <div className="flex-1">
              <progress 
                className="progress progress-success h-1 w-full" 
                value={completedTasks} 
                max={totalTasks}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// EditCardModal Component
const EditCardModal = ({
  card,
  onClose,
  onUpdate,
  availableLabels,
}: {
  card: Card;
  onClose: () => void;
  onUpdate: (updates: Partial<Card>) => void;
  availableLabels: any[];
}) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const { addChecklistItem, toggleChecklistItem, deleteChecklistItem, addLabel, removeLabel } = useKanbanStore();
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleSave = () => {
    onUpdate({ title, description, priority, dueDate: dueDate || undefined });
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      addChecklistItem(card.id, newChecklistItem.trim());
      setNewChecklistItem('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-base-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-base-300 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-base-300">
            <h3 className="text-2xl font-bold">Edit Card</h3>
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
              <X size={20} />
            </button>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Title</span></label>
            <input type="text" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Description</span></label>
            <textarea className="textarea textarea-bordered w-full h-24" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a more detailed description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text font-semibold">Priority</span></label>
              <select className="select select-bordered w-full" value={priority} onChange={(e) => setPriority(e.target.value as Card['priority'])}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div>
              <label className="label"><span className="label-text font-semibold">Due Date</span></label>
              <input type="date" className="input input-bordered w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold flex items-center gap-2"><Tag size={16} /> Labels</span></label>
            <div className="flex flex-wrap gap-2 mb-3">
              {card.labels.map((label) => (
                <span key={label.id} className="badge gap-2 px-3 py-3" style={{ backgroundColor: label.color, color: 'white', border: 'none' }}>
                  {label.text}
                  <button onClick={() => removeLabel(card.id, label.id)} className="hover:opacity-70">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableLabels.filter(l => !card.labels.find(cl => cl.id === l.id)).map((label) => (
                <button
                  key={label.id}
                  onClick={() => addLabel(card.id, { id: label.id, text: label.name, color: label.color })}
                  className="btn btn-sm btn-outline gap-2"
                  style={{ borderColor: label.color, color: label.color }}
                >
                  <Tag size={14} />
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold flex items-center gap-2"><CheckSquare size={16} /> Checklist ({card.checklist.filter(i => i.completed).length}/{card.checklist.length})</span></label>
            <div className="space-y-2 mb-3">
              {card.checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2 bg-base-100 rounded-lg border border-base-300">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={item.completed} onChange={() => toggleChecklistItem(card.id, item.id)} />
                  <span className={`flex-1 ${item.completed ? 'line-through opacity-50' : ''}`}>{item.text}</span>
                  <button onClick={() => deleteChecklistItem(card.id, item.id)} className="btn btn-ghost btn-xs text-error">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-sm input-bordered flex-1"
                placeholder="Add checklist item..."
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
              />
              <button onClick={handleAddChecklistItem} className="btn btn-sm btn-primary gap-2">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-base-300">
            <button onClick={handleSave} className="btn btn-primary flex-1 gap-2"><Save size={18} /> Save Changes</button>
            <button onClick={onClose} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// List Component
const KanbanList = ({ list }: { list: List }) => {
  const { cards, addCard, updateCard, deleteCard, updateList, deleteList } = useKanbanStore();
  const { customLabels } = useSettingsStore();
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const listCards = list.cards.map((cardId: string) => cards[cardId]).filter(Boolean);

  const { setNodeRef } = useSortable({
    id: list.id,
    data: { type: 'list' },
  });

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle);
      setNewCardTitle('');
      setShowAddCard(false);
    }
  };

  return (
    <div ref={setNodeRef} className="bg-base-200 rounded-xl p-4 w-80 flex-shrink-0 flex flex-col max-h-full border border-base-300 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-base-300">
        <h2 className="font-bold text-lg">{list.title}</h2>
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-sm">{listCards.length}</span>
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-xs">
              <MoreHorizontal size={16} />
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-300 rounded-lg w-40 z-50 border border-base-300">
              <li><a onClick={() => {
                const newTitle = prompt('Enter new list name:', list.title);
                if (newTitle && newTitle.trim()) updateList(list.id, { title: newTitle.trim() });
              }}><Edit2 size={14} /> Rename</a></li>
              <li><a onClick={() => {
                if (confirm('Delete this list and all its cards?')) {
                  deleteList(list.id);
                }
              }} className="text-error"><Trash2 size={14} /> Delete</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-3 pr-1 custom-scrollbar">
        <SortableContext items={listCards.map((c: Card) => c.id)} strategy={verticalListSortingStrategy}>
          {listCards.map((card: Card, index: number) => (
            <KanbanCard
              key={card.id}
              card={card}
              cardNumber={index + 1}
              onEdit={() => setEditingCard(card)}
              onDelete={() => deleteCard(card.id)}
            />
          ))}
        </SortableContext>
      </div>

      {showAddCard ? (
        <div className="bg-base-100 p-3 rounded-lg border border-primary/50 shadow-md">
          <textarea
            placeholder="Enter card title..."
            className="textarea textarea-bordered w-full resize-none"
            rows={2}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              } else if (e.key === 'Escape') {
                setShowAddCard(false);
                setNewCardTitle('');
              }
            }}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button onClick={handleAddCard} className="btn btn-primary btn-sm flex-1">Add</button>
            <button onClick={() => {
              setShowAddCard(false);
              setNewCardTitle('');
            }} className="btn btn-ghost btn-sm"><X size={16} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAddCard(true)} className="btn btn-ghost btn-sm justify-start gap-2 hover:bg-base-300">
          <Plus size={16} /> Add Card
        </button>
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onUpdate={(updates) => {
            updateCard(editingCard.id, updates);
            setEditingCard(null);
          }}
          availableLabels={customLabels}
        />
      )}
    </div>
  );
};

// Main Kanban Component
const Kanban = () => {
  const { lists, addList, moveCard } = useKanbanStore();
  const { enableDragDrop } = useSettingsStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showAddList, setShowAddList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { distance: 5, delay: 100, tolerance: 5 } 
    }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !enableDragDrop) return;

    if (active.id !== over.id) {
      const activeList = lists.find(list => list.cards.includes(active.id as string));
      const overList = lists.find(list => list.cards.includes(over.id as string)) || lists.find(list => list.id === over.id);

      if (activeList && overList) {
        const newPosition = overList.cards.indexOf(over.id as string);
        moveCard(active.id as string, activeList.id, overList.id, newPosition >= 0 ? newPosition : 0);
      }
    }
    setActiveId(null);
  };

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle.trim());
      setNewListTitle('');
      setShowAddList(false);
    }
  };

  return (
    <div className="h-full p-6 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-sm opacity-60 mt-1">{lists.length} lists • {Object.keys(useKanbanStore.getState().cards).length} cards</p>
        </div>
        <button onClick={() => setShowAddList(true)} className="btn btn-primary gap-2">
          <Plus size={20} /> Add List
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
          collisionDetection={rectIntersection}
        >
          <div className="flex gap-4 h-full pb-4">
            {lists.map((list) => (
              <KanbanList key={list.id} list={list} />
            ))}

            {showAddList && (
              <div className="bg-base-200 rounded-xl p-4 w-80 flex-shrink-0 border-2 border-primary shadow-lg">
                <input
                  type="text"
                  placeholder="Enter list title..."
                  className="input input-bordered w-full mb-3"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddList();
                    if (e.key === 'Escape') {
                      setShowAddList(false);
                      setNewListTitle('');
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button onClick={handleAddList} className="btn btn-primary btn-sm flex-1">Add List</button>
                  <button onClick={() => {
                    setShowAddList(false);
                    setNewListTitle('');
                  }} className="btn btn-ghost btn-sm"><X size={16} /></button>
                </div>
              </div>
            )}
          </div>
          <DragOverlay dropAnimation={{duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'}}>
            {activeId ? (
              <div className="opacity-90 scale-105 rotate-3">
                <div className="card bg-base-100 shadow-2xl w-80 p-4 border-2 border-primary">
                  <p className="font-semibold">Dragging...</p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Kanban;
