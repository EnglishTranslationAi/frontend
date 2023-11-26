'use client'
import React, {FC, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface MiddleLayoutProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false,
        }
    }
})


const MiddleLayout:FC<MiddleLayoutProps> = ({children}) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
        </div>
    );
};

export default MiddleLayout;