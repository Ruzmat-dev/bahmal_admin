import { useCallback, useEffect, useState } from "react"
import classes from "./edit.module.css"
import { TextInput, Button, Text, Textarea } from '@mantine/core';
import TwemojiFlagUzbekistan from '../../icons/TwemojiFlagUzbekistan';
import TwemojiFlagRussia from '../../icons/TwemojiFlagRussia';
import FxemojiGreatbritainflag from '../../icons/FxemojiGreatbritainflag';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getStatisticsById } from "../../../api/data";
import { axiosPrivate } from "../../../api/axiosPrivate";
import { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MaterialSymbolsArrowBackRounded from "../../icons/MaterialSymbolsArrowBackRounded";

type FormData = {
  number?: number,
  body_ru?: string,
  body_en?: string,
  body_uz?: string,
};

const schema = yup
  .object({
    number: yup.number(),
    body_ru: yup.string(),
    body_en: yup.string(),
    body_uz: yup.string(),
  })

export default function StatisticsEdit() {
  const { register, setValue, handleSubmit } = useForm<FormData>({ resolver: yupResolver(schema) })
  const [loading, setLoading] = useState<boolean>(false)
  const [parentName, setParentName] = useState<string | undefined | null>('')
  const { id } = useParams()

  const handleFetchData = useCallback(async () => {
    if (id) {
      const [res_uz, res_ru, res_en] = await Promise.all([getStatisticsById(id, "uz"), getStatisticsById(id, "ru"), getStatisticsById(id, "en")])
      if (res_en && res_uz && res_ru) {
        setValue("body_en", res_uz.data.body)
        setValue("body_ru", res_ru.data.body)
        setValue("body_uz", res_en.data.body)
        setValue("number", res_uz.data.number)
        setParentName(res_uz.data.body)
      }
    }
  }, [id, setValue])

  useEffect(() => {
    handleFetchData()
  }, [handleFetchData])
  const navigate = useNavigate();



  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    try {
      await axiosPrivate.patch(`/statistics/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      toast.success('Movafiqiyatli Qoshildi!')
      setLoading(false)
      navigate(-1)
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
      setLoading(false)
    }
  }


  return (
    <div className={classes.statisticsAdd}>
      <div className={classes.headerForm}>
        <div className={classes.goBackBtn} onClick={() => navigate(-1)}>
          <Button size="md" leftSection={<MaterialSymbolsArrowBackRounded />} bg="#6EB648" className={classes.goBackBtn}>
            Chiqish
          </Button>
        </div>
        <Text c="#6EB648" size='xl' fw={'initial'}>  {parentName} </Text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          data-autofocus
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Nomi</span> <TwemojiFlagUzbekistan fontSize={18} />
            </span>
          }
          {...register("body_uz")}
          placeholder="Mahsulot nomin yozig"
          mt="md"
          rows={3}
        />
        <Textarea
          data-autofocus
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Названия</span> <TwemojiFlagRussia fontSize={18} />
            </span>
          }
          {...register("body_ru")}
          placeholder="Називания"
          mt="md"
          rows={3}
        />
        <Textarea
          data-autofocus
          label={
            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
              <span >Title</span> <FxemojiGreatbritainflag fontSize={18} />
            </span>
          }
          {...register("body_en")}
          placeholder="Title"
          mt="md"
          rows={3}
        />
        <TextInput
          type="number"
          label="Soni"
          placeholder="Mahsulot soni"
          {...register("number")}
        />
        <Button loading={loading} disabled={loading} type='submit' color='#6EB648' size='md' className={classes.goBackBtn}>
          Qoshish
        </Button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}



