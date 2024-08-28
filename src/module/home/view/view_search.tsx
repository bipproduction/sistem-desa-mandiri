"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { funGetSearchAll } from '../lib/api_search';
import { useShallowEffect } from '@mantine/hooks';

export default function ViewSearch() {
  const [search, setSearch] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [dataProject, setDataProject] = useState([]);
  const [dataDivision, setDataDivision] = useState([]);

  async function featchSearch() {
    try {
      const res = await funGetSearchAll('?search=' + search);
      setDataUser(res.data.user);
      setDataProject(res.data.project);
      setDataDivision(res.data.division);
    } catch (error) {
      console.error(error)
      throw new Error("Error")
    }
  }

  useShallowEffect(() => {
    featchSearch()
  }, [search])

  return (
    <>
      <LayoutNavbarNew back='/home' title='Pencarian' menu={<></>} />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <pre>{JSON.stringify(dataUser, null, 1)}</pre>
        <pre>{JSON.stringify(dataProject, null, 1)}</pre>
        <pre>{JSON.stringify(dataDivision, null, 1)}</pre> */}
        
      </Box>
    </>
  );
}

