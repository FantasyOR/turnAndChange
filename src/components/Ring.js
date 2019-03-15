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
       console.log( 'this.state.angle', this.props.items.angle)

        const stl = { 
            zIndex: Math.round(1000 / this.state.data.length), 
            width: (this.state.data.length/6 * settings.Radius +50)*2, 
            height: (this.state.data.length/6 * settings.Radius +50)*2,             
            top: 'calc( 50% - '+ (this.state.data.length/6 * settings.Radius +50) +'px)',
            left: 'calc( 50% - '+ (this.state.data.length/6 * settings.Radius +50 ) +'px)',

            transitionProperty: 'transform',
            transitionDuration: '1s',            
            transitionTimingFunction: 'ease-in-out',
            transform: 'rotateZ( '+ this.props.items.angle +'rad )',
         };        


        const crystals = this.state.data.map(
            (component, key) => (
                <Crystal key={key} idx={key} type={component}
                    count={this.state.data.length}
                    handleClick={this.handleClick} 
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