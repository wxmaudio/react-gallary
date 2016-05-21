require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');


class ImgFigure extends React.Component {
	render(){
		return(
			<figure className="img-figure">
			  <img src={this.props.data.imageURL}
			  art={this.props.data.title}/>
			  <figcaption className="img-title">{this.props.data.title}</figcaption>
			</figure>
			);
	}

}

class GalleryByReactApp extends React.Component {
	render() {
		var controllerUnits = [],
			ImgFigure = [];

			imageDatas.forEach(function (value) {
				ImgFigure.push(<ImgFigure data={value}/>);
			});
		return (
			<section className="stage">
			<section className="img-sec">
			{ImgFigure}
			</section>
			<nav className="controller-nav">
			{controllerUnits}
			</nav>

			</section>
			);
	}
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
