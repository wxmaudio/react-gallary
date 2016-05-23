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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
	      <section>
	      </section>
	      <nav></nav>
      </section>
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />erewe
        <div className="notice">Pleasebh edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
