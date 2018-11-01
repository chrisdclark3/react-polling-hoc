import React from "react";

function WithPolling(WrappedComponent, callback, params) {
  return class extends React.Component {
    
    constructor(props) {
      super(props);
      this.timeout = null;
      this.date = null;
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
          this.setState({
              data: json
          }, () => {
              clearTimeout(this.timeout);
              this.startPolling();
            });
        });
    }

    startPolling() {
      this.date = Date.now();
      this.timeout = setTimeout(this.onPoll, params.interval);
    }

    stopPolling() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    }

    componentDidMount() {
      this.startPolling();
    }

    componentWillUnmount() {
      this.stopPolling()
    }

    render() {
      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  };
}

export default WithPolling;
