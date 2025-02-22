import React from "react";
import { Card } from "antd";
import { Task } from "#modules/tasks/tasks.reducer.ts";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card
      title={task.title}
      hoverable
      style={{ width: 300, margin: "1rem", cursor: "pointer" }}
    >
      {task.description && <p>{task.description}</p>}
      <p>Estado: {task.status}</p>
      <p>Prioridad: {task.priority}</p>
      {task.dueDate && (
        <p>Vence: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
    </Card>
  );
};

export default TaskCard;
