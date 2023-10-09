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
    // const [searchs , setSearchs] = useState<string>("")
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
        setCategory(res?.data);
      } catch (error) {
        console.log(error);
      }
    }

    const handleInputChange = (event: string) => {
      const filteredCategory = category?.filter((item) =>
      item.title.toLowerCase().includes(event.toLowerCase()));
      setCategory(filteredCategory);
    };


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

    const rows = category && category.map((row , index) => (
      row.parent == null &&
      
      <Table.Tr key={row.id}>
        <Table.Td>{index+1}</Table.Td>
        <Table.Td>{shortenText(row.title, 24)} </Table.Td>
        <Table.Td className={classes.catalog_iconWrapper}>
          <Link to={`/categories/see/${row.id}`}>
            <MaterialSymbolsVisibilityOutlineRounded fontSize={22} color='#A9A9A9' cursor="pointer" />
          </Link>
        </Table.Td>
        {/* <Table.Td>
          <Link to={`/categories/add/${row.id}`}>
            <MaterialSymbolsAddCircleOutlineRounded fontSize={22} color='#6EB648' cursor="pointer" />
          </Link>
        </Table.Td> */}
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
        <ScrollArea>
          <div className={classes.wrppaerInputAndBtn}>
            <TextInput
              placeholder="Categorya boyicha qidiru"
              type='text'
              mb="md"
              w={600}
              leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <Link to="/newCategories">
              <Button className={classes.addNewCategory} color='#6EB648'> 
              <MaterialSymbolsAddRounded fontWeight={700} fontSize={22} /> 
              <Text fw={'normal'}>Yangi Categorya qoshish</Text>
              </Button>
            </Link>

          </div>
          <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Korish</Th>
                {/* <Th>Qoshish</Th> */}
                <Th>Tahrirlash</Th>
                <Th>Ochirish</Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody className={classes.wrapperNotFount}>
              {rows && rows.length > 0 ? (
                rows
              ) : (
                
                    // <div  className={classes.wrapperNotFount}>
                      <img src="../../../public/404 Error-rafiki 1.png" alt="" className={classes.iconNotFount} />
                    // </div>
                
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