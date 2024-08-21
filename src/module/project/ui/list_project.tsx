"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { RiCircleFill } from 'react-icons/ri';
import { funGetAllProject } from '../lib/api_project';
import toast from 'react-hot-toast';
import { useShallowEffect } from '@mantine/hooks';
import { IDataProject } from '../lib/type_project';

export default function ListProject() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()
  const [isData, setData] = useState<IDataProject[]>([])
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async () => {
    try {
      setData([]);
      setLoading(true);

      const response = await funGetAllProject('?status=' + status + '&search=' + searchQuery)

      if (response.success) {
        setData(response?.data)
      } else {
        toast.error(response.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error("Gagal mendapatkan proyek, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useShallowEffect(() => {
    fetchData();
  }, [status, searchQuery]);

  const handleList = () => {
    setIsList(!isList)
  }

  return (
    <Box mt={20}>
      <Grid justify='center' align='center'>
        <Grid.Col span={10}>
          <TextInput
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: '#A3A3A3',
                borderColor: '#A3A3A3',
              },
            }}
            size="md"
            radius={30}
            leftSection={<HiMagnifyingGlass size={20} />}
            placeholder="Pencarian"
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            value={searchQuery}
          />
        </Grid.Col>
        <Grid.Col span={'auto'}>
          <Flex justify={'center'}>
            {isList ? (
              <HiOutlineListBullet size={35} color={WARNA.biruTua} onClick={handleList} />
            ) : (
              <HiSquares2X2 size={35} color={WARNA.biruTua} onClick={handleList} />
            )}
          </Flex>
        </Grid.Col>
      </Grid>
      <Box pt={20}>
        <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
          <Text fw={'bold'} c={WARNA.biruTua}>Total Proyek</Text>
          <Flex justify={'center'} align={'center'} h={'100%'}>
            <Text fz={40} fw={'bold'} c={WARNA.biruTua}>{isData.length}</Text>
          </Flex>
        </Box>
        {isList ? (
          <Box pt={20}>
            {isData.map((v, i) => {
              return (
                <Box key={i}>
                  <Group justify="space-between" mb={10} onClick={() => router.push(`/project/${v.id}`)}>
                    <Group>
                      <Center>
                        <ActionIcon
                          variant="gradient"
                          size={50}
                          aria-label="Gradient action icon"
                          radius={100}
                          gradient={{
                            from: '#DFDA7C',
                            to: '#F2AF46',
                            deg: 174
                          }}
                        >
                          <HiMiniPresentationChartBar size={25} color={WARNA.biruTua} />
                        </ActionIcon>
                      </Center>
                      <Text>{v.name}</Text>
                    </Group>
                    <Box>
                      <RiCircleFill size={12} color={
                        v.status === 0 ? '#1372C4' :
                          v.status === 1 ? '#C5771A' :
                            v.status === 2 ? '#0B6025' :
                              v.status === 3 ? '#BB1F1F' :
                                ""
                      } />
                    </Box>
                  </Group>
                  <Divider my="sm" />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box pt={20}>
            {isData.map((v, i) => {
              return (
                <Box key={i} mb={20}>
                  <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
                    <Card.Section>
                      <Box h={120} bg={WARNA.biruTua}>
                        <Flex justify={'center'} align={'center'} h={"100%"}>
                          <Title order={3} c={"white"}>{v.name}</Title>
                        </Flex>
                      </Box>
                    </Card.Section>
                    <Box pt={10}>
                      <Text>{v.desc}</Text>
                      <Group align='center' pt={10} justify='space-between'>
                        <Badge color={
                          v.status === 0 ? '#1372C4' :
                            v.status === 1 ? '#C5771A' :
                              v.status === 2 ? '#0B6025' :
                                v.status === 3 ? '#BB1F1F' :
                                  ""
                        }>{
                            v.status === 0 ? 'Segera' :
                              v.status === 1 ? 'Dikerjakan' :
                                v.status === 2 ? 'Selesai' :
                                  v.status === 3 ? 'Dibatalkan' :
                                    ""
                          }</Badge>
                        <Avatar.Group>
                          <Avatar>
                            <MdAccountCircle size={32} color={WARNA.biruTua} />
                          </Avatar>
                          <Avatar>+{v.member - 1}</Avatar>
                        </Avatar.Group>
                      </Group>
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box >
  );
}



