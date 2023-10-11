import {  useEffect, useState } from 'react';
import {
  Table,
  UnstyledButton,
  Text,
  TextInput,
  rem,
  Button
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import MaterialSymbolsDeleteOutlineRounded from '../icons/MaterialSymbolsDeleteOutlineRounded';
import { getCategories } from '../../api/data';
import { TCategory } from '../../../types/data';
import MaterialSymbolsVisibilityOutlineRounded from '../icons/MaterialSymbolsVisibilityOutlineRounded';
import { Link } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { axiosPrivate } from '../../api/axiosPrivate';
import toast, { Toaster } from 'react-hot-toast';
import MaterialSymbolsAddRounded from '../icons/MaterialSymbolsAddRounded';
import MaterialSymbolsEditOutlineRounded from '../icons/MaterialSymbolsEditOutlineRounded';
interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Text fw={500} fz="sm">
          {children}
        </Text>
      </UnstyledButton>
    </Table.Th>
  );
}

function shortenText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

export function TableSort() {
  const [category, setCategory] = useState<TCategory[] | undefined>([]);

  const handleDelete = async (id: number) => {
    try {
      await axiosPrivate.delete(`/categories/${id}/`)
      toast.success('Movafiqiyatli!')
      fetchData()

    } catch (error) {
      toast.error('O`chirishda xatolik yuz berdi!');
    }
  };


  const fetchData = async () => {
    try {
      const res = await getCategories()
        setCategory(res?.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openDeleteModal = (e: TCategory) => {
    modals.openConfirmModal({
      title: e.title,
      centered: true,
      children: (
        <Text size="sm">
          Siz haqiqatan ham bu mahsulotni ochirmoqchimisiz
        </Text>
      ),
      labels: { confirm: 'xa', cancel: "yuq" },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDelete(e.id),
    })
  }

  const rows = category && category.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{shortenText(row.title, 24)} </Table.Td>
      <Table.Td className={classes.catalog_iconWrapper}>
        <Link to={`/categories/see/${row.id}`}>
          <MaterialSymbolsVisibilityOutlineRounded fontSize={22} color='#A9A9A9' cursor="pointer" />
        </Link>
      </Table.Td>
      <Table.Td>
        <Link to={`/categories/edit/${row.id}`}>
          <MaterialSymbolsEditOutlineRounded fontSize={22} color='gold' cursor="pointer" />
        </Link>
      </Table.Td>
      <Table.Td>
        <MaterialSymbolsDeleteOutlineRounded fontSize={22} color='red' cursor="pointer" onClick={() => openDeleteModal(row)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.catalog}>
        <div className={classes.wrppaerInputAndBtn}>
          <TextInput
            placeholder="Categorya boyicha qidiru"
            type='text'
            mb="md"
            w={600}
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          />
          <Link to="/newCategories">
            <Button className={classes.addNewCategory} color='#6EB648'>
              <MaterialSymbolsAddRounded fontWeight={700} fontSize={22} />
              <Text fw={'normal'}>Yangi Categorya qoshish</Text>
            </Button>
          </Link>

        </div>
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Thead>
            <Table.Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Korish</Th>
              <Th>Tahrirlash</Th>
              <Th>Ochirish</Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>  {rows} </Table.Tbody>
        </Table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}






// import { useForm } from 'react-hook-form';
// import classes from "./edit.module.css"
// import { useState, useEffect, useRef } from 'react';
// import { axiosPrivate } from '../../../api/axiosPrivate';
// import { TextInput, Button, Text, Loader, Textarea } from '@mantine/core';
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
// import { useNavigate, useParams } from 'react-router-dom';
// import { axiosPublic } from '../../../api/axiosPublic';
// import { IdCategory, TPostCategory } from '../../../../types/data';
// import toast, { Toaster } from 'react-hot-toast';
// import { AxiosError } from 'axios';
// import MaterialSymbolsArrowBackRounded from '../../icons/MaterialSymbolsArrowBackRounded';
// import MaterialSymbolsDownload from '../../icons/MaterialSymbolsDownload';
// import TwemojiFlagUzbekistan from '../../icons/TwemojiFlagUzbekistan';
// import TwemojiFlagRussia from '../../icons/TwemojiFlagRussia';
// import FxemojiGreatbritainflag from '../../icons/FxemojiGreatbritainflag';
// type FormData = {
//   title?: string;
//   title_ru?: string;
//   title_uz?: string;
//   title_en?: string;
//   description?: string;
//   description_ru?: string;
//   description_en?: string;
//   description_uz?: string;
// };
// const schema = yup
//   .object({
//     title: yup.string(),
//     title_ru: yup.string(),
//     title_uz: yup.string(),
//     title_en: yup.string(),
//     description: yup.string(),
//     description_ru: yup.string(),
//     description_en: yup.string(),
//     description_uz: yup.string(),
//   })
//   .required()

// export default function CategoriesEdit() {

//   const [previewURL, setPreviewURL] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [titleName, setTitleName] = useState<string>("")
//   const [postData, setPostData] = useState<TPostCategory>({})
//   const { id } = useParams()
//   const fileRef = useRef<HTMLInputElement | null>(null)
//   const getCategoryId = async () => {
//     try {
//       const uz = await axiosPublic("uz").get<IdCategory>(`/categories/${id}/`)
//       const ru = await axiosPublic("ru").get<IdCategory>(`/categories/${id}/`)
//       const en = await axiosPublic("en").get<IdCategory>(`/categories/${id}/`)

//       setPostData({ 
//         title: uz.data.title, 
//         title_uz: uz.data.title, 
//         title_en: en.data.title, 
//         title_ru: ru.data.title, 
//         description: uz.data.description, 
//         description_uz: uz.data.description, 
//         description_ru: ru.data.description, 
//         description_en: en.data.description, 
//         parent: uz.data.parent, 
//         image: uz.data.image 
//       })

//       setTitleName(uz.data.title)
//       setPreviewURL(uz.data.image)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getCategoryId()
//   }, [])

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(schema)
//   });

//   const onSubmit = async () => {
//     console.log(postData)


//     // try {
//     //   await axiosPrivate.patch(`/categories/${id}/`, new_data, {
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //   });
//     //   toast.success('Movafiqiyatli Qoshildi!')
//     //   setIsSubmitting(false);
//     // } catch (error) {
//     //   const axiosError = error as AxiosError;

//     //   const myError = axiosError.request?.status ?? 0;
//     //   const errorNumber = Math.floor(myError / 100);

//     //   if (errorNumber === 4) {
//     //     toast.error('Xato malumot kiritildi!');
//     //   } else if (errorNumber === 5) {
//     //     toast.error('Uzir hatoliq yuz berdi!');
//     //   } else {
//     //     toast.error('Internet aloqasi yo`q!');
//     //   }
//     //   setIsSubmitting(false);
//     // }
//   }
//   const navigate = useNavigate();
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.currentTarget.files?.[0]
//     setPostData({...postData, image: file})
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         const result = e.target?.result as string
//         setPreviewURL(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={classes.catalogAdd}>
//       <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
//         <div className={classes.goBackBtn} onClick={() => navigate(-1)}>
//           <MaterialSymbolsArrowBackRounded fontSize={28} style={{ marginTop: "6px" }} />
//         </div>
//         <Text c="#6EB648" size='xl' fw={'initial'}> {titleName} </Text>
//         <div className={classes.imgWrapper}>
//           <div className={classes.imgWrapperItem} onClick={() => fileRef.current?.click()}>
//             <span>
//               <MaterialSymbolsDownload fontSize={56} color='#6EB648' />
//             </span>
//           </div>
//           <div className={classes.wrapperImages}>
//             <input
//               hidden
//               ref={fileRef}
//               accept='image/*'
//               onChange={handleFileChange}
//               type="file"
//               id="picture"
//             />
//             <img
//               src={previewURL}
//               alt="Preview"
//             />
//           </div>
//         </div>
//       </div>
//       <TextInput
//         label="Nomi"
//         withAsterisk
//         placeholder="Nomi"
//         {...register("title", { min: 3, maxLength: 59 })}
//         size='md'
//         error={errors.title?.message}
//         type='text'
//         defaultValue={postData.title}
//         onChange={(e) => setPostData({...postData , title: e.target.value})}
//       />
//       <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
//         <TextInput
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Nomi</span> <TwemojiFlagUzbekistan fontSize={18} />
//             </span>
//           }
//           style={{ flex: "1", height: "60px" }}
//           size='md'
//           h={70}
//           placeholder="Nomi"
//           {...register("title_uz", { required: true, min: 3, maxLength: 60 })}
//           error={errors.title_uz?.message}
//           type='text'
//           defaultValue={postData.title_uz}
//           onChange={(e) => setPostData({...postData , title_uz: e.target.value})}
//         />
//         <TextInput
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Названия</span> <TwemojiFlagRussia fontSize={18} />
//             </span>
//           }
//           placeholder="Названия"
//           style={{ flex: "1" }}
//           size='md'
//           {...register("title_ru", { required: true, min: 3, maxLength: 60 })}
//           error={errors.title_ru?.message}
//           type='text'
//           defaultValue={postData.title_ru}
//           onChange={(e) => setPostData({...postData , title_ru: e.target.value})}
//         />
//         <TextInput
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Title</span> <FxemojiGreatbritainflag fontSize={18} />
//             </span>
//           }
//           placeholder="Title"
//           style={{ flex: "1" }}
//           size='md'
//           {...register("title_en", { required: true, min: 3, maxLength: 60 })}
//           error={errors.title_ru?.message}
//           type='text'
//           defaultValue={postData.title_en}
//           onChange={(e) => setPostData({...postData , title_en: e.target.value})}
//         />
//       </div>
//       <Textarea
//         label="Ma'lumot"
//         withAsterisk
//         placeholder="Ma'lumot"
//         {...register("description", { required: true, min: 3, maxLength: 60 })}
//         size='md'
//         error={errors.description?.message}
//         defaultValue={postData.description}
//         onChange={(e) => setPostData({...postData , description: e.target.value})}
//       />
//       <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>

//         <Textarea
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Ma'lumot</span> <TwemojiFlagUzbekistan fontSize={18} />
//             </span>
//           }
//           placeholder="Ma'lumot"
//           {...register("description_uz", { required: true, min: 3, maxLength: 60 })}
//           error={errors.description_uz?.message}
//           style={{ flex: "1" }}
//           size='md'
//           defaultValue={postData.description_uz}
//           onChange={(e) => setPostData({...postData , description_uz: e.target.value})}
//         />
//         <Textarea
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Информация</span> <TwemojiFlagRussia fontSize={18} />
//             </span>
//           }
//           placeholder="Информация"
//           {...register("description_ru", { required: true, min: 3, maxLength: 60 })}
//           error={errors.description_ru?.message}
//           style={{ flex: "1" }}
//           size='md'
//           defaultValue={postData.description_ru}
//           onChange={(e) => setPostData({...postData , description_ru: e.target.value})}
//         />
//         <Textarea
//           label={
//             <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
//               <span >Description</span> <FxemojiGreatbritainflag fontSize={18} />
//             </span>
//           }
//           placeholder="Description"
//           {...register("description_en", { required: true, min: 3, maxLength: 60 })}
//           error={errors.description_en?.message}
//           style={{ flex: "1" }}
//           size='md'
//           defaultValue={postData.description_en}
//           onChange={(e) => setPostData({...postData , description_en: e.target.value})}
//         />
//       </div>
//       <Button disabled={isSubmitting} type='submit' color='#6EB648' h={50} w={435} size='md'>
//         <Text >
//           {isSubmitting ? <Loader color='#6EB648' /> : 'Qoshish'}
//         </Text>
//       </Button>
//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//       />
//     </form>
//   );
// }



