import React from "react";
import { Card, Tag } from "antd";
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
  const priorityTag = (priority: "Baja" | "Media" | "Alta") => {
    const emojis = {
      Baja: "green",
      Media: "yellow",
      Alta: "red",
    };
    const colors = {
      Baja: "🍃",
      Media: "😯",
      Alta: "🔥",
    };
    const priorityColor = emojis[priority];
    const PriorityEmoji = colors[priority];
    return (
      <div className="flex flex-row items-center gap-4 text-xs">
        <p>Prioridad: </p>
        <Tag color={priorityColor}>
          {priority}
          {"  "}
          {PriorityEmoji}
        </Tag>
      </div>
    );
  };
  const stateTag = (state: "Pendiente" | "Completada") => {
    const statusColor = state === "Pendiente" ? "orange" : "green";
    const statusEmoji = state === "Pendiente" ? "😟" : "✅";
    return (
      <div className="flex flex-row items-center gap-4 text-xs">
        <p>Estado: </p>
        <Tag color={statusColor}>
          {state}
          {"  "}
          {statusEmoji}
        </Tag>
      </div>
    );
  };
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
      <div
        className="flex flex-col justify-between gap-2"
        onClick={() => onEditClick(task.id)}
      >
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <div className="text-start">
            <p className="text-xs">
              Vence: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
        )}
        {task.priority && priorityTag(task.priority)}
        {task.status && stateTag(task.status)}
      </div>
    </Card>
  );
};

export default TaskCard;
