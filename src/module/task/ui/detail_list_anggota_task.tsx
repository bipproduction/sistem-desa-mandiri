'use client'
import { globalRole, keyWibu, LayoutDrawer, SkeletonList, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { globalIsAdminDivision } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Divider, Flex, Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { funDeleteMemberTask, funGetTaskDivisionById } from "../lib/api_task";
import { IDataMemberTaskDivision } from "../lib/type_task";
import { useWibuRealtime } from "wibu-realtime";


export default function ListAnggotaDetailTask() {
   const [isData, setData] = useState<IDataMemberTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   const [openDrawer, setOpenDrawer] = useState(false)
   const [isOpenModal, setOpenModal] = useState(false)
   const [dataChoose, setDataChoose] = useState({ id: '', name: '' })
   const router = useRouter()
   const roleLogin = useHookstate(globalRole)
   const adminLogin = useHookstate(globalIsAdminDivision)
   const isMobile = useMediaQuery('(max-width: 369px)');
   const isMobile2 = useMediaQuery("(max-width: 438px)");
   const tema = useHookstate(TEMA)
   const [reason, setReason] = useState("")
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   async function getOneDataCancel() {
      try {
         const res = await funGetTaskDivisionById(param.detail, 'data');
         if (res.success) {
            setReason(res.data.reason);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan data tugas divisi, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getOneDataCancel();
   }, [param.detail])

   async function getOneData(loading: boolean) {
      try {
         setLoading(loading)
         const res = await funGetTaskDivisionById(param.detail, 'member');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan member tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData(true);
   }, [param.detail])


   useShallowEffect(() => {
      if (dataRealTime && dataRealTime.some((i: any) => i.category == 'tugas-detail-anggota' && i.id == param.detail)) {
         getOneData(false)
      } else if (dataRealTime && dataRealTime.some((i: any) => i.category == 'tugas-detail-status' && i.id == param.detail)) {
         getOneDataCancel()
      }
   }, [dataRealTime])


   async function onSubmit() {
      try {
         const res = await funDeleteMemberTask(param.detail, { idUser: dataChoose.id });
         if (res.success) {
            setDataRealtime([{
               category: "tugas-detail-anggota",
               id: param.detail,
            }])
            toast.success(res.message)
            setDataChoose({ id: '', name: '' })
            getOneData(false)
            setOpenDrawer(false)
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal menghapus anggota tugas divisi, coba lagi nanti");
      }
   }


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
                     padding: 20
                  }}
               >
                  {
                     loading ?
                        Array(6)
                           .fill(null)
                           .map((_, i) => (
                              <Box key={i}>
                                 <SkeletonList />
                              </Box>
                           ))
                        :
                        isData.length === 0 ? <Text c={"dimmed"} ta={"center"} fs={"italic"}>Tidak ada anggota</Text> :
                           isData.map((v, i) => {
                              return (
                                 <Box key={i}>
                                    <Grid align='center' mt={10}
                                       onClick={() => {
                                          setDataChoose({ id: v.idUser, name: v.name })
                                          reason == null ?
                                             setOpenDrawer(true)
                                             : setOpenDrawer(false)
                                       }}
                                    >
                                       <Grid.Col span={1}>
                                          <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={'lg'} />
                                       </Grid.Col>
                                       <Grid.Col span={8}>
                                          <Text lineClamp={1} pl={isMobile2 ? 40 : 30} fz={isMobile ? 15 : 16}>{v.name}</Text>
                                          <Text c={"#5A687D"} truncate="end" fz={isMobile ? 12 : 14} pl={isMobile2 ? 40 : 30}
                                             style={{
                                                overflowWrap: "break-word"
                                             }}>{v.email}</Text>
                                       </Grid.Col>
                                       <Grid.Col span={3}>
                                          <Text c={tema.get().utama} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
                                             Anggota
                                          </Text>
                                       </Grid.Col>
                                    </Grid>
                                    <Box mt={10}>
                                       <Divider my={10} />
                                    </Box>
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
                        (roleLogin.get() != "user" && roleLogin.get() != "coadmin") || adminLogin.get() ?
                           <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                              <Box>
                                 <IoIosCloseCircle size={30} color={tema.get().utama} />
                              </Box>
                              <Box>
                                 <Text c={tema.get().utama}>Keluarkan anggota</Text>
                              </Box>
                           </Flex>
                           : <></>
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
   )
}