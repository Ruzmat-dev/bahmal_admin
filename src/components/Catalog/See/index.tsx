import { useEffect, useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Text,
    TextInput,
    rem,
    Button
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './see.module.css';
import MaterialSymbolsAddCircleOutlineRounded from '../../icons/MaterialSymbolsAddCircleOutlineRounded';
import MaterialSymbolsDeleteOutlineRounded from '../../icons/MaterialSymbolsDeleteOutlineRounded';
import { getCategories } from '../../../api/data';
import MaterialSymbolsVisibilityOutlineRounded from '../../icons/MaterialSymbolsVisibilityOutlineRounded';
import { Link, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { axiosPrivate } from '../../../api/axiosPrivate';
import toast, { Toaster } from 'react-hot-toast';
import {TCategory } from '../../../../types/data';
import MaterialSymbolsAddRounded from '../../icons/MaterialSymbolsAddRounded';
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
export function CatalogSee() {
    const [search,] = useState('');
    const [category, setCategory] = useState<TCategory[] | undefined>([]);
    // const [parent , setParent] = useState<number>(null)
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
            const subs = res ? res.data.filter((item) => item?.parent?.id === Number(id)) : []
            setCategory(subs)
            // console.log(subs);
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

    const rows = category && category.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>{shortenText(row.title, 24)} </Table.Td>
            <Table.Td className={classes.catalog_iconWrapper}>
                <Link to={`/categories/see/${row.id}`}>
                    <MaterialSymbolsVisibilityOutlineRounded fontSize={22} color='#A9A9A9' cursor="pointer" />
                </Link>
            </Table.Td>
            <Table.Td>
                <Link to={`/categories/add/${row.id}`}>
                    <MaterialSymbolsAddCircleOutlineRounded fontSize={22} color='#6EB648' cursor="pointer" />
                </Link>
            </Table.Td>
            <Table.Td>
                {/* ochir */}
                <MaterialSymbolsDeleteOutlineRounded fontSize={22} color='red' cursor="pointer" onClick={() => openDeleteModal(row)} />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className={classes.catalog}>
            <ScrollArea>
                <div className={classes.wrppaerInputAndBtn}>
                    <TextInput
                        placeholder="Categorya boyicha qidiru"
                        mb="md"
                        w={600}
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        value={search}
                    />
                    <Button className={classes.addNewCategory} color='#6EB648'>
                        <MaterialSymbolsAddRounded fontWeight={700} fontSize={22} />
                        Yangi Categorya qoshish </Button>

                </div>
                <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                    <Table.Tbody>
                        <Table.Tr>
                            <Th>Id</Th>
                            <Th>Title</Th>
                            <Th>Korish</Th>
                            <Th>Qoshish</Th>
                            <Th>Ochirish</Th>
                        </Table.Tr>
                    </Table.Tbody>
                    <Table.Tbody>
                        {rows && rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td>
                                    <Text fw={500} ta="center">
                                        <img src="../../../public/no-results.png" alt="" className={classes.iconNotFount} />
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
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