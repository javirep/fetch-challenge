import arrowUp from '../../assets/images/ArrowUp.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import './Level.css';

export const Level = (props) => {
    const { level } = props;

    
    
    if ( level === 'Lower than Average'){
        return <div className='level'>
            <img src={arrowDown} alt="Lower than Average" />
            <p>{level}</p>
        </div>
    } 
    if ( level=== 'Higher than Average'){
        return <div className='level'>
            <img src={arrowUp} alt="Higher than Average" />
            <p>{level}</p>
        </div>
    } 
    
    return <p>{level}</p>
}