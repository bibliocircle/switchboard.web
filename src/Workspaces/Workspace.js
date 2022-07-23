import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Workspace() {
    const { workspaceId } = useParams()
    return (
        <Grid container>
            {workspaceId}
        </Grid>
    )
}