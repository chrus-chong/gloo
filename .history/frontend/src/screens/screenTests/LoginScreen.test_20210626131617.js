import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginScreen from "../LoginScreen";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Product loads correctly", () => {
  let store;
  let screen;

  beforeEach(() => {
    store = mockStore({
      userLogin: {
        userInfo: {
          _id: "60d55c4cd97a74d6bd80cb1f",
          name: "Admin user",
          email: "admin@example.com",
          isAdmin: true,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDU1YzRjZDk3YTc0ZDZiZDgwY2IxZiIsImlhdCI6MTYyNDYwODQxNSwiZXhwIjoxNjI3MjAwNDE1fQ.jLddueQAfN_TjOzXyZmoYF0o2iMqZxxjYforbICAXBI",
        },
      },
    });
    store.dispatch = jest.fn();

    screen = render(
      <Provider store={store}>
        <Router>
          <LoginScreen location={null} history={null} />
        </Router>
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    const title = screen.getByText("Sign In");
    expect(title).toBeTruthy();
  });
});
