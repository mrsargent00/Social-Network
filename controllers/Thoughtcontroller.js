const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate({ username: thought.username }, { $push: { thoughts: thought._id } });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });
            await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body} },
                { runValidators: true, new: true }
            );
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });
            const reaction = thought.reactions.some(reaction => reaction.reactionId == req.body.reactionId);
            if (!reaction) return res.status(404).json({ message: 'No reaction with that ID found in this thought' });
            await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { runValidators: true, new: true }
            );
            res.json({ message: 'Reaction removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
