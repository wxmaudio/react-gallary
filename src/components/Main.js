require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
//获得图片数据
let imagesData = require('../data/imageData.json');

//利用自执行函数，获得图片的URL
imagesData =(function GenerateImageURL(imagesDataArr){
   for(let i = 0 ;i< imagesDataArr.length;i++){
   	  imagesDataArr[i].imageURL = require('../images/' + imagesDataArr[i].fileName);
   }
   return imagesDataArr;
})(imagesData);


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
