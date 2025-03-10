import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ButtonIcon from "./ButtonIcon";

describe("ButtonIcon", () => {
  it("call to onClick", () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<ButtonIcon onClick={onClickMock} />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
