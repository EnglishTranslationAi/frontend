import React, {FC, ReactNode} from 'react';

interface MiddleLayoutProps {
    children: ReactNode;
}

const MiddleLayout:FC<MiddleLayoutProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MiddleLayout;