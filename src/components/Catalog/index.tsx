import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import MaterialSymbolsAddCircleOutlineRounded from '../icons/MaterialSymbolsAddCircleOutlineRounded';
import MaterialSymbolsDeleteOutlineRounded from '../icons/MaterialSymbolsDeleteOutlineRounded';
import { getCategories } from '../../api/data';
import { TCategory } from '../../../types/data';
import MaterialSymbolsVisibilityOutlineRounded from '../icons/MaterialSymbolsVisibilityOutlineRounded';
import { Link } from 'react-router-dom';
import { modals } from '@mantine/modals';
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
  const [search, ] = useState('');
  const [category, setCategory] = useState<TCategory[] | undefined>([]);

  const fetchData = async () => {
    try {
      const res = await getCategories()
      setCategory(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  const openDeleteModal = () => {
  modals.openConfirmModal({
    title: "ochirish",
    centered: true,
    children: (
      <Text size="sm">
        Siz haqiqatan ham bu mahsulotni ochirmoqchimisiz
      </Text>
    ),
    labels: { confirm: 'Ochirish', cancel: "Ortga" },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });
  }

  const rows = category && category.map((row) => (
    row.parent == null &&
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
        <MaterialSymbolsDeleteOutlineRounded fontSize={22} color='red' cursor="pointer" onClick={openDeleteModal} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.catalog}>
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Th
              >
                Id
              </Th>
              <Th
              >
                Title
              </Th>
              <Th
              >

                Korish

              </Th>
              <Th
              >
                Qoshish
              </Th>
              <Th
              >
                Ochirish
              </Th>
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
    </div>
  );
}