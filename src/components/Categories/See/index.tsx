import { useEffect, useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Text,
    Button
} from '@mantine/core';
import classes from './see.module.css';
import MaterialSymbolsDeleteOutlineRounded from '../../icons/MaterialSymbolsDeleteOutlineRounded';
import { getCategories } from '../../../api/data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { axiosPrivate } from '../../../api/axiosPrivate';
import toast, { Toaster } from 'react-hot-toast';
import { TCategory } from '../../../../types/data';
import MaterialSymbolsAddRounded from '../../icons/MaterialSymbolsAddRounded';
import MaterialSymbolsEditOutlineRounded from '../../icons/MaterialSymbolsEditOutlineRounded';
import MaterialSymbolsArrowBackRounded from '../../icons/MaterialSymbolsArrowBackRounded';
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
export default function CategoriesSee() {
    const [category, setCategory] = useState<TCategory[] | undefined>([]);
    const [parentName, setParentName] = useState<string>('')

    const handleDelete = async (id: number) => {
        try {
            await axiosPrivate.delete(`/categories/${id}/`)
            toast.success('Movafiqiyatli!')
            fetchData()

        } catch (error) {
            toast.error('O`chirishda xatolik yuz berdi!');
        }
    };
    const { id } = useParams()

    const fetchData = async () => {
        try {
            const res = await getCategories()
            const subs = res ? res.data.filter((item) => item?.id === Number(id)) : []
            setCategory(subs)
            setParentName(subs[0].title);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const navigate = useNavigate();

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

    const rows = category && category.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>{shortenText(row.title, 24)} </Table.Td>
            <Table.Td>
                <Link to={`/categories/add/${row.id}`}>
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
            <ScrollArea>
                <div className={classes.wrppaerInputAndBtn}>
                    <div className={classes.goBackBtn} onClick={() => navigate(-1)}>
                        <Button size="md" leftSection={<MaterialSymbolsArrowBackRounded />} bg="#6EB648" className={classes.goBackBtn}>
                            Chiqish
                        </Button>
                    </div>
                    <Text c="#6EB648" size='xl' fw={'initial'}> {parentName ?? "No Data"} </Text>
                    <Button className={classes.addNewCategory} color='#6EB648'>
                        <MaterialSymbolsAddRounded fontWeight={700} fontSize={22} />
                        Yangi Categorya qoshish
                    </Button>

                </div>
                <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                    <Table.Tbody>
                        <Table.Tr>
                            <Th>Id</Th>
                            <Th>Title</Th>
                            <Th>Qoshish</Th>
                            <Th>Ochirish</Th>
                        </Table.Tr>
                    </Table.Tbody>
                    <Table.Tbody>
                        {rows && rows}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}
