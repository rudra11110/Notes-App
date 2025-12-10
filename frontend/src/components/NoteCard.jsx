import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function NoteCard({ note, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-200 group"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            {note.title || 'Untitled Note'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4 mb-3 leading-relaxed">
            {note.content || 'No content'}
          </p>
          {note.created_at && (
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(note.created_at)}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 justify-end pt-3 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
            aria-label="Edit note"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}