// src/molecules/TaskModalForm.tsx
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import { addTask, updateTask, Task } from "#modules/tasks/tasks.reducer.ts";
import { addTaskToProject } from "#modules/projects/project.reducer.ts";
import moment from "moment";

interface TaskModalFormProps {
  visible: boolean;
  onClose: () => void;
  projectId: number;
  taskToEdit?: Task;
}

const TaskModalForm: React.FC<TaskModalFormProps> = ({
  visible,
  onClose,
  projectId,
  taskToEdit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (taskToEdit) {
      form.setFieldsValue({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate ? moment(taskToEdit.dueDate) : null,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
      });
    } else {
      form.resetFields();
    }
  }, [taskToEdit, form]);

  const onFinish = (values: any) => {
    if (taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        title: values.title,
        description: values.description,
        dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
        status: values.status,
        priority: values.priority,
      };
      dispatch(updateTask(updatedTask));
      api.success({
        message: "Tarea Actualizada",
        description: "La tarea se actualizó correctamente.",
      });
    } else {
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
      api.success({
        message: "Tarea Agregada",
        description: "La tarea se agregó correctamente.",
      });
    }

    form.resetFields();
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={taskToEdit ? "Editar Tarea" : "Agregar Tarea"}
        open={visible}
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
              {taskToEdit ? "Actualizar Tarea" : "Agregar Tarea"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskModalForm;
