import './Circle.css';

export const Circle = (props) => {
    const {color, height= '14px', width='14px'} = props;
    return (
        <div className='circle' style={{backgroundColor: color, height, width} }></div>
    );
}