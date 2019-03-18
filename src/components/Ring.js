import React from 'react';
import Crystal from './Crystal';
import settings from "../Settings.js";

class Ring extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);

        this.state = {
            data: props.items.items,
            idx: props.items.idx,
            handleGameSelect: props.handleClick,
            angle: props.items.angle,
        }
        
       // console.log(this.state.data);

       this.handleClick = this.handleClick.bind(this)
    }


    handleClick(crystalId) {
        console.log('crystalId',  { r:this.state.idx, c:crystalId});
        
        this.state.handleGameSelect(this.state.idx, crystalId);    
      }
    

    render() {
       //console.log( 'this.state.angle', this.props.items.angle)

        const stl = { 
            zIndex: Math.round(1000 / this.state.data.length), 
            width: (this.state.data.length/6 * settings.Radius +settings.Radius/2)*2, 
            height: (this.state.data.length/6 * settings.Radius +settings.Radius/2)*2,             
            top: 'calc( 50% - '+ (this.state.data.length/6 * settings.Radius +settings.Radius/2) +'px)',
            left: 'calc( 50% - '+ (this.state.data.length/6 * settings.Radius +settings.Radius/2 ) +'px)',

            transitionProperty: 'transform',
            transitionDuration: '1000ms',            
            transitionTimingFunction: 'ease-in-out',
            transform: 'rotateZ( '+ this.props.items.angle +'deg )',
         };        


        const crystals = this.state.data.map(
            (component, key) => (
                <Crystal key={key} 
                    idx={key} 
                    item = {component}
                    count = {this.state.data.length}
                    handleClick = {this.handleClick} 
                />
            )
        );
      //  console.log("crystals", crystals);

        return  (
            <div className="ring" style={stl}>
                {crystals}
            </div>
        )
    }
}

export default Ring