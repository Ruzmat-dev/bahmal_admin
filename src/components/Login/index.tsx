import {
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import { useRef, useState } from "react"
import { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { axiosPrivate } from '../../api/axiosPrivate';
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import classes from "./login.module.css"

interface FormData {
    username?: string,
    password?: string
}

const schema = yup
    .object({
        username: yup.string().min(3),
        password: yup.string().min(3)
    })
    .required()


export default function LoginForm() {

    const inputFocusStyles = {
        '&:focus': {
            borderColor: 'black',
            boxShadow: '0 0 0 2px rgba(0, 0, 255, 0.3)',
        },
    };

    const [loading, setLoading] = useState<boolean>(false)
    // "username": "admin",
    // "password": "CdREc5Bl5tiie32"

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const { register, handleSubmit, formState: { errors }, reset  } = useForm<FormData>({ resolver: yupResolver(schema) })

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        try {
            const res = await axiosPrivate.post("/accounts/login/", data)
            toast.success('Movafiqiyatli!')
            reset()
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            window.location.reload()
            setLoading(false)
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
            setLoading(false)

            type ResponseData = {
                username?: string[];
                password?: string[];
            };

            const responseData = axiosError.response?.data as ResponseData;
            if (responseData.username?.length === 1) {
                return usernameRef.current?.focus();
            }

            if (responseData.password?.length === 1) {
                return passwordRef.current?.focus();
            }
        }
    }

    return (
        <div className={classes.container}>
            <Container w={400}>
                <Title ta="center" c="#6EB648">
                    Bahmal
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextInput style={{ ...inputFocusStyles }} type='text' label="Username" placeholder="your username" required {...register("username")} error={errors.username?.message} />
                        <PasswordInput label="Password" type='password' placeholder="Your password" required mt="md" {...register("password")} error={errors.password?.message} />
                        <Group justify="space-between" mt="lg">
                        </Group>
                        <Button loading={loading} disabled={loading} type='submit' fullWidth mt="xl" color='#6EB648'>
                            Sign in
                        </Button>
                    </form>
                </Paper>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </Container>
        </div>
    );
}