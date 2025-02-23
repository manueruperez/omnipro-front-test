import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import RadioFilter from "./RadioFilter";

describe("RadioFilter", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  it("render tag and options", () => {
    const onChangeMock = vi.fn();
    const { getByText } = render(
      <RadioFilter
        label="Test Label"
        value="option1"
        onChange={onChangeMock}
        options={options}
      />
    );

    expect(getByText(/Test Label:/i)).toBeInTheDocument();
    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  it("call onChange with the correct value when option change", () => {
    const onChangeMock = vi.fn();
    const { getByText } = render(
      <RadioFilter
        label="Test Label"
        value="option1"
        onChange={onChangeMock}
        options={options}
      />
    );

    const option2Button = getByText("Option 2");
    fireEvent.click(option2Button);
    expect(onChangeMock).toHaveBeenCalledWith("option2");
  });
});
