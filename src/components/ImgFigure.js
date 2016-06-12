import React from 'react';
import ReactDOM from 'react-dom';
class ImgFigure extends React.Component {
  imageClick(e){
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

export default ImgFigure;
