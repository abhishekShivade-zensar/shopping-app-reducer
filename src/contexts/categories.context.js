import { createContext, useState,useEffect } from "react";
// import SHOP_DATA from '../shopdata.js'
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap:{}
})

export const CategoriesProvider = ({children})=>{

    const [categoriesMap,setCategoriesMap]=useState({})

    useEffect(()=>{
        const getCategoriesMap=async()=>{
            const categoryMap=await getCategoriesAndDocuments()
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[])

    const value= {categoriesMap}

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}