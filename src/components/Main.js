require('normalize.css/normalize.css');
require('styles/main.less');

import React from 'react';

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
  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{// 水平方向的取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]//左右侧y取值范围都一样
    },
    vPosRange: {    // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
    }
  },
  //组件加载完成后，为每张图计算其位置的范围
  componentDidMount:function(){

    //先拿到舞台大小
    var stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);

    //拿到一个imageFigure的大小
    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0);
  },

	render() {
		var controllerUnits = [],
			ImgFigures = [];

			imagesData.forEach(function (value,index) {
				ImgFigures.push(<ImgFigure data={value} refs={"imgFigure"+index}/>);
			});
		return (
			<section className="stage" ref="stage">
  			<section className="img-sec">
  			{ImgFigures}
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
