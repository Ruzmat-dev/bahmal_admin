import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import MaterialSymbolsAddCircleOutlineRounded from '../icons/MaterialSymbolsAddCircleOutlineRounded';
// import MaterialSymbolsEditOutlineRounded from '../icons/MaterialSymbolsEditOutlineRounded';
import MaterialSymbolsDeleteOutlineRounded from '../icons/MaterialSymbolsDeleteOutlineRounded';
import { getCategories } from '../../api/data';
import { TCategory } from '../../../types/data';
import MaterialSymbolsVisibilityOutlineRounded from '../icons/MaterialSymbolsVisibilityOutlineRounded';
import { Link } from 'react-router-dom';

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton  className={classes.control}>
        <Text fw={500} fz="sm">
          {children}
        </Text>
      </UnstyledButton>
    </Table.Th>
  );
}




const data = [
  {
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
    email: 'Elouise.Prohaska@yahoo.com',
  },
  {
    name: 'Deangelo Runolfsson',
    company: 'Greenfelder - Krajcik',
    email: 'Kadin_Trantow87@yahoo.com',
  },
];

// const  getData = async () => {
//  const cats = await getCategories()

//   return  cats?.data 
// }

function shortenText(text: string, maxLength: number) {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength - 3) + '...';
}

export   function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
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

  // console.log(category);
  
  const rows =category && category.map((row) => (
    row.parent == null &&
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{shortenText(row.title , 24)} </Table.Td>
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
      {/* <Table.Td>
        <MaterialSymbolsEditOutlineRounded fontSize={22} color='gold' cursor="pointer" />
      </Table.Td> */}
      <Table.Td>
        <MaterialSymbolsDeleteOutlineRounded fontSize={22} color='red' cursor="pointer" />
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
          // onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Th
                // sorted={sortBy === 'name'}
                // reversed={reverseSortDirection}
                // onSort={() => setSorting('name')}
              >
                Id
              </Th>
              <Th
                // sorted={sortBy === 'email'}
                // reversed={reverseSortDirection}
                // onSort={() => setSorting('email')}
              >
                Title
              </Th>
              <Th
                // sorted={sortBy === 'company'}
                // reversed={reverseSortDirection}
                // onSort={() => setSorting('company')}
              >
                
                  Korish
                
              </Th>
              <Th
                // sorted={sortBy === 'company'}
                // reversed={reverseSortDirection}
                // onSort={() => setSorting('company')}
              >
                Qoshish
              </Th>
              <Th
                // sorted={sortBy === 'company'}
                // reversed={reverseSortDirection}
                // onSort={() => setSorting('company')}
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
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text fw={500} ta="center">
                    Nothing found
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