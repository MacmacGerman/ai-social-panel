import './Tooltip.css'

function Tooltip({ children, text, position = 'top' }) {
    return (
        <div className="tooltip-wrapper">
            {children}
            <div className={`tooltip tooltip--${position}`}>
                {text}
            </div>
        </div>
    )
}

export default Tooltip
