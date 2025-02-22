// src/molecules/TaskModalForm.tsx
import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { addTask, Task } from "#modules/tasks/tasks.reducer.ts"; // Ajusta la ruta
import { addTaskToProject } from "#modules/projects/project.reducer.ts"; // Ajusta la ruta

interface TaskModalFormProps {
  visible: boolean;
  onClose: () => void;
  projectId: number;
}

const TaskModalForm: React.FC<TaskModalFormProps> = ({
  visible,
  onClose,
  projectId,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const taskData: Omit<Task, "id"> = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
      status: values.status,
      priority: values.priority,
    };

    const actionResult = dispatch(addTask(taskData));
    const newTaskId = actionResult.payload.id;

    dispatch(addTaskToProject({ projectId, taskId: newTaskId }));

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Agregar Tarea"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Por favor ingresa un título" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Descripción">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="dueDate" label="Fecha de vencimiento">
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="status"
          label="Estado"
          initialValue="Pendiente"
          rules={[{ required: true, message: "Selecciona el estado" }]}
        >
          <Select>
            <Select.Option value="Pendiente">Pendiente</Select.Option>
            <Select.Option value="Completada">Completada</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="Prioridad"
          rules={[{ required: true, message: "Selecciona la prioridad" }]}
        >
          <Select>
            <Select.Option value="Baja">Baja</Select.Option>
            <Select.Option value="Media">Media</Select.Option>
            <Select.Option value="Alta">Alta</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModalForm;
