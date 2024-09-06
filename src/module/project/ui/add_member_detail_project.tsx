"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IDataMemberProject, IDataMemberProjectDetail } from '../lib/type_project';
import toast from 'react-hot-toast';
import { funAddMemberProject, funGetAllMemberById, funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Group, Indicator, rem, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { FaCheck } from 'react-icons/fa6';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoArrowBackOutline, IoClose } from 'react-icons/io5';
import { Carousel } from '@mantine/carousel';

export default function AddMemberDetailProject() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [isData, setData] = useState<IDataMemberProjectDetail[]>([])
  const [isDataMember, setDataMember] = useState<IDataMemberProject[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [onClickSearch, setOnClickSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')


  async function getData() {
    try {
      setLoading(true)
      const response = await funGetAllMemberById('?search=' + searchQuery, param.id )
      if (response.success) {
        setData(response.data.member)
      } else {
        toast.error(response.message)
      }
      const res = await funGetOneProjectById(param.id, 'member');
      if (res.success) {
        setDataMember(res.data)
      } else {
        toast.error(res.message);
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan anggota, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != isData[index].idUser))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img  }])
    }
  };



  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      for (let index = 0; index < isData.length; index++) {
        if (!isDataMember.some((i: any) => i.idUser == isData[index].idUser)) {
          if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
            const newArr = {
              idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img
            }
            setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr])
          }
        }

      }
    } else {
      setSelectedFiles([]);
    }
  };


  function onVerifikasi() {
    if (selectedFiles.length == 0) {
      return toast.error("Error! silahkan pilih anggota")
    }

    setOpenModal(true)
  }

  useShallowEffect(() => {
    getData()
  }, [searchQuery]);

  async function onSubmit() {
    try {
      const res = await funAddMemberProject(param.id, { member: selectedFiles });
      if (res.success) {
        toast.success(res.message)
        router.back()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal menambahkan anggota, coba lagi nanti");
    }
  }

  const handleSearchClick = () => {
    setOnClickSearch(true);
  };

  const handleClose = () => {
    setOnClickSearch(false);
  };

  function handleXMember(id: number) {
    setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != id))
  }

  return (
    <Box>
      <LayoutNavbarNew
        back=""
        title="Pilih Anggota"
        menu={<ActionIcon onClick={handleSearchClick} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="search">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>}
      />
      {/* SEARCH */}
      {onClickSearch
        ? (
          <Box
            pos={'fixed'} top={0} p={rem(20)} w={"100%"} style={{
              maxWidth: rem(550),
              zIndex: 9999,
              backgroundColor: `${WARNA.biruTua}`,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <Grid justify='center' align='center' gutter={'lg'}>
              <Grid.Col span={1}>
                <ActionIcon onClick={handleClose} variant="subtle" color='white' size="lg" mt={5} radius="lg" aria-label="search">
                  <IoArrowBackOutline size={30} />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={11}>
                <TextInput
                  styles={{
                    input: {
                      color: "white",
                      borderRadius: '#A3A3A3',
                      borderColor: `${WARNA.biruTua}`,
                      backgroundColor: `${WARNA.biruTua}`,
                    },
                  }}
                  size="md"
                  radius={30}
                  placeholder="Pencarian"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid.Col>
            </Grid>
          </Box>
        )
        : null
      }
      {/* Close User */}
      <Box pos={'fixed'} top={80} pl={rem(20)} pr={rem(20)} pt={rem(20)} pb={rem(5)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 100,
        backgroundColor: `${WARNA.bgWhite}`,
        borderBottom: `1px solid ${"#E0DFDF"}`
      }}>
        {selectedFiles.length > 0 ? (
          <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {selectedFiles.map((v: any, i: any) => {
              return (
                <Carousel.Slide key={i}>
                  <Box w={{
                    base: 70,
                    xl: 70
                  }}
                    onClick={() => { handleXMember(v.idUser) }}
                  >
                    <Center>
                      <Indicator inline size={25} offset={7} position="bottom-end" color="red" withBorder label={<IoClose />}>
                        <Avatar style={{
                          border: `2px solid ${WARNA.biruTua}`
                        }} src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
                      </Indicator>
                    </Center>
                    <Text ta={"center"} lineClamp={1}>{v.name}</Text>
                  </Box>
                </Carousel.Slide>
              )
            })}
          </Carousel>
        ) : (
          <Box h={rem(81)}>
            <Flex justify={"center"} align={'center'} h={"100%"}>
              <Text ta={'center'} fz={14}>Tidak ada anggota yang dipilih</Text>
            </Flex>
          </Box>
        )}
      </Box>

      <Box p={20}>
        <Group justify="space-between" mt={100} onClick={handleSelectAll}>
          <Text c={WARNA.biruTua} fw={"bold"}>
            Pilih Semua Anggota
          </Text>
          {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
        </Group>
        {loading ?
          Array(8)
            .fill(null)
            .map((_, i) => (
              <Box key={i} mb={10}>
                <SkeletonSingle />
              </Box>
            ))
          :
          <Box mt={15} mb={100}>
            {isData.map((v, i) => {
              const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
              const found = isDataMember.some((i: any) => i.idUser == v.idUser)
              return (
                <Box mb={15} key={i} onClick={() => (!found) ? handleFileClick(i) : null}>
                  <Grid align='center'>
                    <Grid.Col span={{
                      base: 3,
                      xl: 2
                    }}>
                      <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={{
                      base: 9,
                      xl: 10
                    }}>
                      <Flex justify='space-between' align={"center"}>
                        <Flex direction={'column'} align="flex-start" justify="flex-start">
                          <Text lineClamp={1}>{v.name}</Text>
                          <Text c={"dimmed"}>{(found) ? "sudah menjadi anggota" : ""}</Text>
                        </Flex>
                        {isSelected ? <FaCheck /> : null}
                      </Flex>
                    </Grid.Col>
                  </Grid>
                  <Box mt={10}>
                    <Divider size={"xs"} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        }
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
        {loading ?
          <Skeleton height={50} radius={30} />
          :
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onVerifikasi() }}
          >
            Simpan
          </Button>
        }
      </Box>

      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin menambahkan anggota?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}
