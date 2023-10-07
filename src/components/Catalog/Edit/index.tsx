

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
import { useState , useEffect } from 'react';
import { axiosPrivate } from '../../../api/axiosPrivate';
import { TextInput, Button, Text , Loader} from '@mantine/core';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../../api/axiosPublic';
import { IdCategory } from '../../../../types/data';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
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
    title: yup.string().required(),
    title_ru: yup.string().required(),
    title_uz: yup.string().required(),
    title_en: yup.string().required(),
    description: yup.string().required(),
    description_ru: yup.string().required(),
    description_en: yup.string().required(),
    description_uz: yup.string().required(),
  })
  .required()

export default function CategoriesEdit() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL,] = useState<string>('');
  const [titleProduct , setTitleProduct] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { id } = useParams()

  const CategoryId = async () => {
     try {
        const res = await axiosPublic.get<IdCategory>(`/categories/${id}`);
        setTitleProduct(res.data.title);
        
      } catch (error) {
        console.log(error);
      }
    
  }

  useEffect(() => {
    CategoryId()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const new_data = { ...data, image: selectedFile, parent: id }


    try {

      const response = await axiosPrivate.post('/categories/', new_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Movafiqiyatli Qoshildi!')
      console.log(response);
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
      <Text fz="28" fw={'bold'}>{titleProduct}</Text>
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
          accept='image/*'
          onChange={handleFileChange}
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

      {/* <input type="submit" /> */}
      <Button disabled={isSubmitting} type='submit' color='#6EB648'>
      {isSubmitting ? <Loader color='#6EB648'/> : 'Qoshish'}
      </Button>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </form>
  );
}



