import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import SearchBar from '../components/SearchBar';
import { Plus, FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { success, error } = useToast();

  const fetchNotes = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setNotes(data || []);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, error]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSave = async (note) => {
    try {
      if (note.id) {
        const { data, error: updateError } = await supabase
          .from('notes')
          .update({
            title: note.title,
            content: note.content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', note.id)
          .select()
          .maybeSingle();

        if (updateError) throw updateError;

        setNotes((n) => n.map((x) => (x.id === note.id ? data : x)));
        success('Note updated successfully');
      } else {
        const { data, error: insertError } = await supabase
          .from('notes')
          .insert({
            title: note.title,
            content: note.content,
            user_id: user.id,
          })
          .select()
          .maybeSingle();

        if (insertError) throw insertError;

        setNotes((n) => [data, ...n]);
        success('Note created successfully');
      }
      setOpen(false);
      setEditing(null);
    } catch (err) {
      console.error('Failed to save note:', err);
      error(err.message || 'Failed to save note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setNotes((notes) => notes.filter((x) => x.id !== id));
      success('Note deleted successfully');
    } catch (err) {
      console.error('Failed to delete note:', err);
      error('Failed to delete note');
    }
  };

  const handleEdit = (note) => {
    setEditing(note);
    setOpen(true);
  };

  const handleNewNote = () => {
    setEditing(null);
    setOpen(true);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 w-full">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <button
          onClick={handleNewNote}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white rounded-lg hover:from-slate-800 hover:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-md hover:shadow-lg font-medium whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 mb-4">
            <FileText className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Get started by creating your first note'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleNewNote}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white rounded-lg hover:from-slate-800 hover:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-md font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Note</span>
            </button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NoteCard
                note={note}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note.id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Note Form Modal */}
      {open && (
        <NoteForm
          note={editing}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}