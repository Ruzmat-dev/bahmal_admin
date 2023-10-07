import { useForm } from 'react-hook-form';
import classes from "./newCatalog.module.css"
import { useState  } from 'react';
import { axiosPrivate } from '../../../api/axiosPrivate';
import { TextInput, Button,  Loader} from '@mantine/core';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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

export default function NewCategories() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL,] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const new_data = { ...data, image: selectedFile, parent: null }
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



