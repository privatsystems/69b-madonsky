import React, { Component } from "react"

const TableContext = React.createContext()

class TableProvider extends Component {

    state = {
        selectLabelIndex: 3,
        labeldirection: 'down',
        labelUp: false,
        selectLine: null,
        imagesMode: false
    }

    setSelectLabelIndex = (num) => {
        this.setState({ selectLabelIndex: num })
    }

    setLabelDirection = (string) => {
        this.setState({ labeldirection: string })
    }

    setLabelUp = (bool) => {
        this.setState({ labelUp: bool })
    }

    setSelectLine = (num) => {
        this.setState({ selectLine: num })
    }

    setImagesMode = (bool) => {
        this.setState({ imagesMode: bool })
    }

    render() {
        return (
            <TableContext.Provider
                value={{
                    ...this.state,
                    setSelectLabelIndex: this.setSelectLabelIndex,
                    setLabelUp: this.setLabelUp,
                    setSelectLine: this.setSelectLine,
                    setLabelDirection: this.setLabelDirection,
                    setImagesMode: this.setImagesMode
                }}
            >
                {this.props.children}
            </TableContext.Provider>
        );
    }
}
const TableConsumer = TableContext.Consumer;
export { TableConsumer, TableContext };
export default TableProvider;