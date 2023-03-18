import Images from "../components/Images";
import React from "react";

export default function Gallery(){
    return (
        <section className="flex justify-center">
            <div className="w-10/12">
                <Images/>
            </div>
        </section>
    )
}