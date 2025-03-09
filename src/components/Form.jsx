import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        try {
          await axios.post("http://localhost:3000/", {
            title: data.title,
            description: data.content,
          });
          alert("Blog added successfully!");
          reset(); 
          fetchBlogs(); 
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };

    return (
        <form onSubmit = {handleSubmit(onSubmit)}>

            {/* blog title input*/}
            <label htmlFor="title">Blog Title: </label>
            <input 
               id = "title"
               placeholder = "enter blog title"
               {...register ("title",{required: "blog title required"})}
            />
            <br /> <br />
            {/* blog context area  */}
            <label htmlFor="description">Blog content: </label>
            <textarea 
                id = "description"
                placeholder = "enter description"
                {...register ("content",{required: "blog content required"})}
            />
            <br /> <br />

            <button type = "submit">Submit</button>
        </form>
    );
}