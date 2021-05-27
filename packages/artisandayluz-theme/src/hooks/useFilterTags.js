import React,{useState, useEffect, useRef} from 'react';
import {styled, connect} from "frontity";

import { useDetectOutsideClick } from "../hooks/useDectectOutsideClick";

const useFilterTags = () => {
    
    const [allCategory, saveCategory] = useState('');

    const [categories, setCategories] = useState([]);

    const [currentCategoryTag, setCurrentCategoryTag] = useState('')

    useEffect(() => {

        async function fetchMyAPI() {
            let response = await fetch('http://chp.multiviral.cloud/wp-json/wp/v2/categories?per_page=100');
    
            response = await response.json();
    
            setCategories(response);
            }
            
            fetchMyAPI()
    }, []);

    let realCategories = [];
    let realSubCategories = [];

    categories.map( category => {

        if(category.parent === 0){

            if(category.name !== "Sin categoría") {

                const newData = {"id": category.id, "name": category.name, "subcategories": []};
                realCategories.push(newData);
            }
        }
    })



    categories.map( category => {

        if(category.parent !== 0){

            if(category.name !== "Sin categoría") {

                const newData = {"id": category.id, "name": category.name, "parent": category.parent};
                realSubCategories.push(newData);
            }
        }
    })

    console.log("subcategories: ", realSubCategories)
    console.log("categories: ", realCategories)

    realSubCategories.map( subcategory => {
        
        for( var i = 0 ; i < realCategories.length; i++) {
            realCategories[i]["number"] = i+1;
            if( realCategories[i].id === subcategory.parent) {
                realCategories[i]["subcategories"].push(subcategory.name);
            }
        }
    })

    const dropdownRefTags = useRef(null);
    const [isTagsActive, setTagsIsActive] = useDetectOutsideClick(dropdownRefTags, false);
    const onClickDropdown = (e) => {
        setTagsIsActive(!isTagsActive);
        setCurrentCategoryTag(e.target.textContent);
    }

    //filter subcategories tag starts
    let selectedCategory = realCategories.filter( category => category.name === currentCategoryTag);
    console.log("selected category: ", selectedCategory);
    

    const theSubcategories = selectedCategory.map( subcategory => subcategory.subcategories).flat();
    console.log("sub: ", theSubcategories);
    
    //filter subcategories tag ends



    //porque parentesis y no llaves?
    const FilterSubcategoriesUI = () => (

        <Categories>

            {realCategories.map(option => (
                <>
                <ButtonCategory onClick = { (e) => saveCategory(option.name)}><span>{option.name}</span></ButtonCategory>
                            
                {
                    option.subcategories.length > 0 ? option.subcategories.map( subCategorie => <ButtonSubCategory onClick = { () => saveCategory(subCategorie)}><span>{subCategorie}</span></ButtonSubCategory>) : null 
                }
                    
                </>
            ))}
           
        </Categories>
    )

    return {
        allCategory,
        FilterSubcategoriesUI
    }
}
 
export default useFilterTags;


const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    @media(max-width: 768px) {
        justify-content: space-between;
    } 
`;

const ButtonCategory = styled.button`
   
    padding: .8rem;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border: 2px solid #000;
    color: #000;
    border-radius: 1rem;
    margin: 1rem 1rem;
    font-weight: 400;

    &:hover {
        background-color: #eaeaea;
        color: purple;
        border:none;
    }

    &:focus {
        background-color: #eaeaea;
        color: purple;
        border:none;
    }

    span {
        font-size: 1rem;
    }

    @media(max-width: 768px) {

        padding: .5rem;
        span {
            font-size: .8rem;
        }
    }
`;



const ButtonSubCategory = styled.button`
    padding: .8rem;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border: 2px solid #000;
    color: #000;
    border-radius: 1rem;
    margin: 1rem 1rem;
    font-weight: 400;

    &:hover {
        background-color: #eaeaea;
        color: purple;
        border:none;
    }

    &:focus {
        background-color: #eaeaea;
        color: purple;
        border:none;
    }

    span {
        font-size: .7rem;
    }

    @media(max-width: 768px) {

        padding: .5rem;
        span {
            font-size: .7rem;
        }
    }
`
