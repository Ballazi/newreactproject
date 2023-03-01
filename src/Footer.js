import { Grid } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <Grid container justifyContent={"center"} alignItems={"center"} sx={{ position: "fixed", bottom: "0", p: "10px", backgroundColor: "black", color: "white", fontWeight: "700" }}>
                <Grid item>© All rights reserved</Grid>
            </Grid>
        </div>
    )
}

export default Footer