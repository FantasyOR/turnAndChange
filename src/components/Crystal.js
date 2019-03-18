import React from 'react'
import settings from "../Settings.js";




class Crystal extends React.Component {

  constructor(props) {
    
    // console.log( 'settings', settings)

    super(props);
    
    let angle = props.idx * Math.PI *2 /props.count;
    let radius = (props.count/6 * settings.Radius)+settings.Radius/2;
    
    this.state = {
      coordinate:{  
        xpos:  (radius) + Math.cos(angle) * 
                (radius - settings.Radius/2)- settings.crystalWidth/2,
        ypos:  (radius) + Math.sin(angle) * 
                (radius - settings.Radius/2) - settings.crystalHeight/2 ,
      },      
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
      top: this.state.coordinate.ypos - ( (this.props.item.selected)? 10:0),
      left: this.state.coordinate.xpos,     
      boxShadow: ( (this.props.item.selected)? '0px 0px 36px -1px': '0px 0px 0px 0px'),           
      transform: 'rotateZ( '+ this.state.angle +'rad )',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: "url(" + require("./../arts/crystal_"+ this.props.item.type+ ".png")+ ")",

      transitionProperty: 'boxShadow, top',
      transitionDuration: '300ms',            
      transitionTimingFunction: 'ease-in',            
    }

    

    if (this.state.idx === 0)
    {
      stl.backgroundColor = "green";
    }

    


    return (
        <div className="crystal"
          style = {stl}     
          onClick = {this.handleClick}        
      ></div>
    )
  }  

}

export default Crystal