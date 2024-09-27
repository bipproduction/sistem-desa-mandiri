"use client"
import { currentScroll, LayoutNavbarNew, TEMA } from '@/module/_global';
import { Box, Center, Flex, Grid, Group, Skeleton, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IHistoryCalender } from '../lib/type_calender';
import { funGetHostory } from '../lib/api_calender';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import "moment/locale/id";
import _ from 'lodash';
import { useHookstate } from '@hookstate/core';
import toast from 'react-hot-toast';

export default function HistoryDivisionCalender() {
  const [isData, setData] = useState<IHistoryCalender[]>([])
  const router = useRouter()
  const param = useParams<{ id: string, detail: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)
  const isMobile = useMediaQuery('(max-width: 450px)');
  const { value: containerRef } = useHookstate(currentScroll);
  const [isPage, setPage] = useState(1)


  const getData = async (loading: boolean) => {
    try {
      if (loading)
        setLoading(true)
      const response = await funGetHostory('?division=' + param.id + '&search=' + searchQuery + '&page=' + isPage)
      if (response.success) {
        if (isPage == 1) {
          setData(response.data)
        } else {
          setData([...isData, ...response?.data])
        }
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function onSearch(val: string) {
    setSearchQuery(val)
    setPage(1)
  }

  useShallowEffect(() => {
    getData(true)
  }, [searchQuery])

  useShallowEffect(() => {
    getData(false)
  }, [isPage])


  useEffect(() => {
    const handleScroll = async () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;
        if (scrollTop + containerHeight + 1 >= scrollHeight) {
          setPage(isPage + 1)
        }
      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, isPage]);


  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="Riwayat acara" menu />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: tema.get().utama,
              borderRadius: tema.get().utama,
              borderColor: tema.get().utama,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Box mt={30}>
          <Box>
            {loading ?
              Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={20}>
                    <Skeleton height={100} width={"100%"} radius={10} />
                  </Box>
                ))
              :
              _.isEmpty(isData)
                ?
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Acara</Text>
                </Box>
                :
                isData.map((v, i) => {
                  return (
                    <Box bg={tema.get().bgTotalKegiatan} style={{
                      borderRadius: 10,
                    }} mb={20} p={20} key={i}>
                      <Grid
                        style={{
                          alignContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Grid.Col span={{
                          base: isMobile ? 4 : 3,
                          sm: 3,
                          xs: 3,
                          md: 3,
                          lg: 3,
                          xl: 3
                        }}>
                          <Flex justify={"center"} direction={'column'}>
                            <Text ta={"center"} fz={20} fw={'bold'}>{moment(v.dateStart).format('D MMM')}</Text>
                            <Text ta={"center"} fz={15}>{moment(v.dateStart).format('dddd')}</Text>
                          </Flex>
                        </Grid.Col>
                        <Grid.Col span={{
                          base: isMobile ? 8 : 9,
                          md: 9,
                          lg: 9,
                          xl: 9,
                          sm: 9,
                          xs: 9
                        }}>
                          {v.data.map((d, x) => {
                            return (
                              <Box mb={9} key={x}
                                onClick={() => router.push(`/division/${param.id}/calender/${d.id}`)}
                              >
                                <Text fw={"bold"} lineClamp={1}>{d.title}</Text>
                                <Text>{d.timeStart} | {d.timeEnd}</Text>
                              </Box>
                            )
                          })}
                        </Grid.Col>
                      </Grid>
                    </Box>
                  )
                })
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
