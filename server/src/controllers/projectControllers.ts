import { Request, Response } from "express";
import { ProjectRepository } from "../models/repositories/projectRepository";
import { commonMessages, httpStatus } from "../utils/common";
import { todoRepository } from "../models/repositories/todoRepository";
import { ProjectServices } from "../services/projectServices";

export class ProjectControllers {
    private projectService = new ProjectServices();
    private todoRepo = new todoRepository();
    private statusCode = new httpStatus;
    private messages = new commonMessages;

    createProject = async (req: Request, res: Response) => {
        try {
            const {title, todos} = req.body;
            if(!title) {
                console.error("Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const newProject = await this.projectService.createProject(title);
            if(newProject) {
                const newTodo = await this.todoRepo.createTodo(todos);
                newProject.todos.push(newTodo);

                console.info("Project Created Successfully!");
                return res.status(this.statusCode.SUCCESS).send(newProject);
            }
        } catch (error) {
            console.error("Error Registering User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    getProjects = async (req: Request, res: Response) => {
        try {
            const {_id} = req.query;

            if(_id) {
                const project = await this.projectService.getSpecificProject(_id as string);
                console.info("Project Fetched Successfully!");
                return res.status(this.statusCode.SUCCESS).send(project);
            }
            const allProjects = await this.projectService.getAllProject();

            console.info("Project Fetched Successfully!");
            return res.status(this.statusCode.SUCCESS).send(allProjects);
        } catch (error) {
            console.error("Error Registering User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }
}