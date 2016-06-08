import 'normalize.css/normalize.css';
import 'styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom';

//获得图片数据
let imagesData = require('../data/imageData.json');

//利用自执行函数，获得图片的URL
imagesData =(function GenerateImageURL(imagesDataArr){
   for(let i = 0 ;i< imagesDataArr.length;i++){
      imagesDataArr[i].imageURL = require('../images/' + imagesDataArr[i].fileName);
   }
   return imagesDataArr;
})(imagesData);

  /**
  *  获得一个在(x,y)范围内的随机数
  *  @return {Number}
  */
function getRangeRandom(x,y){

    var start = (x<y)? x : y;
    var result = Math.ceil(start + Math.random()*Math.abs(y-x));
    return result;
  }

/**
   * 获取 0~30° 之间的一个任意正负值
   * @return {[type]} [description]
   */
function get30DegRandom(){
     return ((Math.random()>0.5)? '' :'-') + Math.ceil(Math.random()*30);
}

class ImgFigure extends React.Component {
  imageClick(e){
    console.log(this.props);
    if (!this.props.arrange.isCenter) {
      this.props.center();
    }else{
      this.props.inverse();
    }
    e.stopPropagation();
    e.preventDefault();
  }
  render(){
    let style = {};
    let pos = this.props.arrange.pos;
    style = pos;
    if(this.props.arrange.rotate){
      ['MozTransform','msTransform','WebkitTransform','transform'].forEach(function(value){
          style[value] = 'rotate('+this.props.arrange.rotate+'deg)';
      }.bind(this));
    }
    if(this.props.arrange.isCenter){
      style.zIndex= 11;
    }
    let imgFigureClassName = "img-figure"
    if(this.props.arrange.isInverse){
       imgFigureClassName += " inverse";
    }
    return(
      <figure className={imgFigureClassName} style={style}>
        <img src={this.props.data.imageURL}
        art={this.props.data.title} onClick={this.imageClick.bind(this)}/>
        <figcaption className="img-title">{this.props.data.title}</figcaption>
      </figure>
      );
  }
}


class GalleryByReactApp extends React.Component {
  constructor(){
    super();
    this.Constant = {
      centerPos:{
        left:0,
        top:0
      },
      hRange:{// 水平方向的取值范围
        leftX:[0,0],
        rightX:[0,0],
        y:[0,0]//左右侧y取值范围都一样
      },
      vRange: {    // 垂直方向的取值范围
          x: [0, 0],
          topY: [0, 0]
      }
    }

    this.state = {
      imgsStyleArr:[
       /* {
          pos:{
            left:'0',
            top:'0'
          },
          rotate: 0,    // 旋转角度
          isInverse: false,    // 图片正反面
          isCenter: false    // 图片是否居中
        }*/
      ]
    };
  }

  /**
  * 重排所有图片
  */
  rearrange(index){
    let imgArr = this.state.imgsStyleArr,
        constant = this.Constant;
    //中间图片
    let centerImg = imgArr.splice(index,1);
    centerImg = centerImg.map(function(){
        return{
          pos:{
            left:constant.centerPos.left,
            top:constant.centerPos.top
          },
          rotate: 0,    // 旋转角度
          isInverse: false,    // 图片正反面
          isCenter: true    // 图片是否居中
        }
    })


    //上分区图片的数目，取值[0,2)
    let topNum = Math.ceil(Math.random()*2);
    //上分区图片起始index
    let topIndex = Math.ceil(Math.random()*(imgArr.length - topNum));

    let topImgArr = imgArr.splice(topIndex,topNum);

    topImgArr = topImgArr.map(function(){
       return {
          pos:{
            left:getRangeRandom(
              constant.vRange.x[0],
              constant.vRange.x[1]
              ),
            top:getRangeRandom(
              constant.vRange.topY[0],
              constant.vRange.topY[1]
              )
          },
          rotate: get30DegRandom(),    // 旋转角度
          isInverse: false,    // 图片正反面
          isCenter: false    // 图片是否居中
        }
    }.bind(this));

    //===========左右分区==============//
    let halfLen = Math.ceil(imgArr.length/2);
    imgArr = imgArr.map(function(value,index){
       let xRange;
       if(index < halfLen){//左半分区
          xRange = constant.hRange.leftX;
       }else{//右半分区
          xRange = constant.hRange.rightX;
       }
        return {
          pos:{
            left:getRangeRandom(
              xRange[0],
              xRange[1]
              ),
            top:getRangeRandom(
              constant.hRange.y[0],
              constant.hRange.y[1]
              )
          },
          rotate: get30DegRandom(),    // 旋转角度
          isInverse: false,    // 图片正反面
          isCenter: false    // 图片是否居中
        }
    })

    //改变后的元素塞回数组对应的位置
   topImgArr && imgArr.splice(topIndex,0,topImgArr[0]);
    imgArr.splice(index,0,centerImg[0]);

    this.setState({imgsStyleArr:imgArr});
   //console.log(this.state.imgsStyleArr);
  }

  //组件加载完成后，为每张图计算其位置的范围
  componentDidMount(){
    //console.log(ReactDOM.findDOMNode(this.refs.stage.scrollWidth));

    //先拿到舞台大小
    var stageDOM = this.refs.stage;
    var stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);

    //拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    var imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW/2),
      halfImgH = Math.ceil(imgH/2);


    //计算图片的位置范围
    this.Constant.centerPos.left = halfStageW-halfImgW;
    this.Constant.centerPos.top = halfStageH - halfImgH;

    this.Constant.hRange.leftX = [
        -halfImgW,
        halfStageW-3*halfImgW
      ];
    this.Constant.hRange.rightX =[
        halfStageW + halfImgW,
        stageW - halfImgW
    ];

    this.Constant.hRange.y = [
      -halfImgH,
      stageH - halfImgH
    ];

    this.Constant.vRange.x = [
      halfStageW - imgW,
      halfStageW
    ];

    this.Constant.vRange.topY = [
      -halfImgH,
      halfStageH - 3*halfImgH
    ];

    this.rearrange(0);

  }

  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }

  inverse(index){
    return function(){
      var imgs = this.state.imgsStyleArr;
      imgs[index].isInverse = !imgs[index].isInverse;
      //整体更新
      this.setState({
        imgsStyleArr:imgs
      });
    }.bind(this);
  }

  render() {
    var controllerUnits = [],
      ImgFigures = [];
      imagesData.forEach(function (value,index) {
       if(!this.state.imgsStyleArr[index]){
          this.state.imgsStyleArr[index]={
            pos:{
              left:'0',
              top:'0'
            },
            rotate: 0,    // 旋转角度
            isInverse: false,    // 图片正反面
            isCenter: false    // 图片是否居中
          }
        }
        ImgFigures.push(<ImgFigure  key={index} data={value} center = {this.center(index)} inverse={this.inverse(index)} ref={'imgFigure'+index} arrange={this.state.imgsStyleArr[index]}/>);
      }.bind(this));
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
