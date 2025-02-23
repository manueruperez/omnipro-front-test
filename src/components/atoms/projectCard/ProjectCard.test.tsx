import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

describe("ProjectCard", () => {
  const project = {
    id: 1,
    name: "Test Project",
    description: "This is a test project",
  };

  it("correct render into project info", () => {
    const { getByText } = render(
      <ProjectCard
        project={project}
        onClick={() => {}}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
    );

    expect(getByText("Test Project")).toBeInTheDocument();
    expect(getByText("This is a test project")).toBeInTheDocument();
  });

  it("call on click when clicked on meta container", () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <ProjectCard
        project={project}
        onClick={onClickMock}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
    );

    const titleElement = getByText("Test Project");
    fireEvent.click(titleElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it(" call on onEditClick when click the edit icon", () => {
    const onEditMock = vi.fn();
    const { container } = render(
      <ProjectCard
        project={project}
        onClick={() => {}}
        onEditClick={onEditMock}
        onDeleteClick={() => {}}
      />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(icons[0]);
    expect(onEditMock).toHaveBeenCalledWith(project.id);
  });

  it("call onDeleteClick when cilck in delete icon", () => {
    const onDeleteMock = vi.fn();
    const { container } = render(
      <ProjectCard
        project={project}
        onClick={() => {}}
        onEditClick={() => {}}
        onDeleteClick={onDeleteMock}
      />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(icons[1]);
    expect(onDeleteMock).toHaveBeenCalledWith(project.id);
  });
});
