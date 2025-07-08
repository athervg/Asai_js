import React from 'react';
import SampleList from '../ui/SampleList';

function SampleBody() { 
    return (
        <div className='container mx-auto inset-shadow-xs inset-shadow-slate-100/50 shadow-lg shadow-gray-700/70 bg-slate-300/30 rounded-lg h-[calc(100vh-9rem)]'>
            <SampleList/>
        </div>
    );
}

export default SampleBody;
