import React, {useEffect} from "react";
import { connect, styled } from "frontity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import useFilterTags from './useFilterTagsLogin';

const ChooseImage = ({state, actions}) => {

  const {allCategory, categories, FilterSubcategoriesUI} = useFilterTags("");

  const arrayCategories = [];

  useEffect( () => {
      
    if(allCategory !== "") {
      
      categories.filter( (elem) => {
        if(elem.name === allCategory.trim()) {
            if(elem.parent === 0) {
              arrayCategories.push(elem.id)
            }

            else {
              arrayCategories.push(elem.parent)
              arrayCategories.push(elem.id)
            }
        }
      })
    } 
  }, [allCategory])

  state.theme.categoriesArr = arrayCategories;


  return (

    <ChooseImageStyled>

      <h2>Step 1: Choose a principal image for your event, clicking on the upload icon.</h2>

      <label htmlFor="upload-button">
        {state.theme.image.preview ? (
          <img src={state.theme.image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <FontAwesomeIconStyled icon={faUpload}/>
            
            <h3>Upload your photo</h3>
          </>
        )}
      </label>


          
        <>
          <h2>Step 2: Choose an available Category or Subcategory for your event.</h2>
          {FilterSubcategoriesUI()}
      
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={actions.theme.chooseImage}
          />
        </>

      {
        state.theme.image.preview ?
          <>
            <h2>Step 3: Press Upload, please.</h2>
            <div>
                <button onClick={actions.theme.postImageAction}>Upload</button>
            </div>
          </>
        :<p>Once you upload an image and choose a category, you'll be able to continue...</p>
      }

          
    </ChooseImageStyled>

  );
}


const ChooseImageStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12rem;
  margin-bottom: 5rem;
  justify-content: center;
  align-content: center;
  text-align: center;

  input[type=file] {
    // input elements with type="text" attribute
    width:100%;
    font-family:inherit;
    font-size: inherit;
  }

  button {
    /* remove default behavior */
    appearance:none;
    -webkit-appearance:none;

    /* usual styles */
    padding:1rem 2.5rem;
    border:none;
    //background-color:#206d92;
    background-color: #00A36C;
    color:#fff;
    font-weight: 600;
    border-radius:5px;
    margin-top: 2rem;
    cursor: pointer;
    font-size: 1.2rem;
  }

  h3 {

    color: #3B3B3B;
  }
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    margin-right: 1rem;
    font-size: 5rem;
    //color: #206d92;
    color: #00A36C;
`;

export default connect(ChooseImage);