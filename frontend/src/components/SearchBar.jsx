import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes by title or content..."
        className="w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </motion.button>
      )}
    </div>
  );
}