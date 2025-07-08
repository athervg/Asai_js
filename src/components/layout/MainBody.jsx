import React from "react";
import TitleBar2 from "./TitleBar2";
import Button from "../ui/Button";
import MediaControls from "../ui/MediaControls";
import SampleBody from "./SampleBody";


function MainBody() {
    return(
        <main className="w-full">
            <TitleBar2> 
                <div className="items-center" style={{appRegion:"no-drag", userSelect:"auto"}}>
                </div>
            </TitleBar2>
            <div className="container mx-auto pl-4 pr-4 flex-1 w-full h-[calc(100vh-3rem)]">
                <SampleBody/>
                <MediaControls/>
            </div>
        </main>
    )
};

export default MainBody;