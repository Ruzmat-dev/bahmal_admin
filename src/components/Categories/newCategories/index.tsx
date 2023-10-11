import { useForm } from 'react-hook-form';
import classes from "./newCategories.module.css"
import { useRef, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosPrivate';
import { TextInput, Button, Loader, Textarea, Text } from '@mantine/core';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import TwemojiFlagUzbekistan from '../../icons/TwemojiFlagUzbekistan';
import TwemojiFlagRussia from '../../icons/TwemojiFlagRussia';
import FxemojiGreatbritainflag from '../../icons/FxemojiGreatbritainflag';
import MaterialSymbolsDownload from '../../icons/MaterialSymbolsDownload';
import MaterialSymbolsArrowBackRounded from '../../icons/MaterialSymbolsArrowBackRounded';
import { useNavigate } from 'react-router-dom';
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
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewImage] = useState<string>('https://content.hostgator.com/img/weebly_image_sample.png');
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
    const new_data = { ...data, image: selectedFile }
    console.log(data);

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
      console.log(error);

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

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
      }
      setSelectedFile(file)

      reader.readAsDataURL(file)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.catalogAdd}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
        <div className={classes.goBackBtn} onClick={() => navigate(-1)}>
          <MaterialSymbolsArrowBackRounded fontSize={28} style={{ marginTop: "6px" }} />
        </div>
        <Text c="#6EB648" size='xl' fw={'initial'}> Yangi Categorya qo`shish </Text>
        <div className={classes.imgWrapper}>
          <div className={classes.imgWrapperItem} onClick={() => fileRef.current?.click()}>
            <span>
              <MaterialSymbolsDownload fontSize={56} color='#6EB648' />
            </span>
          </div>
          <div className={classes.wrapperImages}>
            <input
              hidden
              ref={fileRef} 
              accept='image/*'
              onChange={handleFileChange}
              type="file"
              id="picture"
            />

            <img
              src={previewURL}
              alt="Preview"
            />

          </div>
        </div>
      </div>

      <TextInput
        label="Nomi"
        withAsterisk
        placeholder="Nomi"
        {...register("title", { min: 3, maxLength: 59 })}
        size='md'
        error={errors.title?.message}
        type='text'
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
        <TextInput
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Nomi</span> <TwemojiFlagUzbekistan fontSize={18} />
            </span>
          }
          style={{ flex: "1", height: "60px" }}
          size='md'
          h={70}
          placeholder="Nomi"
          {...register("title_uz", { required: true, min: 3, maxLength: 60 })}
          error={errors.title_uz?.message}
          type='text'
        />
        <TextInput
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Названия</span> <TwemojiFlagRussia fontSize={18} />
            </span>
          }
          placeholder="Названия"
          style={{ flex: "1" }}
          size='md'
          {...register("title_ru", { required: true, min: 3, maxLength: 60 })}
          error={errors.title_ru?.message}
          type='text'
        />
        <TextInput
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Title</span> <FxemojiGreatbritainflag fontSize={18} />
            </span>
          }
          placeholder="Title"
          style={{ flex: "1" }}
          size='md'
          {...register("title_en", { required: true, min: 3, maxLength: 60 })}
          error={errors.title_ru?.message}
          type='text'
        />
      </div>
      <Textarea
        label="Ma'lumot"
        withAsterisk
        placeholder="Ma'lumot"
        {...register("description", { required: true, min: 3, maxLength: 60 })}
        size='md'
        error={errors.description?.message}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>

        <Textarea
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Ma'lumot</span> <TwemojiFlagUzbekistan fontSize={18} />
            </span>
          }
          placeholder="Ma'lumot"
          {...register("description_uz", { required: true, min: 3, maxLength: 60 })}
          error={errors.description_uz?.message}
          style={{ flex: "1" }}
          size='md'
        />
        <Textarea
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Информация</span> <TwemojiFlagRussia fontSize={18} />
            </span>
          }
          placeholder="Информация"
          {...register("description_ru", { required: true, min: 3, maxLength: 60 })}
          error={errors.description_ru?.message}
          style={{ flex: "1" }}
          size='md'
        />
        <Textarea
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Description</span> <FxemojiGreatbritainflag fontSize={18} />
            </span>
          }
          placeholder="Description"
          {...register("description_en", { required: true, min: 3, maxLength: 60 })}
          error={errors.description_en?.message}
          style={{ flex: "1" }}
          size='md'

        />
      </div>



      <Button disabled={isSubmitting} type='submit' color='#6EB648' h={50} w={435} size='md'>
        <Text >
          {isSubmitting ? <Loader color='#6EB648' /> : 'Qoshish'}
        </Text>
      </Button>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </form>
  );
}



