import React,{useState, useEffect, useRef} from 'react';
import {styled, connect, Global, css} from "frontity";
import { useDetectOutsideClick } from "../hooks/useDectectOutsideClick";

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

    //porque parentesis y no llaves?
    const FilterSubcategoriesUI = () => (

        <Categories>

            <MyForm>
                <select
                    onChange = { e => saveCategory(e.target.value) }
                    value={allCategory}
                    required
                >

                    <option>Choose a Category</option>
                  
                    {realCategories.map(option => (
                        <>
                        {<option css={css`font-weight: 700`}> {option.name}</option>}
                            {
                                option.subcategories.length > 0 ? option.subcategories.map( subCategorie => <option>&nbsp;&nbsp;&nbsp;{subCategorie}</option>) : null
                            }
                        </>
                    ))}
                </select>
            </MyForm>
           
        </Categories>
    )

    return {
        allCategory,
        categories,
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

    margin-bottom: 3rem;

    select {
        height: 5vh;
        width: 30vw;
        font-size: 1.2rem;
        //background-color: #206d92;
        //border-color: #206d92;

        background-color: #00A36C;
        border-color: #00A36C;
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
