import "./Start.css";
import imageSrc from "./title.png"

const Start=({func})=>{
    return(
        <div className='start'>

            <div className='upSide'>
                <div className="imageContainer">
                    <img className="title" src={imageSrc}/>
                </div>
                <p className="startText">↓Tap(Click) Some Button↓</p>
            </div>
            <div className='downSide' onClick={func}>
                <div className="centerParts">
                    <div className="crossKey">+</div>
                    <div className="gameFrame">
                        <div className="LesirumModelContainer">レシラムの３Dモデル</div>
                        <p>Tap(Click) to Start</p>
                    </div>
                    <div className="fourKeys">
                        <div className="commandKey">X</div>
                        <div className="commandKey">A</div>
                        <div className="commandKey">B</div>
                        <div className="commandKey">Y</div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Start;
