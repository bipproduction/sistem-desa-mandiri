'use client'
import { Box, Tabs, rem } from '@mantine/core';
import { IoCloseCircleOutline } from "react-icons/io5"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import ListPositionActive from './list_position_active';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TabListPosition() {
  const iconStyle = { width: rem(20), height: rem(20) };
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('active')

  return (
    <Box p={20}>
      <Tabs variant="pills" color='#FF9861' radius="xl" defaultValue={(status == "false") ? "false" : "true"}>
        <Tabs.List
          bg={"white"}
          style={{
            border: `1px solid ${"#EDEDED"}`,
            padding: 5,
            borderRadius: 100,
          }}
        >
          <Tabs.Tab
            value="true"
            w={"45%"}
            leftSection={<IoMdCheckmarkCircleOutline style={iconStyle} />}
            onClick={() => { router.push("/position?active=true") }}
          >
            Aktif
          </Tabs.Tab>
          <Tabs.Tab
            value="false"
            w={"53%"}
            leftSection={<IoCloseCircleOutline style={iconStyle} />}
            onClick={() => { router.push("/position?active=false") }}
          >
            Tidak Aktif
          </Tabs.Tab>
        </Tabs.List>
        <ListPositionActive />
      </Tabs>
    </Box>
  );
}
