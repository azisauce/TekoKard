const teamService = require('../../business/services/team.service');

exports.createTeam = async (req, res) => {
    try {
        const { name, tag, userId } = req.body;
        console.log(req.body);
        if (!name || !tag) {
            return res.status(400).json({ error: 'Name and tag are required' });
        }

        const result = await teamService.createTeam({ name, tag, userId });
        res.json(result);
    } catch (error) {
        console.error('Create team error:', error.message);
        if (error.message.includes('teams_tag_unique')) {
            return res.status(400).json({ error: 'This team tag is already in use' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};