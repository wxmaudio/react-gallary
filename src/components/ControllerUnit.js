import React from 'react';
class ControllerUnit extends React.Component {
  handleClick(e){
    if(this.props.arrange.isCenter){
       this.props.inverse();
    }else{
       this.props.center();
    }
    e.preventDefault();
    e.stopPropagation();

  }
  render(){
    var className = 'controller-unit';
    if(this.props.arrange.isCenter){
      className += ' is-center';
    }
    if(this.props.arrange.isInverse){
      className +=' is-inverse';
    }
    return(
      <span className={className} onClick={this.handleClick.bind(this)} ></span>
      );
  }
}

export default ControllerUnit;

