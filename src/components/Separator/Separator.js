import './Separator.css';

export const Separator = (props) => {
    const {type = 'vertical'} = props;
    return (
        <div className={"separator " + type}></div>
    );
}