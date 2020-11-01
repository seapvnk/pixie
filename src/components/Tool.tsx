import React, { CSSProperties } from 'react';

enum ToolType {
    Pencil,
    Fill,
}

interface ToolProps {
    fn: Function;
    style?: CSSProperties; 
}

const Tool: React.FC<ToolProps> = ({ fn, style, children }) => (
    <div style={ style?? {} } className="tool" onClick={() => fn()}> { children?? '' } </div>
);

export default Tool;
export { ToolType };