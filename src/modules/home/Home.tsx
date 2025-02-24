import {
  InfoCircleOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 ">
            Bienvenido a Mi Aplicación
          </h2>
          <p className=" mb-6">
            Una aplicación web de gestión de tareas que permite a los usuarios
            administrar sus proyectos y tareas.
          </p>
          <Button
            onClick={() => navigate("/projects")}
            type="primary"
            size="large"
          >
            Comenzar
          </Button>
        </section>

        <section>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <ProjectOutlined className="mr-2 " />
                    Gestión de Proyectos
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <p className="">
                  Crear, renombrar y eliminar proyectos, organizando las tareas
                  dentro de cada uno.
                </p>
                <ul className="mt-2 list-disc ml-5 ">
                  <li>Crear</li>
                  <li>Editar</li>
                  <li>Eliminar</li>
                  <li>Renombrar</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <InfoCircleOutlined className="mr-2 text-green-500" />
                    Gestión de Tareas
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <p className="">
                  Cada tarea cuenta con título (obligatorio), descripción, fecha
                  de vencimiento, estado y prioridad.
                </p>
                <ul className="mt-2 list-disc ml-5 ">
                  <li>Crear</li>
                  <li>Editar</li>
                  <li>Eliminar</li>
                  <li>Marcar como completada</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <CheckCircleOutlined className="mr-2 text-purple-500" />
                    Filtros y Ordenación
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <p className="">
                  Filtrar tareas por estado (pendiente/completada) y prioridad,
                  y ordenarlas por fecha de vencimiento.
                </p>
                <ul className="mt-2 list-disc ml-5 ">
                  <li>Estado: pendiente / completado</li>
                  <li>Prioridad: Baja, Media, Alta</li>
                  <li>Fecha: ordenar de más reciente a más antigua</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <InfoCircleOutlined className="mr-2 text-red-500" />
                    Persistencia de Datos
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <p className="">
                  Se cuenta con persistencia de datos a través del local
                  storage.
                </p>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <SettingOutlined className="mr-2 text-indigo-500" />
                    UI/UX y Accesibilidad
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <ul className="mt-2 list-disc ml-5 ">
                  <li>Diseño limpio y responsive</li>
                  <li>Feedback visual y loaders</li>
                  <li>Navegación mediante teclado</li>
                  <li>Compatibilidad con tecnologías asistivas</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title={
                  <span className="flex items-center">
                    <SettingOutlined className="mr-2 text-yellow-500" />
                    Stack Técnico
                  </span>
                }
                bordered={false}
                className="shadow-lg"
              >
                <ul className="mt-2 list-disc ml-5 ">
                  <li>
                    <strong>Frameworks:</strong> React (vite, ts)
                  </li>
                  <li>
                    <strong>Gestión de Estado:</strong> Redux
                  </li>
                  <li>
                    <strong>Estilos:</strong> TailwindCSS, CSS nativo
                  </li>
                  <li>
                    <strong>Router:</strong> React Router
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>
        </section>
      </main>
    </div>
  );
};

export default Home;
