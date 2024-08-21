import { WARNA } from '@/module/_global';
import { Box, Button, Divider, Flex, Grid, Group, Modal, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcDocument, FcFolder, FcImageFile } from 'react-icons/fc';
import { funCreateFolder, funGetAllDocument } from '../lib/api_document';
import { useParams } from 'next/navigation';
import { IDataDocument } from '../lib/type_document';
import { useShallowEffect } from '@mantine/hooks';

export default function DrawerCutDocuments() {
  const [opened, setOpened] = useState(false);
  const param = useParams<{ id: string }>()
  const [path, setPath] = useState('home')
  const [dataDocument, setDataDocument] = useState<IDataDocument[]>([])
  const [valName, setValName] = useState('')


  async function onCreateFolder() {
    try {
      const res = await funCreateFolder({
        name: valName,
        path: path,
        idDivision: param.id
      })
      if (res.success) {
        getOneData()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat folder baru, coba lagi nanti");
    }

    setOpened(false)
  }


  async function getOneData() {
    try {
      const respon = await funGetAllDocument("?division=" + param.id + "&path=" + path);
      if (respon.success) {
        setDataDocument(respon.data);
      } else {
        toast.error(respon.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan item, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneData()
  }, [param.id, path])

  return (
    <Box>
      <Box h={60} pos={"fixed"} bottom={0} w={{ base: "92%", md: "94%" }} style={{
        zIndex: 999
      }}>
        <Grid justify='center'>
          <Grid.Col span={6}>
            <Button variant="subtle" fullWidth color={WARNA.biruTua} radius={"xl"} onClick={() => setOpened(true)}>BUAT FOLDER BARU</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button variant="filled" fullWidth color={WARNA.biruTua} radius={"xl"}>PINDAH</Button>
          </Grid.Col>
        </Grid>
      </Box>
      <Box p={10} pb={60}>
        {dataDocument.map((v, i) => {
          return (
            <Box key={i}>
              <Box mt={10} mb={10} onClick={() => setPath(v.id)}>
                <Grid align='center'>
                  <Grid.Col span={12}>
                    <Group gap={20}>
                      <Box>
                        {
                          (v.category == "FOLDER") ?
                            <FcFolder size={60} /> :
                            (v.extension == "pdf" || v.extension == "csv") ?
                              <FcDocument size={60} /> :
                              <FcImageFile size={60} />
                        }
                      </Box>
                      <Flex direction={'column'}>
                        <Text>{(v.category == "FOLDER") ? v.name : v.name + '.' + v.extension}</Text>
                      </Flex>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Box>
              <Divider size="xs" />
            </Box>
          )
        })}
      </Box>



      <Modal styles={{
        body: {
          borderRadius: 20
        },
        content: {
          borderRadius: 20,
          border: `2px solid ${"#828AFC"}`
        }
      }} opened={opened} onClose={() => setOpened(false)} centered withCloseButton={false}>
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>Buat Folder</Text>
          <Box mt={20} mb={20}>
            <TextInput
              styles={{
                input: {
                  color: WARNA.biruTua,
                  borderRadius: '#828AFC',
                  borderColor: '#828AFC',
                },
              }}
              size="md"
              radius={10}
              placeholder="Nama folder"
              value={valName}
              onChange={(e) => setValName(e.target.value)}
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setOpened(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={() => onCreateFolder()}>Membuat</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
