import React from 'react';

import { Header } from "./header";

class Unknown extends React.Component {

	render() {

		return <Header 
			image={this.props.app.getBook().getSpecification() ? this.props.app.getBook().getImage("unknown") : null } 
			header="Uh oh."
			content={this.props.message}
		/>

	}

}

export {Unknown};