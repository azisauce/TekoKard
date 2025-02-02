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

exports.findTeam = async (req, res) => {
    try {
        const { teamTag } = req.params;
        const team = await teamService.findTeamByTeamTag({tag: teamTag});
        if (!team) {
            return res.status(400).json({ error: 'No team found' });
        } else {
            res.json(team);
        }
    } catch (error) {
        console.error('Find team error:', error.message);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};