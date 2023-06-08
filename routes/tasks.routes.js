const { Router } = require('express');
const tasksController = require('../controllers/tasks.controller.js');

const router = Router();

router.route('/').get(tasksController.index).post(tasksController.create);
router.route('/:id').get(tasksController.show).patch(tasksController.update).delete(tasksController.destroy);

module.exports = router;
