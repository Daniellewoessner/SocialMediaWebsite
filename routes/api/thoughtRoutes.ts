import { Router } from 'express';
import { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  removeReaction 
} from '../../controllers/thoughtControllers.js';

const router = Router();

// GET all thoughts
router.get('/', getAllThoughts);

// GET single thought
router.get('/:id', getThoughtById);

// POST new thought
router.post('/', createThought);

// PUT update thought
router.put('/:id', updateThought);

// DELETE thought
router.delete('/:id', deleteThought);

// POST reaction 
router.post('/:thoughtId/reactions', addReaction);

// DELETE reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;