import React, {useEffect, useState} from 'react';
import Image from "./Image";
import useFetchImage from "../utils/hooks/useFetchImage";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "../utils/hooks/useDebounce";
import {AnimatePresence,motion} from "framer-motion";


function Images (){
    const [page, setPage] = useState(1);
    function ShowImage(){
        const [showPreview, setShowPreview] = useState(false);
        const [selectedId, setSelectedId] = useState(null);
        return (
            <>
                <InfiniteScroll className="flex flex-wrap" dataLength={images.length} next={() => setPage(page + 1)} hasMore="true">
                    {
                        images.map((img, index) => (

                                <motion.div className="w-1/6 p-1 border flex justify-center" key={index} initial={{opacity:0}} animate={{opacity:1}} layoutId={img.id} onClick={() => setSelectedId(img.id)}>
                                    <Image show={()=> setShowPreview(img.webformatURL)} image={img} handleRemove={handleRemove} index={index} />
                                </motion.div>

                            )
                        )
                    }
                </InfiniteScroll>
                <AnimatePresence>
                    {showPreview && (
                        <motion.section exit={{opacity:0, rotate: 360}} layoutId={selectedId} className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40" onClick={() => setShowPreview(false)}>
                            <div className="bg-white">
                                <img src={showPreview} width="300" height="auto" />
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </>

    )
    }
    const [search, setSearch] = useState(null);



    const [images, setImages, errors, isLoading] = useFetchImage(page, search);

    function handleRemove(index){
        setImages(images.filter((image, i) => i !== index));
        console.log('changing state');
    }


    const debounce = useDebounce();

    function handleInput(event){
        const text = event.target.value;
        debounce(() =>setSearch(text));
    }


    return (
            <section>
                <div className="my-5">
                    <input type="text" className=" w-full border rounded shadow p-2" onChange={handleInput} placeholder="Search Photos"/>
                </div>

                { errors.length > 0 && (
                        <div className="flex h-screen">
                            <p className="m-auto text-red-600 font-bold">{errors[0]}</p>
                        </div>
                    )
                }

                <ShowImage />

                {isLoading ? <Loading /> :null}
            </section>
        );
}

export default Images;