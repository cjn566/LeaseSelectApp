var Slider = function(props){
    return (
        <div>
            <label>{props.desc}</label>
            <input
                className="slider"
                id={props.id}
                type="range"
                onChange={props.onAdjust}
                value={props.value}
                width="90%"
            />
            <span>
                    {props.value}
                </span>
        </div>
    );
};

module.exports = React.createClass({
    componentDidMount: function(){
        this.props.updateWeights(
            this.state.relations,
            this.state.recent,
            this.state.totalUse,
        );
    },
    getInitialState: function(){
        return({
            relations: 100,
            recent: 100,
            totalUse: 100,
        });
    },
    onAdjust: function(e){
        clearTimeout(this.timeoutID);
        this.state[e.target.id] = parseInt(e.target.value);
        this.forceUpdate(()=>{
            this.timeoutID = setTimeout(this.props.updateWeights, 150,
                this.state.relations,
                this.state.recent,
                this.state.totalUse);
        });
    },
    render: function(){
        return(
            <form>
                <Slider id="relations" desc="Most historically associated with currently selected leases" value={this.state.relations} onAdjust={this.onAdjust}/>
                <Slider id="recent" desc="Most recently used" value={this.state.recent} onAdjust={this.onAdjust}/>
                <Slider id="totalUse" desc="Most used" value={this.state.totalUse} onAdjust={this.onAdjust}/>
            </form>
        );
    }
});