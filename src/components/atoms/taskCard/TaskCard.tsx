import React from "react";
import { Card } from "antd";
import { Task } from "#modules/tasks/tasks.reducer.ts";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface TaskCardProps {
  task: Task;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Card
      title={task.title}
      hoverable
      style={{ width: 300, cursor: "pointer" }}
      actions={[
        <EditOutlined key="edit" onClick={() => onEditClick(task.id)} />,
        <DeleteOutlined key="delete" onClick={() => onDeleteClick(task.id)} />,
      ]}
    >
      <div onClick={() => onEditClick(task.id)}>
        {task.description && <p>{task.description}</p>}
        <p>Estado: {task.status}</p>
        <p>Prioridad: {task.priority}</p>
        {task.dueDate && (
          <p>Vence: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
