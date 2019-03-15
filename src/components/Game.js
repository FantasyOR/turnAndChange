import React from 'react'
import settings from "../Settings.js";
import Ring from './Ring';
import Timer from './Timer';
import { truncate } from 'fs';
//import {crystalsData} from "crystalsData.js";


class Game extends React.Component {
    constructor(props){
        super(props);
        
        let crystalsData = new Array();
        // инициализируем массив колец, а затем наполняем каждый массивом кристаллов
        for (let i=0; i < settings.maxRings; i++)
        {
            // создаём и заполняем массив кристаллов случайного типа
            let cryOfRing = new Array();
            for (let j = 0; j < (i+1)*6; j++) {            
                cryOfRing.push(settings.crystalTypes[Math.round(Math.random()*(settings.crystalTypes.length-1))]);            
            }

            // добавляем массив кристаллов в массив колец
            crystalsData.push({
                idx: i,
                angle: 0,
                items: cryOfRing
            });
        }
       
       // let directions = ['clockwise', 'stop', 'counterclockwise']
        let action = new Array();
        for (let i=0; i < settings.ActionCount; i++)
        {
            let ring = Math.round(Math.random()*settings.maxRings-1);
            action.push({
                ring: (ring<0)? 0: Math.abs(ring),
                direction: Math.round(Math.random()*2-1),
                distance: Math.round(Math.random()*3),
            })
        }

        let act = action.shift();
        // в состоянии у игры должны храниться:
        //  - 2 выделеных элемента
        //  - очки
        //  - карта колец
        this.state = {
            selected: [],            
            score: 0,
            data: crystalsData,
            countdown: settings.ActionSec,
            actionNow: act,
            actions: action,            
        }
        
            
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(idRing, idCrystal) {
        console.log("Select", { ring: idRing, crystal: idCrystal })
        let sel = this.state.selected;
        sel.unshift( {ring: idRing, crystal: idCrystal} );

        if (sel.length>2)
        {
            sel.pop();
        }
        
    }

    // функция смены кристаллов
    change()
    {
        
    }


    componentDidMount() {
        this.timerId = setInterval( ()=> this.tick(), 1000);
    }


    tick() {

        this.setState(prevState => {
            return {
                countdown: prevState.countdown-1
            }          
        });

        if (this.state.countdown ==0)
        { 
            if (this.state.actions.length ==0)
            {
                clearInterval(this.timerId);
                return;
            }
    

            // выполним действиеЖ зададим новый угол, учитывая текущий, направление и дальность у кольца из действия            
            let newData = this.state.data;

            newData[this.state.actionNow.ring].angle += 
                this.state.actionNow.direction
                *this.state.actionNow.distance
                *(2*Math.PI/newData[this.state.actionNow.ring].items.length)
        
            console.log('is countdown', {
                action: this.state.actionNow, 
                oldAngle: this.state.data[this.state.actionNow.ring].angle,
                newAngle: newData[this.state.actionNow.ring].angle
            })

                
            // если время вышло, то вытаскиваем первый элемент из массива действий и 
            //  делаем его текущим, а массив действий обновляем уменьшенным массивом
            let acts = this.state.actions;
            let act = acts.shift();
            this.setState({
                countdown: settings.ActionSec,
                actionNow: act,
                actions: acts,
                data: newData,
            });            
        }
    }

    render() {
        
        //console.log("this.state.data", this.state.data);

        const rings = this.state.data.map(
            (component, key) => (                
                <Ring key={key} 
                    items={component}
                    handleClick={this.handleClick}/>                
            )
        );
      //  console.log("rings", rings);

        return (
        <div className="game">
           {/* <Score/>*/}
            <Timer countdown={this.state.countdown} action={this.state.actionNow}/> 
            <div >
                {rings}
            </div>
        </div>
        );
    }
   
}

export default Game