
/*------------------------------
HOC for dispatching appropriate data
*/
const WhiteLevelCheckHoc = WrappedContent => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                data: {},
                overRide: false
            };
        }

        componentDidMount() {
            this.props.getUser().then(data => {
                this.state.data = data;

                if (data.type === "white-label") {
                    // allow overriding
                    this.state.overRide = true;
                }

                this.setState(this.state);
            });
        }

        render() {
            return <WrappedContent {...this.props} {...this.state} />;
        }
    };
};


/*------------------------------
Main App
*/
class App extends Component {
    render() {
        return (
            <header
                style={this.props.overRide ? this.props.data.header.style : ""}
            >
                {this.props.overRide
                    ? this.props.data.header.title
                    : "Company Name"}
            </header>
        );
    }
}

export default WhiteLevelCheckHoc(App);