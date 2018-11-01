import React from "react";

function WithPolling(WrappedComponent, callback, params) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.timeout = null;
      this.startPolling = this.startPolling.bind(this);
      this.stopPolling = this.stopPolling.bind(this);
      this.onPoll = this.onPoll.bind(this);

      this.state = {
        data: []
      };
    }

    onPoll() {
      callback(params)
        .then(response => response.json())
        .then(json => {
          this.setState(
            {
              data: json
            },
            () => {
              this.startPolling();
            }
          );
        });
    }

    startPolling() {
      this.stopPolling();
      // Note: onPoll calls this.startPolling, establishing recursion
      this.timeout = setTimeout(this.onPoll, params.interval);
    }

    stopPolling() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }

    componentDidMount() {
      this.onPoll();
    }

    componentWillUnmount() {
      this.stopPolling();
    }

    render() {
      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  };
}

export default WithPolling;
