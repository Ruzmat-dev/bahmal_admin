import { useForm } from 'react-hook-form';
import classes from "./see.module.css"
// import { axiosPrivate } from '../../../api/axiosPrivate';
import { getCategories } from '../../../api/data';
import { useEffect, useState } from 'react';
import { TCategory } from '../../../../types/data';
import { axiosPrivate } from '../../../api/axiosPrivate';
import { TextInput , Button  } from '@mantine/core';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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

const schema = yup
  .object({
    title: yup.string().required(),
    title_ru: yup.string().required(),
    title_uz: yup.string().required(),
    title_en: yup.string().required(),
    description: yup.string().required(),
    description_ru: yup.string().required(),
    description_en: yup.string().required(),
    description_uz: yup.string().required(),
    image: yup.string().required(),
    parent: yup.string().required(),
  })
  .required()

export default function CatalogSee() {

  const [category, setCategory] = useState<TCategory[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<TCategory[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');
  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   setFile(selectedFile || null);
  // };

 


  const url = window.location.pathname;
  const parts = url.split('/');
  const id = parts[parts.length - 1];

  const idNumber = parseInt(id, 10);

  const fetchData = async () => {
    try {
      const res = await getCategories()
      setCategory(res ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (category && idNumber) {
      const filtered = category.filter((item) => item?.parent?.id === idNumber);
      setFilteredCategory(filtered);
    }
  }, [category, idNumber]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    // if (!file) {
    //   console.error('No file selected');
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('image', file);
    // console.log(file);
    
    try {
      const response = await axiosPrivate.post('/categories/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form  onSubmit={handleSubmit(onSubmit)} className={classes.catalogAdd}>
      <TextInput
        label="Title"
        withAsterisk
        placeholder="Input placeholder"
        {...register("title", { min: 3, maxLength: 59 })}
        error={errors.title?.message}
      />
      <TextInput
        label="Title uz"
        withAsterisk
        placeholder="Title uz"
        {...register("title_uz", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_uz?.message}
      />
      <TextInput
        label="Title ru"
        withAsterisk
        placeholder="Title ru"
        {...register("title_ru", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_ru?.message}
      />
      <TextInput
        label="Title en"
        withAsterisk
        placeholder="Title en"
        {...register("title_en", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_ru?.message}
      />
      <TextInput
        label="Description"
        withAsterisk
        placeholder="Description"
        {...register("description", { required: true, min: 3, maxLength: 60 })}
        error={errors.description?.message}
      />
      <TextInput
        label="Description uz"
        withAsterisk
        placeholder="Description uz"
        {...register("description_uz", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_uz?.message}
      />
      <TextInput
        label="Description ru"
        withAsterisk
        placeholder="Description ru"
        {...register("description_ru", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_ru?.message}
      />
      <TextInput
        label="Description en"
        withAsterisk
        placeholder="Description en"
        {...register("description_en", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_en?.message}
      />
      <div className={classes.wrapperImages}>
      {/* <TextInput
        type="file" id="avatar"
        error={errors.image?.message}
        {...register("image", { required: true })} 
      /> */}
       {/* <Field label="Picture" error={errors.picture}> */}
            <input
              {...register("image", {
                required: "Recipe picture is required",
              })}
              type="file"
              id="picture"
            />
          {/* </Field> */}
      {selectedFile && (
        <img
          src={previewURL}
          alt="Preview"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      )}
      </div>
      <select {...register("parent")} >
        {
          filteredCategory.map((item) => (
            <option value={item.id} key={item.id} >{item.title} </option>
          )
          )
        }
      </select>

      
    </form>
  );
}



