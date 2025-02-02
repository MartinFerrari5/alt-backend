import { updateTaskService } from "../services/tasks/tasks.service.js";

async function updateStatusController(req,res,next) {
    try {

        const { task_id } = req.params;
        console.log(task_id)
        await updateTaskService(task_id,req.body,req.user);

        res.status(200).json({ message: "Tarea exportada" });
    }catch(error){
        res.status(error.status || 500).json(error.message);
    }
}

export {updateStatusController}