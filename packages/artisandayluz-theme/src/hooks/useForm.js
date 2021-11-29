import React, {useState} from 'react';
import { connect, styled } from "frontity";

export const useForm = (options) => {

  // const state= frontity.state;

  const [data, setData] = useState((options?.initialValues || {}));
  const [errors, setErrors] = useState({});
  const [fieldsPost, setFieldPost] = useState({});

  const handleChange = (key) => (e) => {
    
    // const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

    const value = e.target.value;

    setData({
      ...data,
      [key]: value,
    });

        
    /**Update fields starts */  
      setFieldPost({   ...data,
        [key]: value,});
    /**Update fields ends */

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
    fieldsPost
  };
};
