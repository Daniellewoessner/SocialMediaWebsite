import Thought from '../Models/Thought.js';
import User from '../Models/User.js';

// Controller methods for Thoughts
export const getAllThoughts = async (_req: any, res: { json: (arg0: any) => void; }) => {
  const allThoughts = await Thought.find();
  res.json(allThoughts);
};

export const getThoughtById = async (req: { params: { id: any; }; }, res: { json: (arg0: any) => void; }) => {
  const thought = await Thought.findById(req.params.id);
  res.json(thought);
};

export const createThought = async (req: { body: { userId: any; }; }, res: { json: (arg0: any) => void; }) => {
  const thought = await Thought.create(req.body);
  const user = await User.findById(req.body.userId);
  if (user) {
    user.thoughts.push(thought._id as any);
    await user.save();
  }
  res.json(thought);
};

export const updateThought = async (req: { params: { id: any; }; body: any; }, res: { json: (arg0: any) => void; }) => {
  const thought = await Thought.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(thought);
};

export const deleteThought = async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; }) => void; }) => {
  const user = await User.findOne({ thoughts: req.params.id });
  if (user) {
    user.thoughts = user.thoughts.filter((thoughtId: any) => thoughtId.toString() !== req.params.id);
    await user.save();
  }
  await Thought.findByIdAndDelete(req.params.id);
  res.json({ message: 'Thought deleted!' });
};

export const addReaction = async (req: { params: { thoughtId: any; }; body: any; }, res: {
  status(arg0: number): { json: (arg0: any) => void }; json: (arg0: any) => void;
}) => {
  const thought = await Thought.findById(req.params.thoughtId);
  if (thought) {
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } else {
    res.status(404).json({ message: 'Thought not found' });
  }
};

export const removeReaction = async (req: { params: { thoughtId: any; reactionId: any; }; }, res: {
  status(arg0: number): { json: (arg0: any) => void }; json: (arg0: any) => void;
}) => {
  const thought = await Thought.findById(req.params.thoughtId);
  if (thought) {
    thought.reactions.pull({ reactionId: req.params.reactionId });
    await thought.save();
    res.json(thought);
  } else {
    res.status(404).json({ message: 'Thought not found' });
  }
};