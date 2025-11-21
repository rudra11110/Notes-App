import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const note = await Note.create({ 
      title: title.trim(), 
      content: content.trim(), 
      userId: req.user.id 
    });
    
    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ 
      where: { userId: req.user.id }, 
      order: [['createdAt', 'DESC']] 
    });
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const note = await Note.findByPk(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    if (note.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await note.update({ 
      title: title.trim(), 
      content: content.trim() 
    });
    
    res.json(note);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    if (note.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await note.destroy();
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};