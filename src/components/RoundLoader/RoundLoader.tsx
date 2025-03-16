import { useEffect, useState } from 'react';
import './roundLoader.scss'

type IState = 'close' | 'animating' | 'open'

type IRoundStyle = {
    [key in IState]: {
        transform: string;
    };
};

const animationDuration = 500

function RoundLoader( { isLoading } : { isLoading: boolean }) {

    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [nextState, setNextState] = useState<IState | null>(null)
    const [state, setState] = useState<IState>('open')

    const roundStyle : IRoundStyle = {
        close: {
            transform: `scale(0)`,
        },
        open: {
            transform: `scale(5)`,
        },
        animating: {
            transform: `scale(1)`,
        }
        
    }

    useEffect(() => {
        setIsAnimating(true)
        setLoader(isLoading)
        timeOut(isLoading)
    }, [isLoading])

    useEffect(() => {
        
        if(!isAnimating){
            if(nextState !== null && nextState !== state){
                setLoader(nextState === 'open')
            }
        }
    }, [isAnimating])

    function setLoader(_loading : boolean){
        if(!isAnimating){
            if(_loading){
                setState('open')
            } else {
                setState('close')
            }
        } else {
            if(_loading){
                setNextState('open')
            } else {
                setNextState('close')
            }
        }
    }

    function timeOut(_isLoading : boolean){
        setTimeout(() => {
            setIsAnimating(false)
        }, animationDuration);
    }

    return (
        <div className="round-loader" style={{ pointerEvents : isAnimating ? 'auto' : 'none'}}>
            <div className="round" data-state={state} style={roundStyle[state]}></div>
        </div>
    )
}

export default RoundLoader;