import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMiniUserGroup, HiMiniPresentationChartBar, HiMegaphone, HiSquares2X2 } from "react-icons/hi2";

export default function Features() {
  const router = useRouter()
  return (
    <>
      <Box pt={10}>
        <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Features</Text>
        <SimpleGrid
          cols={{ base: 4, sm: 4, lg: 4 }}
        >
          <Box>
            <Center>
              <ActionIcon variant="gradient"
                size={68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMiniUserGroup size={35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={15} c={WARNA.biruTua}>Divisi</Text>
            </Center>
          </Box>
          <Box>
            <Center>
              <ActionIcon variant="gradient"
                size={68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={15} c={WARNA.biruTua}>Proyek</Text>
            </Center>
          </Box>
          <Box>
            <Center>
              <ActionIcon variant="gradient"
                size={68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMegaphone size={35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={15} c={WARNA.biruTua}>Pengumuman</Text>
            </Center>
          </Box>
          <Box onClick={() => router.push('detail-feature')}>
            <Center>
              <ActionIcon variant="gradient"
                size={68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiSquares2X2 size={35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={15} c={WARNA.biruTua}>Semua</Text>
            </Center>
          </Box>
        </SimpleGrid>
      </Box>

    </>
  );
}
