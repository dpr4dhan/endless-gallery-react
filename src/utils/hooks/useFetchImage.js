import React, {useEffect, useState} from 'react';
import axios from "axios";

const api = process.env.REACT_APP_PIXABAY_API_URL;
const secret = process.env.REACT_APP_PIXABAY_API_KEY;

export default function useFetchImage(page, keyword){
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function fetch(){
        setIsLoading(true);
        const query_param = keyword !== null ? `&q=${keyword}` : '';
        const url = `${api}/?key=${secret}&page=${page}${query_param}`;
        axios.get(`${url}`)
            .then((res)=>{
                if(keyword !== null){
                    fetchSearch(res);
                }else{
                    fetchRandom(res);
                }
                setIsLoading(false);
            })
            .catch((e)=>{
                setErrors('Unable to fetch images.')
                setIsLoading(false);
            });
    }

    function fetchSearch(res){
        if(page > 1){
            setImages([...images, ...res.data.hits]);
        }else{
            setImages([...res.data.hits]);
        }
    }

    function fetchRandom(res){
        setImages([...images, ...res.data.hits]);
    }

    useEffect(() => {
        fetch();
    }, [page, keyword]);



    return [images, setImages, errors, isLoading];
}