import RadioFilter from "#atoms/radioFilter/RadioFilter.tsx";
import React, { useState } from "react";

interface TaskFiltersProps {
  onFiltersChange: (filters: {
    status: string;
    priority: string;
    orderBy: string;
  }) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFiltersChange }) => {
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [orderBy, setOrderBy] = useState("recent");

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFiltersChange({ status: value, priority, orderBy });
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
    onFiltersChange({ status, priority: value, orderBy });
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value);
    onFiltersChange({ status, priority, orderBy: value });
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <div></div>
      <RadioFilter
        label="Estado"
        value={status}
        onChange={handleStatusChange}
        options={[
          { value: "all", label: "Todos" },
          { value: "Pendiente", label: "Pendiente" },
          { value: "Completada", label: "Completada" },
        ]}
      />

      <RadioFilter
        label="Prioridad"
        value={priority}
        onChange={handlePriorityChange}
        options={[
          { value: "all", label: "Todas" },
          { value: "Baja", label: "Baja" },
          { value: "Media", label: "Media" },
          { value: "Alta", label: "Alta" },
        ]}
      />

      <RadioFilter
        label="Ordenar por"
        value={orderBy}
        onChange={handleOrderByChange}
        options={[
          { value: "recent", label: "Más reciente" },
          { value: "oldest", label: "Más antigua" },
        ]}
      />
    </div>
  );
};

export default TaskFilters;
