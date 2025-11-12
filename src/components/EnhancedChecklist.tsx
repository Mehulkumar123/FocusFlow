// components/EnhancedChecklist.tsx - FIXED VERSION
import { useState } from 'react';
import { Plus, Trash2, GripVertical, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ChecklistItem } from '../stores/kanbanStore'; // ✅ FIXED: type-only import

interface EnhancedChecklistProps {
  items: ChecklistItem[];
  onAddItem: (text: string) => void;
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateItem?: (itemId: string, text: string) => void;
  showProgress?: boolean;
}

const EnhancedChecklist = ({
  items,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onUpdateItem,
  showProgress = true
}: EnhancedChecklistProps) => {
  const [newItemText, setNewItemText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(newItemText.trim());
      setNewItemText('');
    }
  };

  const handleStartEdit = (item: ChecklistItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveEdit = (itemId: string) => {
    if (onUpdateItem && editText.trim()) {
      onUpdateItem(itemId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-3">
      {/* Header with Progress - NO PULSING */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-ghost btn-xs btn-square"
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          <h4 className="font-semibold text-sm">
            Checklist
            {totalCount > 0 && (
              <span className="ml-2 text-xs opacity-60">
                {completedCount}/{totalCount}
              </span>
            )}
          </h4>
        </div>
        {showProgress && totalCount > 0 && (
          <span className={`text-xs font-bold ${progress === 100 ? 'text-success' : 'text-primary'}`}>
            {progress.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Progress Bar - NO ANIMATION */}
      {showProgress && totalCount > 0 && (
        <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${progress === 100 ? 'bg-success' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!collapsed && (
        <>
          {/* Checklist Items */}
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {items.length === 0 ? (
              <p className="text-xs text-center py-4 opacity-60">
                No items yet. Add your first task!
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-300 transition-colors group ${
                    item.completed ? 'opacity-60' : ''
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab opacity-0 group-hover:opacity-50 transition-opacity">
                    <GripVertical size={14} />
                  </div>

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggleItem(item.id)}
                    className="checkbox checkbox-sm checkbox-primary"
                  />

                  {/* Text or Edit Input */}
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, () => handleSaveEdit(item.id))}
                      onBlur={() => handleSaveEdit(item.id)}
                      className="input input-sm input-bordered flex-1 text-xs"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 text-sm cursor-pointer select-none ${
                        item.completed ? 'line-through opacity-50' : ''
                      }`}
                      onClick={() => onToggleItem(item.id)}
                    >
                      {item.text}
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onUpdateItem && editingId !== item.id && (
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="btn btn-ghost btn-xs btn-square"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="btn btn-ghost btn-xs btn-square hover:text-error"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Item */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddItem)}
              placeholder="Add checklist item..."
              className="input input-sm input-bordered flex-1 text-xs"
            />
            <button
              onClick={handleAddItem}
              disabled={!newItemText.trim()}
              className="btn btn-sm btn-primary"
            >
              <Plus size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedChecklist;
