import React,{useState, useEffect, useRef} from 'react';
import {styled, connect, Global, css} from "frontity";

import { useDetectOutsideClick } from "../hooks/useDectectOutsideClick";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRunning, faSeedling, faDiagnoses } from '@fortawesome/free-solid-svg-icons'

const useFilterTags = () => {
    
    const [allCategory, saveCategory] = useState('');

    const [categories, setCategories] = useState([]);

    const [currentCategoryTag, setCurrentCategoryTag] = useState('')

    /**AntD usestate */

    const [value, setValue] = useState(undefined);
    const onChange = () => {
      setValue(value);
    };

    useEffect(() => {

        async function fetchMyAPI() {
            let response = await fetch('https://artisan.wildfreewalkingtours.com/wp-json/wp/v2/categories?per_page=100');
    
            response = await response.json();
    
            setCategories(response);
            }
            
            fetchMyAPI()
    }, []);

    let realCategories = [];
    let realSubCategories = [];

    categories.map( category => {

        if(category.parent === 0){

            if(category.name !== "Uncategorized") {

                const newData = {"id": category.id, "name": category.name, "subcategories": []};
                realCategories.push(newData);
            }
        }
    })



    categories.map( category => {

        if(category.parent !== 0){

            if(category.name !== "Uncategorized") {

                const newData = {"id": category.id, "name": category.name, "parent": category.parent};
                realSubCategories.push(newData);
            }
        }
    })

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


    const theSubcategories = selectedCategory.map( subcategory => subcategory.subcategories).flat();
    
    //filter subcategories tag ends

    let option;

    //icons
    const faIconsArr = [faUser, faUser, faUser, faDiagnoses, faSeedling, faRunning]

    //porque parentesis y no llaves?
    const FilterSubcategoriesUI = () => (

        <MyForm>
                      
            {realCategories.map((option, index) => (
                <div>
                    <div>
                        <FontIconCategoryStyle icon={faIconsArr[index]}/>
                        <p>{option.name}</p>
                    </div>
                    
                    <select
                        onChange = { e => saveCategory(e.target.value) }
                        value={allCategory}
                    >

                    <option>Select</option>

                    <>
                    {<option css={css`font-weight: 700`}> {option.name}</option>}
                        {
                            option.subcategories.length > 0 ? option.subcategories.map( subCategorie => <option>&nbsp;&nbsp;&nbsp;{subCategorie}</option>) : null
                        }
                    </>

                    </select>

                </div>
            ))}


        </MyForm>
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

const MyForm = styled.form`

    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
    margin-bottom: 5rem;
    text-align: center;

    @media(max-width: 768px) {
        flex-direction: column;
    } 
    

    select {
        height: 5vh;
        width: 12vw;
        font-size: 1.2rem;
        background-color: #206d92;
        border-color: #206d92;
        color: #fff;

            option {
                font-size: 1rem;
                background-color: #fff;
                color: #000;
            }

        @media(max-width: 768px) {
            width: 80vw;
        }  
    }
`

const FontIconCategoryStyle = styled(FontAwesomeIcon)`
    font-size: 3rem;
    color: #00A36C;

    @media(max-width: 768px) {
        margin-top: 2rem;
    }  
`