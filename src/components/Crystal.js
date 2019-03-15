import React from 'react'
import settings from "../Settings.js";




class Crystal extends React.Component {

  constructor(props) {
    
    // console.log( 'settings', settings)

    super(props);
    
    let angle = props.idx * Math.PI *2 /props.count;
    let radius = (props.count/6 * settings.Radius)+50;
    
    this.state = {
      coordinate:{  
        xpos:  (radius) + Math.cos(angle) * 
                (radius - settings.Radius/2)- settings.crystalWidth/2,
        ypos:  (radius) + Math.sin(angle) * 
                (radius - settings.Radius/2) - settings.crystalHeight/2 ,
      },
      type: props.type,
      count: props.count,
      angle: angle,
      idx: props.idx,
      handleRingSelect: props.handleClick
    }
    

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('handleClick',  this.state.idx);

    this.state.handleRingSelect(this.state.idx);
  }

  render() {
    
    let stl = { 
      zIndex: Math.round(1000 / this.state.count + 1),
      width: settings.crystalWidth,
      height: settings.crystalHeight,
      borderRadius: settings.crystalBorderRadius1,
      position: 'absolute',
      top: this.state.coordinate.ypos - ( (this.props.isSelected)? 10:0),
      left: this.state.coordinate.xpos,     
      boxShadow: ( (this.props.isSelected)? '0px 0px 36px -1px': '0px 0px 0px 0px'),           
      transform: 'rotateZ( '+ this.state.angle +'rad )',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }

    stl.backgroundImage = "url(" + require("./../arts/crystal_"+ this.state.type+ ".png")+ ")";



    return (
        <div className="crystal"
          style = {stl}     
          onClick = {this.handleClick}        
      ></div>
    )
  }  

}

export default Crystal