import React from "react"
import { Box } from "@mui/system"
import { SyncLoader } from "react-spinners"

const Loader: React.FC = () => {
  return (
    <Box>
      <SyncLoader color="gold" loading size={10} />
    </Box>
  )
}

export default Loader
