'use client'
import { globalRole, LayoutDrawer, SkeletonSingle, TEMA } from '@/module/_global';
import { Avatar, Box, Flex, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { funDeleteMemberProject, funGetOneProjectById } from '../lib/api_project';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { IDataMemberProject } from '../lib/type_project';
import { FaUser } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';


export default function ListAnggotaDetailProject() {
  const [isData, setData] = useState<IDataMemberProject[]>([])
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [dataChoose, setDataChoose] = useState({ id: '', name: '' })
  const router = useRouter()
  const roleLogin = useHookstate(globalRole)
  const tema = useHookstate(TEMA)

  async function getOneData() {
    try {
      setLoading(true)
      const res = await funGetOneProjectById(param.id, 'member');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan member Kegiatan, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])


  async function onSubmit() {
    try {
      const res = await funDeleteMemberProject(param.id, { idUser: dataChoose.id });
      if (res.success) {
        toast.success(res.message)
        setDataChoose({ id: '', name: '' })
        getOneData()
        setOpenDrawer(false)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus anggota Kegiatan, coba lagi nanti");
    }
  }
const isMobile = useMediaQuery('(max-width: 369px)');  

  return (
    <Box pt={20}>
      <Group justify="space-between">
        <Text c={tema.get().utama}>Anggota Terpilih</Text>
        <Text c={tema.get().utama}>Total {isData.length} Anggota</Text>
      </Group>
      <Box pt={10}>
        <Box mb={20}>
          <Box
            style={{
              border: `1px solid ${"#C7D6E8"}`,
              borderRadius: 10,
            }}
            px={20}
            py={10}
          >
            {
              loading ?
                Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <Box key={i}>
                      <SkeletonSingle />
                    </Box>
                  ))
                :
                isData.length === 0 ? <Text>Tidak ada anggota</Text> :
                  isData.map((v, i) => {
                    return (
                      <Box key={i}>
                        <Grid align='center' mt={10}
                          onClick={() => {
                            setDataChoose({ id: v.idUser, name: v.name })
                            setOpenDrawer(true)
                          }}
                        >
                          <Grid.Col span={9}>
                            <Group>
                              <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={isMobile ? 'md' : 'lg'} />
                              <Box w={{
                                base: isMobile ? 130 : 140,
                                xl: 270
                              }}>
                                <Flex direction={'column'} align="flex-start" justify="flex-start">
                                  <Text lineClamp={1} fz={isMobile ? 14 : 16}>{v.name}</Text>
                                  <Text c={"#5A687D"} fz={isMobile ? 10 : 14} lineClamp={1}>{v.email}</Text>
                                </Flex>
                              </Box>
                            </Group>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Text c={tema.get().utama} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
                              Anggota
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Box>
                    );
                  })}
          </Box>
        </Box>
      </Box>

      <LayoutDrawer opened={openDrawer} title={<Text lineClamp={1}>{dataChoose.name}</Text>} onClose={() => setOpenDrawer(false)}>
        <Box>
          <Stack pt={10}>
            <SimpleGrid
              cols={{ base: 2, sm: 3, lg: 3 }}
            >
              <Flex onClick={() => { router.push('/member/' + dataChoose.id) }} justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <FaUser size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama}>Lihat profil</Text>
                </Box>
              </Flex>

              {
                (roleLogin.get() != "user" && roleLogin.get() != "coadmin") &&
                <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <IoIosCloseCircle size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                    <Text c={tema.get().utama}>Keluarkan anggota</Text>
                  </Box>
                </Flex>
              }
            </SimpleGrid>
          </Stack>
        </Box>
      </LayoutDrawer>

      <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengeluarkan anggota?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />

    </Box>
  );
}

