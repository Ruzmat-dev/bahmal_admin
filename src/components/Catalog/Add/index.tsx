import { useForm } from 'react-hook-form';
import classes from "./add.module.css"
import { axiosPrivate } from '../../../api/axiosPrivate';
import { getCategories } from '../../../api/data';
import { useEffect, useState } from 'react';
import { TCategory } from '../../../../types/data';
interface FormData {
  // "id": number,
    "title": string,
    "title_ru": string,
    "title_en": string,
    "title_uz": string,
    "description": string,
    "description_ru": string,
    "description_en": string,
    "description_uz": string,
    "image": string,
    "parent": string
}

export default function App() {

  const [category, setCategory] = useState<TCategory[] | undefined>([]);
  const [filteredCategory, setFilteredCategory] = useState<TCategory[] | undefined>([]);
  // const [parentName , setParentName] = useState<string>()

  const url = window.location.pathname;
  const parts = url.split('/');
  const id = parts[parts.length - 1];
  
  const idNumber = parseInt(id, 10);
  
  // console.log(idNumber);
  const fetchData = async () => {
    try {
      const res = await getCategories()
      setCategory(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Filter the category array based on idNumber
    if (category && idNumber) {
      const filtered = category.filter((item) => item?.parent?.id === idNumber);
      
      setFilteredCategory(filtered);
    }
  }, [category, idNumber]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  // console.log(category);

// filteredCategory?.map((e) => console.log(e.title))
  
  

  const onSubmit = (data: FormData) => console.log(data); 

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     // const response = await axiosPrivate.post('/categories/', data);
  //     console.log('POST request successful:', data);
  //   } catch (error) {
  //     console.error('POST request failed:', error);
  //   }
  // }
  console.log(errors);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.catalogAdd}>
      <input type="text" placeholder="Title" {...register("title", { min: 3, maxLength: 59 })} />
      <input type="text" placeholder="Title uz" {...register("title_uz", { required: true, min: 3, maxLength: 60 })} />
      <input type="text" placeholder="Title ru" {...register("title_ru", { required: true, min: 3 })} />
      <input type="text" placeholder="Title en" {...register("title_en", { required: true, max: 60, min: 3, maxLength: 60 })} />
      <input type="text" placeholder="Description" {...register("description", { min: 3 })} />
      <input type="text" placeholder="Description uz" {...register("description_uz", { min: 3 })} />
      <input type="text" placeholder="Description ru" {...register("description_ru", { min: 3 })} />
      <input type="text" placeholder="Description en" {...register("description_en", { min: 3 })} />
      <input type="file" id="avatar"  {...register("image", { min: 3 })} accept="image/png, image/jpeg" />
      <select {...register("parent")} >
        <option value="-------" >{filteredCategory && filteredCategory[0]?.title}</option>
      </select>
      {/* <input type="url" placeholder="Rasm" {...register("Rasm", {})} /> */}

      <input type="submit" />
    </form>
  );
}