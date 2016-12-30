module.exports = React.createClass({
    getInitialState: function() {
        return {
            text:""
        };
    },
    handleTextChange: function(e) {
        this.props.handleTextChange(e.target.value);
        this.setState({text: e.target.value});
    },
    handleSubmit: function() {
        this.props.acceptLease(this.state.text);
        this.clear();
    },
    clear: function(){
        this.props.handleTextChange("");
        this.setState({text: ""});
    },
    render: function(){
        return(
            <form className="form-inline">
                <textarea
                    className="form-control"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    placeholder="Lease Number"
                />
                <button
                    className="btn btn-success"
                    disabled={this.state.text==""}
                    onClick={this.handleSubmit}
                >
                    Add
                </button>
            </form>
        );
    }
});
