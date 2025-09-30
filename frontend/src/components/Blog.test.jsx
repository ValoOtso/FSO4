import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("title");
  const inputAuthor = screen.getByPlaceholderText("author");
  const inputURL = screen.getByPlaceholderText("url");
  const sendButton = screen.getByText("save");

  await userEvent.type(inputTitle, "testing title...");
  await userEvent.type(inputAuthor, "testing author...");
  await userEvent.type(inputURL, "testing url...");
  await userEvent.click(sendButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing title...");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author...");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url...");
});

test("clicking the button twice calls event handler twice", async () => {
  const blog = {
    title: "otsikko",
    author: "tekija",
    url: "url",
    likes: 0,
    user: {
      name: "valo",
    },
    id: "6899c619d496d229a619bfaa",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} />);

  const button = screen.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("clicking the button shows all the information", async () => {
  const blog = {
    title: "otsikko",
    author: "tekija",
    url: "url",
    likes: 0,
    user: {
      name: "valo",
    },
    id: "6899c619d496d229a619bfaa",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const element = screen.getByText(/url/i);
  expect(element).toBeDefined();

  const element2 = screen.getByText(/tykkäykset/i);
  expect(element2).toBeDefined();

  const element3 = screen.getByText(/lisännyt/i);
  expect(element3).toBeDefined();
});

test("renders title", () => {
  const blog = {
    title: "otsikko",
    author: "tekija",
    url: "url",
    likes: 0,
    user: {
      name: "valo",
    },
    id: "6899c619d496d229a619bfaa",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(/otsikko/i);
  expect(element).toBeDefined();
});
