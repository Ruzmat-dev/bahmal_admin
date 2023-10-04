import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Loader
} from '@mantine/core';
import { axiosPublic } from '../../../api/axiosPublic';
import { useRef, useState } from "react"
import { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // "username": "admin",
  // "password": "CdREc5Bl5tiie32"

  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async () => {

    setIsSubmitting(true);
    try {
      const res = await axiosPublic.post("/accounts/login/", {
        "username": `${username}`,
        "password": `${password}`
      })
      toast.success('Movafiqiyatli!')
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      setIsSubmitting(false);
      window.location.reload()
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

      type ResponseData = {
        username?: string[];
        password?: string[];
      };

      const responseData = axiosError.response?.data as ResponseData;


      setIsSubmitting(false);
      if (responseData.username?.length === 1) {
        return usernameRef.current?.focus();
      }

      if (responseData.password?.length === 1) {
        return passwordRef.current?.focus();
      }
    }
  }


  return (
    <Container size={420} my={120} >
      <Title ta="center" c="#6EB648">
        Bahmal
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="your username" required ref={usernameRef} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required ref={passwordRef} mt="md" onChange={(e) => setPassword(e.target.value)} />
        <Group justify="space-between" mt="lg">
        </Group>
        <Button onClick={handleSubmit} fullWidth mt="xl" disabled={isSubmitting} color='#6EB648'>
          {isSubmitting ? <Loader color='#6EB648'/> : 'Sign in'}
        </Button>
      </Paper>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </Container>
  );
}