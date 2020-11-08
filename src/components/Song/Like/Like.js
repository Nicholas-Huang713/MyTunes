import React, {useState} from 'react';
import './Like.css';

const hoverStyle = {
    background: 'white',
    color: "black"
}

export default function Like() {
    const [isHovered, setIsHovered] = useState(false);

    const handleLikeClick = (e) => {
        if (e.defaultPrevented) return 
        e.preventDefault();
        e.stopPropagation()
        console.log('Like Clicked')
    }

    return (
        
        <div 
            style={isHovered? hoverStyle : null}
            className="like-btn" 
            onMouseOver={() => setIsHovered(true)} 
            onMouseOut={() => setIsHovered(false)}
            onClick={() => handleLikeClick}
        >
            Like
        </div>
    )
}
