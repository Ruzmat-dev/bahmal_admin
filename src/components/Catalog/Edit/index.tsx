

// const CatalogEdit = () => {
//   // UPDATE action
//   const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
//     values,
//     table,
//   }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await updateUser(values);
//     table.setEditingRow(null); //exit editing mode
//   };

//   // ...

//   // Add this function to your component
//   async function updateUser(updatedUser: User) {
//     try {
//       // Send an API request to update the user data
//       const response = await fetch(`/api/users/${updatedUser.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       if (!response.ok) {
//         // Handle the case where the update request fails
//         throw new Error('Failed to update user');
//       }

//       // Update the user data in the component's state or refetch the user data
//       // This depends on how you manage your data in your app
//       // For example, you can refetch the data with a query here if you're using React Query

//       // Exit editing mode (you can use the table object to control this)
//       // table.setEditingRow(null);

//       // Optionally, show a success message
//       toast.success('User updated successfully');
//     } catch (error) {
//       // Handle errors here, e.g., show an error message
//       console.error('Error updating user:', error);
//       toast.error('Failed to update user');
//     }
//   }

//   return (
//     <div>CatalogEdit</div>
//   )
// }

// export default CatalogEdit



import { useForm } from 'react-hook-form';
import classes from "./edit.module.css"
import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../../api/axiosPrivate';
import { TextInput, Button, Text, Loader } from '@mantine/core';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../../api/axiosPublic';
import { IdCategory, TChangeCategory, TPostCategory } from '../../../../types/data';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import MaterialSymbolsEditOutlineRounded from '../../icons/MaterialSymbolsEditOutlineRounded';
interface FormData {
  "title": string,
  "title_ru": string,
  "title_en": string,
  "title_uz": string,
  "description": string,
  "description_ru": string,
  "description_en": string,
  "description_uz": string,
}

const schema = yup
  .object({
    title: yup.string(),
    title_ru: yup.string(),
    title_uz: yup.string(),
    title_en: yup.string(),
    description: yup.string(),
    description_ru: yup.string(),
    description_en: yup.string(),
    description_uz: yup.string(),
  })
  .required()

export default function CategoriesEdit() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL,] = useState<string>('');
  // const [titleProduct , setTitleProduct] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [prodctData, setProductData] = useState<IdCategory>()

  const [postData, setPostData] = useState<TPostCategory>({
    title: "" ,
  title_uz: "" ,
  title_ru: "" ,
  title_en: "" ,
  description: "" ,
  description_ru: "" ,
  description_uz: "" ,
  description_en: "" ,
  })

  const [product, setProduct] = useState<TChangeCategory>({
    id: null,
    description: "",
    image: null,
    parent: null,
    title: ""
  })
  const { id } = useParams()

  const getCategoryId = async () => {
    try {
      const uz = await axiosPublic("uz").get<IdCategory>(`/categories/${id}/`);
      const ru = await axiosPublic("ru").get<IdCategory>(`/categories/${id}/`); 
      const en = await axiosPublic("en").get<IdCategory>(`/categories/${id}/`);
      setPostData({...postData, title: uz.data.title , title_uz: uz.data.title , title_en: en.data.title , title_ru: ru.data.title , description: uz.data.description , description_uz: uz.data.description , description_ru: ru.data.description , description_en: en.data.description , parent: uz.data.parent})
    } catch (error) {
      console.log(error);
    }
  }

  const updateData = async () => {
    try {
      await axiosPrivate.put<TChangeCategory>(`/categories/${id}/`, product);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    getCategoryId()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async () => {
    console.log(postData);
    
    setIsSubmitting(true);
    const new_data = {...postData, image: selectedFile}

    console.log(new_data);
    
    try {
      await axiosPrivate.patch(`/categories/${id}/`, new_data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to form data
        },
      });
      toast.success('Movafiqiyatli Qoshildi!')
      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError;

      const myError = axiosError.request?.status ?? 0;
      const errorNumber = Math.floor(myError / 100);

      if (errorNumber === 4) {
        toast.error('Xato malumot kiritildi!');
      } else if (errorNumber === 5) {
        toast.error('Uzir hatoliq yuz berdi!');
      } else {
        toast.error('Internet aloqasi yo`q!');
      }
      setIsSubmitting(false);
    }
  }

  function handleOnChangeName(e: string) {
    setPostData({ ...postData, title: e });
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);

      console.log('Selected file:', file.name);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.catalogAdd}>
        <Text fz="28" fw={'bold'}>{postData?.title} </Text>
      <TextInput
        label="Title"
        withAsterisk
        placeholder="Input placeholder"
        {...register("title", { min: 3, maxLength: 59 })}
        error={errors.title?.message}
        // defaultValue={postData?.title}
        value={postData.title}
        onChange={(e) => handleOnChangeName(e.target.value)}
      />
      <TextInput
        label="Title uz"
        withAsterisk
        placeholder="Title uz"
        {...register("title_uz", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_uz?.message}
        defaultValue={postData?.title_uz}
      />
      <TextInput
        label="Title ru"
        withAsterisk
        placeholder="Title ru"
        {...register("title_ru", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_ru?.message}
        defaultValue={postData?.title_ru}
      />
      <TextInput
        label="Title en"
        withAsterisk
        placeholder="Title en"
        {...register("title_en", { required: true, min: 3, maxLength: 60 })}
        error={errors.title_ru?.message}
        defaultValue={postData?.title_en}
      />
      <TextInput
        label="Description"
        withAsterisk
        placeholder="Description"
        {...register("description", { required: true, min: 3, maxLength: 60 })}
        error={errors.description?.message}
        defaultValue={postData?.description}
      />
      <TextInput
        label="Description uz"
        withAsterisk
        placeholder="Description uz"
        {...register("description_uz", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_uz?.message}
        defaultValue={postData?.description_uz}
      />
      <TextInput
        label="Description ru"
        withAsterisk
        placeholder="Description ru"
        {...register("description_ru", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_ru?.message}
        defaultValue={postData?.description_ru}
      />
      <TextInput
        label="Description en"
        withAsterisk
        placeholder="Description en"
        {...register("description_en", { required: true, min: 3, maxLength: 60 })}
        error={errors.description_en?.message}
        defaultValue={postData?.description_en}
      />
      <div className={classes.wrapperImages}>
        {/* <TextInput
        type="file" id="avatar"
        error={errors.image?.message}
        {...register("image", { required: true })} 
      /> */}
        {/* <Field label="Picture" error={errors.picture}> */}
        <input
          accept='image/*'
          onChange={handleFileChange}
          type="file"
          id="picture"
          // defaultValue={postData?.image}
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

      {/* <input type="submit" /> */}
      <Button disabled={isSubmitting} type='submit' color='#6EB648'>
        {isSubmitting ? <Loader color='#6EB648' /> : 'Qoshish'}
      </Button>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </form>
  );
}



