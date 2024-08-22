"use client"
import { ActionIcon, Box, Flex, Grid, Group, List, Skeleton, Spoiler, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";
import { IAnnouncement } from "../lib/type_announcement";
import { funGetAnnouncementById } from "../lib/api_announcement";
import toast from "react-hot-toast";


export default function DetailAnnouncement({ id }: { id: string }) {
   const [isData, setIsData] = useState<IAnnouncement>()
   const [isMember, setIsMember] = useState<any>({})
   const [loading, setLoading] = useState(true)

   async function fetchOneAnnouncement() {
      try {
         setLoading(true)
         const res = await funGetAnnouncementById(id)
         if (res.success) {
            setIsData(res.data)
            setIsMember(res.member)
         } else {
            toast.error(res.message)
         }

      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan pengumuman, coba lagi nanti")
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      fetchOneAnnouncement()
   }, [])

   return (
      <Box py={30} px={20}>
         <Box p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >
            {loading ?
               <Stack>
                  <Group>
                     <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={30}
                        radius={100}
                        aria-label="icon"
                     >
                        <Skeleton height={25} width={40} />
                     </ActionIcon>
                     <Box>
                        <Skeleton height={18} width={150} />
                     </Box>
                  </Group>
                  <Grid gutter={'md'}>
                     <Grid.Col span={1}>
                        <ActionIcon
                           variant="light"
                           bg={"#DCEED8"}
                           size={30}
                           radius={100}
                           aria-label="icon"
                        >
                           <Skeleton height={25} width={40} />
                        </ActionIcon>
                     </Grid.Col>
                     <Grid.Col span={11}>
                        <Spoiler maxHeight={100} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                           <Skeleton mt={5} ml={5} height={18} width={150} />
                        </Spoiler>
                     </Grid.Col>
                  </Grid>
               </Stack>
               :
               <Stack>
                  <Group>
                     <TfiAnnouncement size={25} />
                     <Text fw={'bold'}>{isData?.title}</Text>
                  </Group>
                  <Grid gutter={'md'}>
                     <Grid.Col span={1}>
                        <BsCardText size={25} />
                     </Grid.Col>
                     <Grid.Col span={11}>
                        <Spoiler maxHeight={100} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                           <Text>{isData?.desc}</Text>
                        </Spoiler>
                     </Grid.Col>
                  </Grid>
               </Stack>
            }
         </Box>
         <Box my={15} p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >

            {
               loading ? Array(6)
                  .fill(null)
                  .map((_, i) => (
                     <Skeleton key={i} height={10} radius="md" mb={5} width={"100%"} />
                  ))

                  : Object.keys(isMember).map((v: any, i: any) => {
                     return (
                        <Box key={i} mb={10}>
                           <Text>{isMember[v]?.[0].group}</Text>
                           <List>
                              {
                                 isMember[v].map((item: any, x: any) => {
                                    return <List.Item key={x}>{item.division}</List.Item>
                                 })
                              }
                           </List>
                        </Box>
                     )

                  })
            }
         </Box>
      </Box>
   )
}