const router = require('express').Router();
const projectController = require("../controllers/projects-controller");
const projectsMiddleware = require("../middlewares/ProjectsMiddleware")

router.post("/add-project",projectsMiddleware.addProject, projectController.addProject);
router.get("/get-project/:id",projectController.getProject);
router.get("/get-projects", projectController.getProjects)
router.put("/update-project",projectsMiddleware.updateProject, projectController.updateProject);
router.delete("/del-project/:id",projectsMiddleware.delProject, projectController.delProject);

module.exports = router;