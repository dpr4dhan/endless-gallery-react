import React, {useEffect, useState} from 'react';

export default function useScroll(){
    const [scrollPostition, setScrollPostition] = useState(null);

    useEffect(() => {
       document.addEventListener('scroll', handleScroll);

       return () => document.removeEventListener('scroll', handleScroll)
    }, []);



    function handleScroll(){
        setScrollPostition(window.scrollY);
    }

    return scrollPostition;
}