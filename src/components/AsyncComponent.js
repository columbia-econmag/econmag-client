import React, { Component } from "react";
import { FcSynchronize } from "react-icons/fc";
import { Spinner } from "react-bootstrap";
import "./LoaderButton.css";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? (
        <C {...this.props} />
      ) : (
        <div className="item" style={{ marginTop: "5%", textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
  }

  return AsyncComponent;
}
